import React from "react";
import TransferMode from "~/components/transfer/TransferMode";
const BookingMode = () => {
  return (
    <>
      <h1 className={`my-5 text-2xl md:text-4xl`}>Choose your mode</h1>
      <TransferMode />
    </>
  );
};

export default BookingMode;
