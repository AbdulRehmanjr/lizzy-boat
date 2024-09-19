import React from "react";
import SelectPeopleSnorkeling from "~/components/snorkeling/SelectPeopleSnorkeling";

const BookingPeople = () => {
  return (
    <>
      <h1 className={`my-5 text-2xl md:text-4xl`}>Select number of people</h1>
      <SelectPeopleSnorkeling />
    </>
  );
};

export default BookingPeople;
 