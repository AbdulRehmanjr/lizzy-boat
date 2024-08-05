"use client";
import { useAtom } from "jotai/react";
import React from "react";
import HalfOrFullDay from "~/components/general/HalfOrFullDay";
import { PrivateAtom } from "~/utils/stores";

type Props = {};

const Fishing = (props: Props) => {
  const [privateAtom, setPrivateData] = useAtom(PrivateAtom);

  return (
    <>
      <h1 className={`text-2xl font-bold md:text-4xl`}>Choose between</h1>
      <HalfOrFullDay
        halfDayPrice="230"
        fullDayPrice="210"
        state={privateAtom}
        setState={setPrivateData}
        linkIfHalfDay="/charter/booking-time"
        linkIfFullDay="/charter/booking-people"
      />
    </>
  );
};

export default Fishing;
