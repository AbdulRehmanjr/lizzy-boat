"use client";
import { useAtom } from "jotai/react";
import React from "react";
import SelectPeople from "~/components/general/SelectPeople";
import { TransferAtom } from "~/utils/stores";


const Fishing = () => {
  const [transferData, setTransfer] = useAtom(TransferAtom);

  return (
    <>
      <h1 className={`text-2xl font-bold md:text-4xl`}>Choose between</h1>
      <SelectPeople
        state={transferData}
        setState={setTransfer}
        linkToRedirect="/transfer/booking-date"
      />
    </>
  );
};

export default Fishing;
