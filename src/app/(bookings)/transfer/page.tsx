import React from "react";
import { TransferType } from "~/components/transfer/TransferType";

const Fishing = () => {

  return (
    <>
      <h1 className={`text-center text-2xl md:text-4xl mb-4`}>
        Choose your itinerary
      </h1>
      {/* <p>(+40 € for each additional pax)</p> */}
      <TransferType />
    </>
  );
};

export default Fishing;
