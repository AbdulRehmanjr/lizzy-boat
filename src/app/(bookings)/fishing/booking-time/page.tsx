"use client";
import { useAtom } from "jotai/react";
import React from "react";
import MorningEvening from "~/components/general/MorningEvening";
import { FishingAtom } from "~/utils/stores";

type Props = {};

const BookingTime = (props: Props) => {
  const [fishingData, setFishingData] = useAtom(FishingAtom);

  return (
    <>
      <h1 className={`my-5 text-2xl font-bold md:text-4xl`}>Choose between</h1>
      <MorningEvening
        state={fishingData}
        setState={setFishingData}
        linkToRedirect="/fishing/booking-people"
      />
    </>
  );
};

export default BookingTime;
