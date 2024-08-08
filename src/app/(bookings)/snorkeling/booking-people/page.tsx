"use client";
import { useAtom } from "jotai/react";
import React from "react";
import SelectPeople from "~/components/general/SelectPeople";
import { SnorkelingAtom } from "~/utils/stores";


const BookingPeople = () => {
  const [snorkeling, setSnorkeling] = useAtom(SnorkelingAtom);
  return (
    <>
      <h1 className={`my-5 text-2xl md:text-4xl`}>
        Select number of people
      </h1>
      <SelectPeople
        linkToRedirect="/snorkeling/booking-date"
        state={snorkeling}
        setState={setSnorkeling}
      />
    </>
  );
};

export default BookingPeople;