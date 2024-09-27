"use client";
import Link from "next/link";
import { useEffect } from "react";
import { Button } from "~/components/general/Button";
import { clearLocalStorage } from "~/lib/utils";

export default function SuccessPage() {
  useEffect(() => {
    clearLocalStorage();
  }, []);
  return (
    <section className="col-span-12 flex min-h-[calc(100vh_-_124px)] flex-col items-center justify-center gap-6 p-10">
      <h1 className="font-ibm text-yellow text-center text-2xl md:text-4xl">
        Thanks for renting boats with us!{" "}
      </h1>
      <h2 className="font-libre text-dim-grey text-center text-lg md:text-2xl">
        You will receive a booking confirmation email soon. We are looking
        forward to seeing you soon on La Digue!
      </h2>
      <Button asChild>
        <Link
          href={"/"}
          className="bg-yellow rounded-md p-2 text-center text-base text-white"
        >
          Go back to website
        </Link>
      </Button>
    </section>
  );
}
