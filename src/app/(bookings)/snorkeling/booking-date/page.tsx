"use client";
import { useAtom } from "jotai/react";
import React from "react"; 
import { Calendar } from "~/components/snorkeling/Calendar";
import { SnorkelingAtom } from "~/utils/stores";

type Props = {};

const BookingDate = (props: Props) => {
  const [snorkeling, setSnorkeling] = useAtom(SnorkelingAtom);

  return (
    <>
      <Calendar
      />
    </>
  );
};

export default BookingDate;
