"use client";
import { useAtom, useAtomValue } from "jotai";
import React from "react";
import BookingForm from "~/components/general/BookingForm";
import CheckoutOverview from "~/components/general/CheckoutOverview";
import { SunsetAtom } from "~/utils/stores";


const SunsetBookingForm = () => {
  const [sunsetData, setSunsetData] = useAtom(SunsetAtom);
  const data = useAtomValue(SunsetAtom);

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
