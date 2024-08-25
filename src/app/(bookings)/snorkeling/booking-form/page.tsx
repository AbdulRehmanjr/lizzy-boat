"use client";
import { useAtom, useAtomValue } from "jotai";
import React, { useEffect, useMemo } from "react";
import BookingForm from "~/components/general/BookingForm";
import CheckoutOverview from "~/components/general/CheckoutOverview";
import { api } from "~/trpc/react";
import { SnorkelingAtom } from "~/utils/stores";

const SnorkelingBookingForm = () => {
  const [snorkeling, setSnorkeling] = useAtom(SnorkelingAtom);
  const data = useAtomValue(SnorkelingAtom);

  const blockBookingsAccordingToBoats = api.booking.getBlockedDates.useQuery({
    numberOfPeople:
      snorkeling.timeSlot === "half_day"
        ? (snorkeling.adult ??
          0 + snorkeling.child_0_3 ??
          0 + snorkeling.child_4_8 ??
          0 + snorkeling.child_9_13 ??
          0)
        : (snorkeling.adult ??
          0 + snorkeling.child_0_3 ??
          0 + snorkeling.child_0_3 ??
          0 + snorkeling.child_4_11 ??
          0),
    bookingType: "snorkeling",
    time: snorkeling.timeSlot ?? "",
  });
  const currentBooking =
    blockBookingsAccordingToBoats?.data?.blockedDateSet.find(
      (booking) => booking.date === data.date,
    );

  const totalPeople = useMemo(() => {
    return snorkeling.timeSlot === "half_day"
      ? (snorkeling.adult ??
          0 + snorkeling.child_0_3 ??
          0 + snorkeling.child_4_8 ??
          0 + snorkeling.child_9_13 ??
          0)
      : (snorkeling.adult ??
          0 + snorkeling.child_0_3 ??
          0 + snorkeling.child_0_3 ??
          0 + snorkeling.child_4_11 ??
          0);
  }, [snorkeling]);

  useEffect(() => {
    if (currentBooking) {
      setSnorkeling((prev) => ({
        ...prev,
        boat: currentBooking.boatAvailable,
      }));
    } else {
      setSnorkeling((prev) => ({
        ...prev,
        boat: totalPeople <= 10 ? "ten_seater" : "seventeen_seater",
      }));
    }
  }, [currentBooking]);

  return (
    <div className="flex flex-col justify-center gap-10 p-6 md:flex-row md:gap-40">
      <BookingForm />
      <CheckoutOverview
        state={snorkeling}
        setState={setSnorkeling}
        apiLinkEndpoint="snorkeling"
        data={data}
      />
    </div>
  );
};

export default SnorkelingBookingForm;
