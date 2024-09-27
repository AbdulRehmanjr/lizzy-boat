"use client";
import { useAtom } from "jotai/react";
import React from "react";
import MorningEvening from "~/components/general/MorningEvening";
import { SnorkelingAtom } from "~/utils/stores";


function BookingTime() {
  const [snorkeling, setSnorkeling] = useAtom(SnorkelingAtom);

  return (
    <>
      <h1 className={`my-5 text-2xl font-normal md:text-4xl`}>Choose between</h1>
      <MorningEvening
        state={snorkeling}
        setState={setSnorkeling}
        linkToRedirect="/snorkeling/booking-people"
      />
    </>
  );
}

export default BookingTime;
