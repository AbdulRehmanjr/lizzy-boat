import { TRPCClientError } from "@trpc/client";
import { AxiosError } from "axios";
import { api } from "~/trpc/server";

export async function POST(req: Request) {
  try {
    const {
      orderId,
      snorkeling,
      formData,
    }: {
      orderId: string;
      snorkeling: SnorkelingBookingProps;
      formData: FormProps;
    } = await req.json();

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
      child_0_3: snorkeling.child_0_3 ?? 0,
      child_4_8: snorkeling.child_4_8 ?? 0,
      child_9_13: snorkeling.child_9_13 ?? 0,
      child_4_11: snorkeling.child_4_11 ?? 0,
      bookingType: snorkeling.daySlot ?? "none",
      time: snorkeling.timeSlot ?? "none",
      boat: snorkeling.boat ?? "none",
      total_no_of_people: snorkeling.total_no_of_people ?? 0,
      price: snorkeling.price + "", 
    };

    const response = await api.booking.createSnorkelingBooking(object);
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    if (error instanceof TRPCClientError) {
      console.error(error.message);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    } else if (error instanceof AxiosError) {
      const err: string = error.response?.data.message ?? "An error occurred";
      console.log(err);
      return new Response(JSON.stringify({ error: err }), { status: 500 });
    } else {
      console.error("Unexpected error:", error);
      return new Response(
        JSON.stringify({ error: "An unexpected error occurred" }),
        { status: 500 },
      );
    }
  }
}
