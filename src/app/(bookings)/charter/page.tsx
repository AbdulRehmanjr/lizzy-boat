"use client";
import { useAtom } from "jotai/react";
import React from "react";
import HalfOrFullDay from "~/components/general/HalfOrFullDay";
import { PrivateAtom } from "~/utils/stores";

const Fishing = () => {
  const [privateAtom, setPrivateData] = useAtom(PrivateAtom);

  return (
    <>
      <h1 className={`text-center text-2xl md:text-4xl`}>
        Choose between
      </h1>
      <HalfOrFullDay
        halfDayPrice="400 €"
        fullDayPrice="800 €"
        halfDayPax="4 Pax"
        fullDayPax="4 Pax"
        additionalPrice="(each additional pax +40 €)"
        state={privateAtom}
        setState={setPrivateData}
        linkIfHalfDay="/charter/booking-time"
        linkIfFullDay="/charter/booking-people"
      />
    </>
  );
};

export default Fishing;
