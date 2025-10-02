"use client";

import { getFilms } from "@/api/films";
import { FilmsType } from "@/types/api.types";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function FilmPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["films"],
    queryFn: () => getFilms(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const listOfFilms = data?.map((film: FilmsType) => (
    <Link href={`/films/${film.id}`} key={film.episode_id}>
      <div className="mb-4 p-4 border rounded shadow">
        <h2 className="text-xl font-bold mb-2">{film.title}</h2>
        <p className="mb-2">{film.opening_crawl.substring(0, 128)}</p>
      </div>
    </Link>
  ));

  return (
    <div className="">
      <div>{listOfFilms}</div>
    </div>
  );
}
