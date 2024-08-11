import React from "react";
import { TransferType } from "~/components/transfer/TransferType";

const Fishing = () => {

  return (
    <>
      <h1 className={`text-center text-2xl font-bold md:text-4xl`}>
        Choose between
      </h1>
      <TransferType />
    </>
  );
};

export default Fishing;
