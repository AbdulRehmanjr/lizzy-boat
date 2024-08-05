"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "./Button";

type Props = {};

const BackButton = (props: Props) => {
  const router = useRouter();
  return <Button onClick={() => router.back()}>Go back</Button>;
};

export default BackButton;
