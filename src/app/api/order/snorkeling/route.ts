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
      snorkeling,
      formData,
    }: {
      orderId: string;
      snorkeling: SnorkelingBookingProps;
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
      date: snorkeling.date ?? "none",
      adults: snorkeling.adult ?? 0,
      infants: snorkeling.infants ?? 0,
      bookingType: snorkeling.daySlot ?? "none",
      time: snorkeling.timeSlot ?? "none",
      price: snorkeling.price + "",
    };

    await api.booking.createSnorkelingBooking(object);
    await api.email.buyerSnorkelingEmail({ ...object, paypalId: orderId });
    await api.email.sellerSnorkelingEmail({ ...object, paypalId: orderId });

    return Response.json(order);
  } catch (error) {
    if (error instanceof TRPCClientError) {
      console.error(error.message);
      throw new AxiosError(error.message);
    } else if (error instanceof AxiosError) {
      const err: string = error.response?.data.message;
      console.log(err);
      throw new AxiosError(err);
    }
  }
}
