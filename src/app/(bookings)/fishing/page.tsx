"use client";
import { useAtom } from "jotai/react";
import React from "react";
import HalfOrFullDay from "~/components/general/HalfOrFullDay";
import { FishingAtom } from "~/utils/stores";


const Fishing = () => {
  const [fishingData, setFishingData] = useAtom(FishingAtom);
  return (
    <>
      <h1 className={`text-2xl font-bold md:text-4xl text-center`}>Choose between</h1>
      <HalfOrFullDay
        halfDayPrice="2 Pax 550 €"
        fullDayPrice="2 Pax 1,100 €"
        state={fishingData}
        setState={setFishingData}
        linkIfHalfDay="/fishing/booking-time"
        linkIfFullDay="/fishing/booking-people"
      />
    </>
  );
};

export default Fishing;
