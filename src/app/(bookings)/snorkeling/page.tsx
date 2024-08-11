"use client";
import { useAtom } from "jotai/react";
import React from "react";
import HalfOrFullDay from "~/components/general/HalfOrFullDay";
import { SnorkelingAtom } from "~/utils/stores";


function Snorkeling() {
  const [snorkelingData, setSnorkelingData] = useAtom(SnorkelingAtom);

  return (
    <>
      <h1 className={`my-5 text-2xl font-normal md:text-4xl text-center`}>Choose between</h1>
      <HalfOrFullDay
        halfDayPrice="65€ per person"
        fullDayPrice="125€ per person"
        state={snorkelingData}
        setState={setSnorkelingData}
        linkIfHalfDay="/snorkeling/booking-time"
        linkIfFullDay="/snorkeling/booking-people"
      />
    </>
  );
}

export default Snorkeling;
