"use client";
import { useAtom } from "jotai/react";
import React from "react";
import SelectPeopleSnorkeling from "~/components/snorkeling/SelectPeopleSnorkeling";
import { SnorkelingAtom } from "~/utils/stores";

const BookingPeople = () => {
  return (
    <>
      <h1 className={`my-5 text-2xl md:text-4xl`}>Select number of people</h1>
      <SelectPeopleSnorkeling />
    </>
  );
};

export default BookingPeople;
