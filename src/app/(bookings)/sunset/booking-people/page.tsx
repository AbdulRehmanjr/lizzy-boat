"use client";
import { useAtom } from "jotai";
import React from "react";
import SelectPeople from "~/components/general/SelectPeople";
import { SunsetAtom } from "~/utils/stores";


const BookingPeople = () => {
  const [sunsetData, setSunsetData] = useAtom(SunsetAtom);

  return (
    <>
      <h1 className={`my-5 text-2xl md:text-4xl`}>
        Select number of people
      </h1>
      <SelectPeople
        state={sunsetData}
        setState={setSunsetData}
        linkToRedirect="/sunset/booking-date"
      />
    </>
  );
};

export default BookingPeople;
