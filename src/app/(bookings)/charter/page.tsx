"use client";
import { useAtom } from "jotai/react";
import React from "react";
import HalfOrFullDay from "~/components/general/HalfOrFullDay";
import { PrivateAtom } from "~/utils/stores";


const Fishing = () => {
  const [privateAtom, setPrivateData] = useAtom(PrivateAtom);

  return (
    <>
      <h1 className={`text-2xl font-bold md:text-4xl text-center`}>Choose between</h1>
      <HalfOrFullDay
        halfDayPrice="4 Pax 400 €"
        fullDayPrice="4 Pax 800 €"
        state={privateAtom}
        setState={setPrivateData}
        linkIfHalfDay="/charter/booking-time"
        linkIfFullDay="/charter/booking-people"
      />
    </>
  );
};

export default Fishing;
