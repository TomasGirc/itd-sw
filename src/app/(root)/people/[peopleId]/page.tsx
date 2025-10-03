"use client";

import { getFilmById } from "@/api/films";
import { getPeopleById } from "@/api/people";
import ProfileImage from "@/app/components/cards/profile/profileImage";
import paragraphText from "@/app/components/elements/paragraph";
import DataLayout from "@/app/components/screens/dataLayout";
import Loading from "@/app/components/screens/loading";
import { FilmsType } from "@/types/api.types";
import { useQueries, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { use } from "react";

export default function PeopleDetails({
  params,
}: {
  params: Promise<{ peopleId: string }>;
}) {
  const { peopleId } = use(params);

  const { data: people, isLoading } = useQuery({
    queryFn: () => getPeopleById(peopleId),
    queryKey: ["person", peopleId],
  });

  const filmQueries = useQueries({
    queries:
      people?.films.map((film) => ({
        queryKey: ["film", film.id],
        queryFn: () => getFilmById(film.id),
      })) || [],
  });

  const films = filmQueries.map((q) => q.data).filter(Boolean) as FilmsType[];

  const isLoadingFilms = filmQueries.some((q) => q.isLoading);

  if (isLoading || isLoadingFilms) {
    return <Loading />;
  }

  return people ? (
    <DataLayout
      title={people.name}
      backLink="/people"
      leftSection={<ProfileImage />}
      rightSection={
        <>
          {paragraphText({ value: people.height, text: "Height" })}
          {paragraphText({ value: people.mass, text: "Mass" })}
          {paragraphText({ value: people.hair_color, text: "Hair Color" })}
          {paragraphText({ value: people.skin_color, text: "Skin Color" })}
          {paragraphText({ value: people.eye_color, text: "Eye Color" })}
          {paragraphText({ value: people.birth_year, text: "Birth Year" })}
          {paragraphText({ value: people.gender, text: "Gender" })}
        </>
      }
      footerTitle="Films"
      footerItems={films.map((film) => ({
        name: film.title,
        href: `/films/${film.url.split("/").filter(Boolean).pop()}`,
      }))}
    />
  ) : null;
}
