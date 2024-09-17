"use client";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React from "react";
import { TransferAtom } from "~/utils/stores";

const TransferMode = () => {
  const router = useRouter();
  const [transferData, setTransfer] = useAtom(TransferAtom);

  return (
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
            mode:
              transferData.transferType === "Praslin"
                ? "praslin_one_way"
                : transferData.transferType === "Mahe"
                  ? "mahe_one_way"
                  : transferData.transferType === "Felicity"
                    ? "felicity_one_way"
                    : "",
          }));
          router.push("/transfer/booking-people");
        }}
      >
        <p className="text-4xl md:text-4xl">One way</p>
        <div>
          <p>4 Pax</p>
          <p className="text-[16px]">(+40 € for each additional)</p>
          <p className="text-3xl">
            {transferData.transferType === "Praslin"
              ? "125 €"
              : transferData.transferType === "Mahe"
                ? "400 €"
                : transferData.transferType === "Felicity"
                  ? "125 €"
                  : ""}
          </p>
        </div>
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
            mode:
              transferData.transferType === "Praslin"
                ? "praslin_back_n_forth"
                : transferData.transferType === "Mahe"
                  ? "mahe_back_n_forth"
                  : transferData.transferType === "Felicity"
                    ? "felicity_back_n_forth"
                    : "",
          }));
          router.push("/transfer/booking-people");
        }}
      >
        <p className="text-4xl md:text-4xl">Back and forth</p>
        <div>
          <p>4 Pax</p>
          <p className="text-[16px]">(+40 € for each additional)</p>
          <p className="text-3xl">
            {transferData.transferType === "Praslin"
              ? "200 €"
              : transferData.transferType === "Mahe"
                ? "700 €"
                : transferData.transferType === "Felicity"
                  ? "200 €"
                  : ""}
          </p>
        </div>
      </li>
    </menu>
  );
};

export default TransferMode;
