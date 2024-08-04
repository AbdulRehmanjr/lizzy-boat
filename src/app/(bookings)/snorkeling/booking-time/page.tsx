"use client";
import { useAtom } from "jotai/react";
import React from "react";
import HalfOrFullDay from "~/components/general/HalfOrFullDay";
import MorningEvening from "~/components/general/MorningEvening";
import { SnorkelingAtom } from "~/utils/stores";

type Props = {};

function BookingTime({}: Props) {
  const [snorkeling, setSnorkeling] = useAtom(SnorkelingAtom);

  return (
    <>
      <h1 className={`my-5 text-2xl font-bold md:text-4xl`}>Choose between</h1>
      <MorningEvening
        state={snorkeling}
        setState={setSnorkeling}
        linkToRedirect="/snorkeling/booking-people"
      />
    </>
  );
}

export default BookingTime;
