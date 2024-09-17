"use client";

import { useAtom } from "jotai/react";
import { useRouter } from "next/navigation";
import { TransferAtom } from "~/utils/stores";
import { InfoPara } from "../general/infopara";
import { Label } from "../general/label";

export const TransferType = () => { 
  const router = useRouter();
  const [transferData, setTransfer] = useAtom(TransferAtom);

  const transfers = [
    {
      name: "Praslin",
      duration: "One way",
      transferMode: "praslin_one_way",
      price: "125€",
    },
    {
      name: "Mahe",
      duration: "Back and forth",
      transferMode: "praslin_back_n_forth",
      price: "200€",
    },
    {
      name: "Felicity",
      duration: "One way",
      transferMode: "felicity_one_way",
      price: "125€",
    },
    // {
    //   name: "Felicity 4 Pax",
    //   duration: "Back and forth",
    //   transferMode: "felicity_back_n_forth",
    //   price: "200€",
    // },
    // {
    //   name: "Mahe 4 Pax",
    //   duration: "One way ",
    //   transferMode: "mahe_one_way",
    //   price: "400€",
    // },
    // {
    //   name: "Mahe 4 Pax",
    //   duration: "Back and forth",
    //   transferMode: "mahe_back_n_forth",
    //   price: "700€",
    // },
  ];

  return (
    <menu className="grid grid-rows-2 gap-4 text-center md:grid-flow-row md:grid-cols-2 lg:grid-cols-3 md:grid-rows-1">
      {transfers.map((transfer, index) => (
        <li
          key={index}
          className={`grid place-content-center border-2 ${transferData.mode && transferData.mode === transfer.transferMode ? "bg-[#1f788b] text-[#F7FCFC]" : "border-[#1f788b] text-[#1f788b]"} h-[15rem] w-[20rem] rounded-md p-4 hover:cursor-pointer hover:bg-[#1f788b] hover:text-[#F7FCFC]`}
          onClick={() => {
            setTransfer((prev) => ({
              ...prev,
              transferType: transfer.name,
              // mode: transfer.transferMode,
            }));
            router.push("/transfer/booking-mode");
          }}
        >
          <Label
            text={transfer.name}
            className="text-base font-bold md:text-2xl"
          />
          {/* <p className="text-lg">{transfer?.duration}</p> */}
          {/* <InfoPara text={transfer.price} /> */}
        </li>
      ))}
    </menu>
  );
};
