"use client";
import { useAtom, useAtomValue } from "jotai";
import React from "react";
import BookingForm from "~/components/general/BookingForm";
import CheckoutOverview from "~/components/general/CheckoutOverview";
import { SnorkelingAtom } from "~/utils/stores";


const SnorkelingBookingForm = () => {
  const [snorkeling, setSnorkeling] = useAtom(SnorkelingAtom);
  const data = useAtomValue(SnorkelingAtom);

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
