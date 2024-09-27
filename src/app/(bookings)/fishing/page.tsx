"use client";
import { useAtom } from "jotai/react";
import React from "react";
import HalfOrFullDay from "~/components/general/HalfOrFullDay";
import { FishingAtom } from "~/utils/stores";

const Fishing = () => {
  const [fishingData, setFishingData] = useAtom(FishingAtom);
  return (
    <>
      <h1 className={`my-5 text-center text-2xl font-normal md:text-4xl`}>
        Choose between
      </h1>
      <HalfOrFullDay
        halfDayPax="2 Pax"
        fullDayPax="2 Pax"
        additionalPrice="(each additional pax +40 €)"
        halfDayPrice="550 €"
        fullDayPrice="1,100 €"
        state={fishingData}
        setState={setFishingData}
        linkIfHalfDay="/fishing/booking-time"
        linkIfFullDay="/fishing/booking-people"
      />
    </>
  );
};

export default Fishing;
