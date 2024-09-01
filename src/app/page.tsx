"use client";
import clsx from "clsx";
import { useEffect } from "react";
import TourCard from "~/components/cards/TourCard";
import { tourCards } from "~/constants";
import { clearLocalStorage } from "~/lib/utils";

export default async function Home() {
  useEffect(() => {
    clearLocalStorage();
  }, []);
  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <h1
        className={`text-center text-2xl font-normal text-[#1f788b] md:text-4xl`}
      >
        Explore your journey
      </h1>
      <menu className="grid grid-cols-2 grid-rows-3 gap-4 p-10">
        {tourCards.map((card, index) => (
          <TourCard
            className={clsx("col-span-2 md:col-span-1", {
              "flex justify-center md:col-span-2": index + 1 === 5,
            })}
            key={index}
            image={card.image}
            text={card.text}
            link={card.link}
          />
        ))}
      </menu>
    </section>
  );
}
