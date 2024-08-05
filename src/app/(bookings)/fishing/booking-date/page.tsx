import React from "react";
import { Calendar } from "~/components/fishing/Calendar";

type Props = {};

const BookingDate = (props: Props) => {
  return (
    <>
      <p>Calendar</p>
      <Calendar />
    </>
  );
};

export default BookingDate;
