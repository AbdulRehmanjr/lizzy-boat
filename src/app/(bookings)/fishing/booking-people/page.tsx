"use client";
import { useAtom } from "jotai/react";
import React from "react";
import SelectPeople from "~/components/general/SelectPeople";
import { FishingAtom } from "~/utils/stores";


const BookingPeople = () => {
  const [fishingData, setFishingData] = useAtom(FishingAtom);

  return (
    <>
      <h1 className={`my-5 text-2xl md:text-4xl`}>
        Select number of people
      </h1>
      <SelectPeople
        linkToRedirect="/fishing/booking-date"
        state={fishingData}
        setState={setFishingData}
        type="fishing"
      />
    </>
  );
};

export default BookingPeople;
