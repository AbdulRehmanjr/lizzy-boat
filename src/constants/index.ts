interface TourCardProps {
  link: string;
  image: string;
  text: string;
}

// Create an array of objects
export const tourCards: TourCardProps[] = [
  {
    link: "/snorkeling",
    image: "/card-images/snorkeling.jpg",
    text: "Snorkeling",
  },
  {
    link: "/fishing",
    image: "/card-images/fishing.jpg",
    text: "Fishing",
  },
  {
    link: "/private-charter",
    image: "/card-images/boat.png",
    text: "Private Charter",
  },
  {
    link: "/private-transfer",
    image: "/card-images/boat.png",
    text: "Private Transfer",
  },
  {
    link: "/sunset-tour",
    image: "/card-images/boat1.jpg",
    text: "Sunset Tour",
  },
];
