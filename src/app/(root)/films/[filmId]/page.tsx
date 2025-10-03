"use client";

import { getFilmById } from "@/api/films";
import { getPeopleById } from "@/api/people";
import StarWarsCrawl from "@/app/components/effects/starWarsCrawl";
import paragraphText from "@/app/components/elements/paragraph";
import DataLayout from "@/app/components/screens/dataLayout";
import Loading from "@/app/components/screens/loading";
import { PersonType } from "@/types/api.types";
import { useQueries, useQuery } from "@tanstack/react-query";
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

  const characterQueries = useQueries({
    queries:
      film?.characters.map((charUrl) => {
        const id = charUrl.split("/").filter(Boolean).pop() || "";
        return {
          queryKey: ["person", id],
          queryFn: () => getPeopleById(id),
        };
      }) || [],
  });

  const characters = characterQueries
    .map((q) => q.data)
    .filter(Boolean) as PersonType[];

  const isLoadingCharacters = characterQueries.some((q) => q.isLoading);

  if (isLoading || isLoadingCharacters) {
    return <Loading />;
  }

  return film ? (
    <DataLayout
      title={film.title}
      backLink="/films"
      leftSection={
        <div className="space-y-4 text-yellow-400 flex flex-col justify-center items-center">
          {paragraphText({
            value: film.episode_id.toString(),
            text: "Episode",
          })}
          {paragraphText({ value: film.director, text: "Director" })}
          {paragraphText({ value: film.producer, text: "Producer" })}
          {paragraphText({ value: film.release_date, text: "Release Date" })}
        </div>
      }
      rightSection={<StarWarsCrawl text={film.opening_crawl} duration={30} />}
      footerTitle="Characters"
      footerItems={characters.map((char) => ({
        name: char.name,
        href: `/people/${char.url.split("/").filter(Boolean).pop()}`,
      }))}
    />
  ) : null;
}
