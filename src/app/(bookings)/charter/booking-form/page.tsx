"use client";
import { useAtom, useAtomValue } from "jotai";
import React from "react";
import BookingForm from "~/components/general/BookingForm";
import CheckoutOverview from "~/components/general/CheckoutOverview";
import { PrivateAtom } from "~/utils/stores";

type Props = {};

const CharterBookingForm = (props: Props) => {
  const [privateData, setPrivateData] = useAtom(PrivateAtom);
  const data = useAtomValue(PrivateAtom);

  return (
    <div className="flex flex-col justify-center gap-10 p-6 md:flex-row md:gap-40">
      <BookingForm />
      <CheckoutOverview
        atom={PrivateAtom}
        state={privateData}
        setState={setPrivateData}
        apiLinkEndpoint="private"
        data={data}
      />
    </div>
  );
};

export default CharterBookingForm;
