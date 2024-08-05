"use client";
import { useAtom } from "jotai/react";
import React from "react";
import SelectPeople from "~/components/general/SelectPeople";
import { SnorkelingAtom } from "~/utils/stores";

type Props = {};

const BookingPeople = (props: Props) => {
  const [snorkeling, setSnorkeling] = useAtom(SnorkelingAtom);
  return (
    <>
      <h1 className={`my-5 text-2xl font-bold md:text-4xl`}>
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
