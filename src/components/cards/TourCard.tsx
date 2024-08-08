import Image from "next/image";
import Link from "next/link";
import React from "react";
import { cn } from "~/lib/utils";

type Props = { link: string; image: string; text: string; className: string };

const TourCard = ({ image, link, text, className }: Props) => {
  return (
    <Link
      href={link}
      className={cn(
        "relative inline-block h-[300px] overflow-hidden rounded-lg",
        className,
      )}
    >
      <Image
        width={1080}
        height={810}
        className="h-full w-full object-fill grayscale-0 transition-all ease-out hover:scale-105 hover:grayscale-0"
        src={image}
        alt="card image"
      />
      <p className="absolute bottom-[10%] left-1/2 w-full -translate-x-1/2 text-nowrap p-2 text-center text-lg md:text-3xl font-medium text-white backdrop-blur">
        {text}
      </p>
    </Link>
  );
};

export default TourCard;
