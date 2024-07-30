import Link from "next/link";
import {  HydrateClient } from "~/trpc/server";

export default async function Home() {

  return (
    <HydrateClient>
      <main>Lizzy Boat</main>
    </HydrateClient>
  );
}
