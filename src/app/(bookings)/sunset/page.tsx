"use client";
import { useAtom } from "jotai/react";
import React from "react";
import SelectPeople from "~/components/general/SelectPeople";
import { SunsetAtom } from "~/utils/stores";


const Fishing = () => {
  const [sunsetData, setSunsetData] = useAtom(SunsetAtom);

  return (
    <>
      <h1 className={`text-2xl md:text-4xl text-center`}>Choose between</h1>
      <SelectPeople
        state={sunsetData}
        setState={setSunsetData}
        linkToRedirect="/sunset/booking-date"
      />
    </>
  );
};

export default Fishing;
