"use client";
import { useAtom, useAtomValue } from "jotai";
import React, { useEffect, useMemo } from "react";
import BookingForm from "~/components/general/BookingForm";
import CheckoutOverview from "~/components/general/CheckoutOverview";
import { api } from "~/trpc/react";
import { FishingAtom } from "~/utils/stores";

const FishingBookingForm = () => {
  const [fishingData, setFishingData] = useAtom(FishingAtom);
  const data = useAtomValue(FishingAtom);

  const blockBookingsAccordingToBoats = api.booking.getBlockedDates.useQuery({
    numberOfPeople: fishingData.adult ?? 0 + fishingData.infants ?? 0,
    bookingType: "fishing",
    time: fishingData.timeSlot ?? "",
  });
  const currentBooking =
    blockBookingsAccordingToBoats?.data?.blockedDateSet.find(
      (booking) => booking.date === data.date,
    );

  const totalPeople = useMemo(() => {
    return fishingData.adult ?? 0 + fishingData.infants ?? 0;
  }, [fishingData]);

  useEffect(() => {
    if (currentBooking) {
      setFishingData((prev) => ({
        ...prev,
        boat: currentBooking.boatAvailable,
      }));
    } else {
      setFishingData((prev) => ({
        ...prev,
        boat: totalPeople <= 10 ? "ten_seater" : "seventeen_seater",
      }));
    }
  }, [currentBooking]); 
  console.log(blockBookingsAccordingToBoats.data?.blockedDateSet);

  return (
    <div className="flex flex-col justify-center gap-10 p-6 md:flex-row md:gap-40">
      <BookingForm />
      <CheckoutOverview
        data={data}
        state={fishingData}
        setState={setFishingData}
        apiLinkEndpoint="fishing"
      />
    </div>
  );
};

export default FishingBookingForm;
