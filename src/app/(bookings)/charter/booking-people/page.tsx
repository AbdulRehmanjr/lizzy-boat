"use client";
import { useAtom } from "jotai/react";
import React from "react";
import SelectPeople from "~/components/general/SelectPeople";
import { PrivateAtom } from "~/utils/stores";


const BookingPeople = () => {
  const [privateAtom, setPrivateData] = useAtom(PrivateAtom);

  return (
    <>
      <h1 className={`my-5 text-2xl md:text-4xl`}>
        Select number of people
      </h1>
      <SelectPeople linkToRedirect="/charter/booking-date" state={privateAtom} setState={setPrivateData} />
    </>
  );
};

export default BookingPeople;
