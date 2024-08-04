"use client";
import { useAtom } from "jotai";
import React from "react";
import SelectPeople from "~/components/general/SelectPeople";
import { TransferAtom } from "~/utils/stores";

type Props = {};

const BookingPeople = (props: Props) => {
  const [transferData, setTransfer] = useAtom(TransferAtom);

  return (
    <>
      <h1 className={`my-5 text-2xl font-bold md:text-4xl`}>
        Select number of people
      </h1>
      <SelectPeople
        state={transferData}
        setState={setTransfer}
        linkToRedirect="/transfer/booking-date"
      />
    </>
  );
};

export default BookingPeople;
