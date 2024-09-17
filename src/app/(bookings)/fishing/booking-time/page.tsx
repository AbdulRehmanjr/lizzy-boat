"use client";
import { useAtom } from "jotai/react";
import React from "react";
import MorningEvening from "~/components/general/MorningEvening";
import { FishingAtom } from "~/utils/stores";


const BookingTime = () => {
  const [fishingData, setFishingData] = useAtom(FishingAtom);

  return (
    <>
      <h1 className={`my-5 text-2xl md:text-4xl`}>Choose between</h1>
      <MorningEvening
        state={fishingData}
        setState={setFishingData}
        linkToRedirect="/fishing/booking-people"
        morningTime="07:30 am - 10:30 am"
        eveningTime=""
      />
    </>
  );
};

export default BookingTime;
