/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TRPCClientError } from "@trpc/client";
import axios, { AxiosError } from "axios";
import { env } from "~/env";
import { api } from "~/trpc/server";

export async function POST(req: Request) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {
      orderId,
      bookingData,
      formData,
    }: {
      orderId: string;
      bookingData: SnorkelingBookingProps;
      formData: FormProps;
    } = await req.json();

    const username = env.PAYPAL_CLIENT;
    const password = env.PAYPAL_SECERT;
    const base64Credentials = Buffer.from(`${username}:${password}`).toString(
      "base64",
    );
    const config = {
      headers: {
        Accept: "application/json",
        "Accept-Language": "en_US",
        Authorization: `Basic ${base64Credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
        "Paypal-Partner-Attribution-Id": "KOLIBRI_SP_PPCP",
      },
    };

    const responseType = "grant_type=client_credentials";
    const tokenResponse = await axios.post(
      `${env.PAYPAL_API}/v1/oauth2/token`,
      responseType,
      config,
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const accessToken: string = tokenResponse.data.access_token;
    const paypalApiUrl = `${env.PAYPAL_API}/v2/checkout/orders/${orderId}/capture`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "Paypal-Partner-Attribution-Id": env.BN_CODE,
    };
    const response = await axios.post(paypalApiUrl, {}, { headers });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const order = response.data;

    const object = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      information: formData.information ?? "none",
      extra: formData.extra ?? "none",
      guesthouse: formData.guesthouse ?? "none",
      date: bookingData.date ?? "none",
      adults: bookingData.adult ?? 0,
      child_0_3: bookingData.child_0_3 ?? 0,
      child_4_8: bookingData.child_4_8 ?? 0,
      child_9_13: bookingData.child_9_13 ?? 0,
      child_4_11: bookingData.child_4_11 ?? 0,
      bookingType: bookingData.daySlot ?? "none",
      time: bookingData.timeSlot ?? "none",
      boat: bookingData.boat ?? "none",
      total_no_of_people: bookingData.total_no_of_people ?? 0,
      price: bookingData.price + "",
    };

    const paypalId = await api.booking.createSnorkelingBooking(object);
    if (bookingData.total_no_of_people && bookingData.total_no_of_people > 10) {
      await api.booking.addBookingData({
        paypalBoookingId: paypalId,
        date: bookingData.date ?? "none",
        boat: "ten_seater",
        time:
          bookingData.daySlot === "full_day"
            ? bookingData.daySlot
            : (bookingData.timeSlot ?? "none"),
        noOfPeople: 10,
        bookingType: "snorkeling",
      });
      await api.booking.addBookingData({
        paypalBoookingId: paypalId,
        date: bookingData.date ?? "none",
        boat: "seventeen_seater",
        time:
          bookingData.daySlot === "full_day"
            ? bookingData.daySlot
            : (bookingData.timeSlot ?? "none"),
        noOfPeople: bookingData.total_no_of_people - 10,
        bookingType: "snorkeling",
      });
    } else {
      await api.booking.addBookingData({
        paypalBoookingId: paypalId,
        date: bookingData.date ?? "none",
        boat: bookingData.boat ?? "none",
        time:
          bookingData.daySlot === "full_day"
            ? bookingData.daySlot
            : (bookingData.timeSlot ?? "none"),
        noOfPeople: bookingData.total_no_of_people ?? 0,
        bookingType: "snorkeling",
      });
    }
    await api.email.buyerSnorkelingEmail({ ...object, paypalId: orderId });
    await api.email.sellerSnorkelingEmail({ ...object, paypalId: orderId });

    return Response.json(order);
  } catch (error) {
    if (error instanceof TRPCClientError) {
      console.error(error.message);
      return Response.json(error.message, { status: 500 });
    } else if (error instanceof AxiosError) {
      const err: string = error.response?.data.message;
      console.log(err);
      return Response.json(err, { status: 500 });
    } else {
      console.error("Unexpected error:", error);
      return Response.json("An unexpected error occurred", { status: 500 });
    }
  }
}
