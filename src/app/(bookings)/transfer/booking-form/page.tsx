"use client";
import { useAtom, useAtomValue } from "jotai";
import React from "react";
import BookingForm from "~/components/general/BookingForm";
import CheckoutOverview from "~/components/general/CheckoutOverview";
import { TransferAtom } from "~/utils/stores";


const TransferBookingForm = () => {
  const [transferData, setTransfer] = useAtom(TransferAtom);
  const data = useAtomValue(TransferAtom);

  return (
    <div className="flex flex-col justify-center gap-10 p-6 md:flex-row md:gap-40">
      <BookingForm />
      <CheckoutOverview
        state={transferData}
        setState={setTransfer}
        apiLinkEndpoint="transfer"
        data={data}
      />
    </div>
  );
};

export default TransferBookingForm;
