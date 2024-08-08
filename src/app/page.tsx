import clsx from "clsx";
import TourCard from "~/components/cards/TourCard";
import { tourCards } from "~/constants";

export default async function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <h1 className={`text-2xl font-normal md:text-4xl text-[#1f788b] text-center`}>Explore your journey</h1>
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
