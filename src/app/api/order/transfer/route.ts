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
      bookingData: TransferBookingProps;
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
      date: bookingData?.date ?? "none",
      adults: bookingData?.adult ?? 0,
      infants: bookingData?.infants ?? 0,
      bookingType: bookingData?.transferType ?? "none",
      startTime: bookingData?.startTime ?? "none",
      endTime: bookingData?.endTime ?? "none",
      blockTime: bookingData?.blockTime ?? "none-none",
      price: bookingData?.price + "",
      mode: bookingData?.mode ?? "none",
    };
    console.log("!!!???>>>", bookingData);
    const totalNoOfPeople: number =
      bookingData?.adult ?? 0 + bookingData?.infants ?? 0;
    console.log(
      "Number of people",
      totalNoOfPeople,
      bookingData?.adult,
      bookingData?.infants,
    );
    const paypalId = await api.booking.createTransferBooking(object);
    if (totalNoOfPeople > 10) {
      await api.booking.addBookingData({
        paypalBoookingId: paypalId,
        date: bookingData?.date ?? "none",
        boat: "ten_seater",
        time: "none",
        noOfPeople: 10,
        bookingType: "transfer",
      });
      await api.booking.addBookingData({
        paypalBoookingId: paypalId,
        date: bookingData?.date ?? "none",
        boat: "seventeen_seater",
        time: "none",
        noOfPeople: totalNoOfPeople - 10,
        bookingType: "transfer",
      });
    } else {
      await api.booking.addBookingData({
        paypalBoookingId: paypalId,
        date: bookingData?.date ?? "none",
        boat: bookingData?.boat ?? "none",
        time: "none",
        noOfPeople: totalNoOfPeople,
        bookingType: "transfer",
      });
    }
    await api.email.buyerTransferEmail({ ...object, paypalId: orderId });
    await api.email.sellerTransferEmail({ ...object, paypalId: orderId });

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
