"use client";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React from "react";
import { TransferAtom } from "~/utils/stores";

const IslandFrom = () => {
  const router = useRouter();
  const [transferData, setTransfer] = useAtom(TransferAtom);
  return (
    <>
      <h1 className={`my-5 text-2xl md:text-4xl`}>
        Which island will you depart from? (return)
      </h1>
      <menu className="grid grid-rows-2 gap-4 text-center md:grid-flow-row md:grid-cols-2 md:grid-rows-1">
        <li
          className={`grid h-[300px] w-[270px] cursor-pointer flex-col place-content-center items-center justify-center gap-3 rounded-lg border-2 border-[#1f788b] p-5 text-lg text-[#1f788b] hover:bg-[#1f788b] hover:text-[#F7FCFC] sm:w-[350px] md:w-[400px] md:text-2xl ${
            transferData.mode && transferData.mode === "transfer.transferMode"
              ? "bg-[#1f788b] text-[#F7FCFC]"
              : ""
          }`}
          onClick={() => {
            setTransfer((prev) => ({
              ...prev,
              depart_from_return: "La Digue",
            }));
            router.push("/transfer/booking-date-return");
          }}
        >
          <p className="text-2xl md:text-3xl">
            from La Digue to {transferData.transferType}
          </p>
        </li>
        <li
          className={`grid h-[300px] w-[270px] cursor-pointer flex-col place-content-center items-center justify-center gap-3 rounded-lg border-2 border-[#1f788b] p-5 text-lg text-[#1f788b] hover:bg-[#1f788b] hover:text-[#F7FCFC] sm:w-[350px] md:w-[400px] md:text-2xl ${
            transferData.mode && transferData.mode === "transfer.transferMode"
              ? "bg-[#1f788b] text-[#F7FCFC]"
              : ""
          }`}
          onClick={() => {
            setTransfer((prev) => ({
              ...prev,
              depart_from_return: transferData.transferType,
            }));
            router.push("/transfer/booking-date-return");
          }}
        >
          <p className="text-2xl md:text-3xl">
            from {transferData.transferType} to La Digue
          </p>
        </li>
      </menu>
    </>
  );
};

export default IslandFrom;
