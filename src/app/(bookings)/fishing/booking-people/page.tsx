"use client";
import { useAtom } from "jotai/react";
import React from "react";
import SelectPeople from "~/components/general/SelectPeople";
import { FishingAtom } from "~/utils/stores";

type Props = {};

const BookingPeople = (props: Props) => {
  const [fishingData, setFishingData] = useAtom(FishingAtom);

  return (
    <>
      <h1 className={`my-5 text-2xl font-bold md:text-4xl`}>
        Select number of people
      </h1>
      <SelectPeople
        linkToRedirect="/fishing/booking-date"
        state={fishingData}
        setState={setFishingData}
      />
    </>
  );
};

export default BookingPeople;
