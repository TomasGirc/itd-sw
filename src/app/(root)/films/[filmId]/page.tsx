"use client";

import { getFilmById } from "@/api/films";
import StarWarsCrawl from "@/app/components/effects/starWarsCrawl";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";

export default function FilmDetails({
  params,
}: {
  params: Promise<{ filmId: string }>;
}) {
  const { filmId } = use(params);

  const { data: film, isLoading } = useQuery({
    queryKey: ["film", filmId],
    queryFn: () => getFilmById(filmId),
  });

  if (isLoading) {
    return <div>Loading film...</div>;
  }

  return film ? (
    <div className="h-full star-background p-6 flex flex-col h-screen p-6">
      <h1 className="text-5xl md:text-6xl font-bold text-yellow-500 text-center font-starjedi drop-shadow-[0_0_10px_#fce303] mb-6">
        {film.title}
      </h1>

      <div className="bg-black border border-yellow-600 rounded-xl p-6 shadow-lg hover:shadow-yellow-500 transition-shadow duration-300 flex flex-col h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 mb-6">
          <div className="space-y-4 text-yellow-400 flex flex-col justify-center items-center">
            <p>
              <span className="font-semibold">Episode:</span> {film.episode_id}
            </p>
            <p>
              <span className="font-semibold">Director:</span> {film.director}
            </p>
            <p>
              <span className="font-semibold">Producer:</span> {film.producer}
            </p>
            <p>
              <span className="font-semibold">Release Date:</span>{" "}
              {film.release_date}
            </p>
          </div>
          <div className="flex justify-center items-center">
            <StarWarsCrawl text={film.opening_crawl} duration={30} />
          </div>
        </div>

        <div className="mt-auto space-y-4 text-yellow-400 flex flex-col justify-end items-center">
          <h2 className="text-2xl font-bold">Characters</h2>
          <ul className="flex flex-wrap justify-center gap-4">
            {film.characters.map((character) => (
              <li key={character}>{character}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  ) : null;
}
