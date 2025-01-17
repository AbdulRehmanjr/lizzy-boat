"use client";
import { useAtom, useAtomValue } from "jotai";
import React, { useEffect, useMemo, useState } from "react";
import BookingForm from "~/components/general/BookingForm";
import CheckoutOverview from "~/components/general/CheckoutOverview";
import { api } from "~/trpc/react";
import { FormHide, TransferAtom } from "~/utils/stores";

const TransferBookingForm = () => {
  const [transferData, setTransfer] = useAtom(TransferAtom);
  const data = useAtomValue(TransferAtom);

  const blockBookingsAccordingToBoats = api.booking.getBlockedDates.useQuery({
    numberOfPeople: transferData.adult ?? 0 + transferData.infants ?? 0,
    bookingType: "transfer",
    time: "",
  });
  const currentBooking =
    blockBookingsAccordingToBoats?.data?.blockedDateSet.find(
      (booking) => booking.date === data.date,
    );

  const totalPeople = useMemo(() => {
    return transferData.adult ?? 0 + transferData.infants ?? 0;
  }, [transferData]);
  console.log("transfer calendar n", currentBooking);
  useEffect(() => {
    if (currentBooking) {
      setTransfer((prev) => ({
        ...prev,
        boat: currentBooking.boatAvailable,
      }));
    }
  }, [currentBooking]);

  const [hideForm, sethideForm] = useAtom(FormHide);

  return (
    <div className="flex flex-col justify-center gap-10 p-6 md:flex-row md:gap-40">
      <BookingForm hideForm={hideForm} setHideForm={sethideForm} />
      <CheckoutOverview
        state={transferData}
        setState={setTransfer}
        apiLinkEndpoint="transfer"
        data={data}
        hideForm={hideForm}
        setHideForm={sethideForm}
      />
    </div>
  );
};

export default TransferBookingForm;
