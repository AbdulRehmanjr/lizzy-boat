"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "./Button";


const BackButton = () => {
  const router = useRouter();
  return <Button onClick={() => router.back()}>Go back</Button>;
};

export default BackButton;
