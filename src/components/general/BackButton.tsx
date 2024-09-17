"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "./Button";


const BackButton = () => {
  const router = useRouter();
  return <Button variant={"outline"} className="hover:bg-[#1f788b] hover:text-white" onClick={() => router.back()}>Go back</Button>;
};

export default BackButton;
