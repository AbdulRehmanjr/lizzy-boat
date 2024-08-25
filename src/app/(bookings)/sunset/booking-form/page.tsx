"use client";
import { useAtom, useAtomValue } from "jotai";
import React, { useEffect, useMemo } from "react";
import BookingForm from "~/components/general/BookingForm";
import CheckoutOverview from "~/components/general/CheckoutOverview";
import { api } from "~/trpc/react";
import { SunsetAtom } from "~/utils/stores";

const SunsetBookingForm = () => {
  const [sunsetData, setSunsetData] = useAtom(SunsetAtom);
  const data = useAtomValue(SunsetAtom);

  const blockBookingsAccordingToBoats = api.booking.getBlockedDates.useQuery({
    numberOfPeople: sunsetData.adult ?? 0 + sunsetData.infants ?? 0,
    bookingType: "sunset",
    time: "none",
  });
  const currentBooking =
    blockBookingsAccordingToBoats?.data?.blockedDateSet.find(
      (booking) => booking.date === data.date,
    );

  const totalPeople = useMemo(() => {
    return sunsetData.adult ?? 0 + sunsetData.infants ?? 0;
  }, [sunsetData]);

  useEffect(() => {
    if (currentBooking) {
      setSunsetData((prev) => ({
        ...prev,
        boat: currentBooking.boatAvailable,
      }));
    } else {
      setSunsetData((prev) => ({
        ...prev,
        boat: totalPeople <= 10 ? "ten_seater" : "seventeen_seater",
      }));
    }
  }, [currentBooking]);

  return (
    <div className="flex flex-col justify-center gap-10 p-6 md:flex-row md:gap-40">
      <BookingForm />
      <CheckoutOverview
        state={sunsetData}
        setState={setSunsetData}
        apiLinkEndpoint="sunset"
        data={data}
      />
    </div>
  );
};

export default SunsetBookingForm;
