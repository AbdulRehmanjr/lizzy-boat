"use client";
import { useAtom } from "jotai/react";
import React from "react";
import HalfOrFullDay from "~/components/general/HalfOrFullDay";
import { SnorkelingAtom } from "~/utils/stores";


function Snorkeling() {
  const [snorkelingData, setSnorkelingData] = useAtom(SnorkelingAtom);

  return (
    <>
      <h1 className={`my-5 text-2xl font-bold md:text-4xl`}>Choose between</h1>
      <HalfOrFullDay
        halfDayPrice="320"
        fullDayPrice="400"
        state={snorkelingData}
        setState={setSnorkelingData}
        linkIfHalfDay="/snorkeling/booking-time"
        linkIfFullDay="/snorkeling/booking-people"
      />
    </>
  );
}

export default Snorkeling;
