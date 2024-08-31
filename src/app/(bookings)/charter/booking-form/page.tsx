"use client";
import { useAtom, useAtomValue } from "jotai";
import React, { useEffect, useMemo, useState } from "react";
import BookingForm from "~/components/general/BookingForm";
import CheckoutOverview from "~/components/general/CheckoutOverview";
import { api } from "~/trpc/react";
import { FormHide, PrivateAtom } from "~/utils/stores";

const CharterBookingForm = () => {
  const [privateData, setPrivateData] = useAtom(PrivateAtom);
  const data = useAtomValue(PrivateAtom);

  const blockBookingsAccordingToBoats = api.booking.getBlockedDates.useQuery({
    numberOfPeople: privateData.adult ?? 0 + privateData.infants ?? 0,
    bookingType: "charter",
    time: privateData.timeSlot ?? "",
  });
  const currentBooking =
    blockBookingsAccordingToBoats?.data?.blockedDateSet.find(
      (booking) => booking.date === data.date,
    );

  const totalPeople = useMemo(() => {
    return privateData.adult ?? 0 + privateData.infants ?? 0;
  }, [privateData]);

  useEffect(() => {
    if (currentBooking) {
      setPrivateData((prev) => ({
        ...prev,
        boat: currentBooking.boatAvailable,
      }));
    } else {
      setPrivateData((prev) => ({
        ...prev,
        boat: totalPeople <= 10 ? "ten_seater" : "seventeen_seater",
      }));
    }
  }, [currentBooking]);

  const [hideForm, sethideForm] = useAtom(FormHide);
  return (
    <div className="flex flex-col justify-center gap-10 p-6 md:flex-row md:gap-40">
      <BookingForm hideForm={hideForm} setHideForm={sethideForm} />
      <CheckoutOverview
        state={privateData}
        setState={setPrivateData}
        apiLinkEndpoint="private"
        data={data}
        hideForm={hideForm}
        setHideForm={sethideForm}
      />
    </div>
  );
};

export default CharterBookingForm;
