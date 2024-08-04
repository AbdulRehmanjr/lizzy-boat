"use client";
import { useAtom, useAtomValue } from "jotai";
import React from "react";
import BookingForm from "~/components/general/BookingForm";
import CheckoutOverview from "~/components/general/CheckoutOverview";
import { FishingAtom } from "~/utils/stores";

type Props = {};

const FishingBookingForm = (props: Props) => {
  const [fishingData, setFishingData] = useAtom(FishingAtom);
  const data = useAtomValue(FishingAtom);

  return (
    <div className="flex flex-col justify-center gap-10 p-6 md:flex-row md:gap-40">
      <BookingForm />
      <CheckoutOverview
        atom={FishingAtom}
        data={data}
        state={fishingData}
        setState={setFishingData}
        apiLinkEndpoint="fishing"
      />
    </div>
  );
};

export default FishingBookingForm;
