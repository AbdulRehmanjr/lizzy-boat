"use client";
import { useAtom } from "jotai/react";
import React from "react";
import MorningEvening from "~/components/general/MorningEvening";
import { PrivateAtom } from "~/utils/stores";


const BookingTime = () => {
  const [privateAtom, setPrivateData] = useAtom(PrivateAtom);

  return (
    <>
      <h1 className={`my-5 text-2xl md:text-4xl`}>Choose between</h1>
      <MorningEvening
        state={privateAtom}
        setState={setPrivateData}
        linkToRedirect="/charter/booking-people"
      />
    </>
  );
};

export default BookingTime;
