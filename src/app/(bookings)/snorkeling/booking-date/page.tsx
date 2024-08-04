"use client";
import { useAtom } from "jotai/react";
import React from "react";
import { Button } from "~/components/general/Button";
import { Calendar } from "~/components/snorkeling/Calendar";
import { SnorkelingAtom } from "~/utils/stores";

type Props = {};

const BookingDate = (props: Props) => {
  const [snorkeling, setSnorkeling] = useAtom(SnorkelingAtom);

  return (
    <>
      <p>Calendar</p>
      <Calendar
        // state={snorkeling}
        // setState={setSnorkeling}
        // bookingType="snorkeling"
      />
    </>
  );
};

export default BookingDate;
