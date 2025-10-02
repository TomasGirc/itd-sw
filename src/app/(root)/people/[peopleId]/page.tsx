"use client";

import { getFilmById } from "@/api/films";
import { getPeopleById } from "@/api/people";
import ProfileImage from "@/app/components/cards/profileImage";
import { FilmsType } from "@/types/api.types";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { use, useEffect, useState } from "react";

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

  const [films, setFilms] = useState<FilmsType[]>([]);

  useEffect(() => {
    if (people && people.films) {
      Promise.all(people.films.map((film) => getFilmById(film.id))).then(
        (filmData: FilmsType[]) => setFilms(filmData)
      );
    }
  }, [people]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  function paragraphText({ value, text }: { value: string; text: string }) {
    return (
      <>
        <p className="text-xl text-yellow-400">
          <span className="font-semibold">
            {text}: {value}
          </span>
        </p>
      </>
    );
  }

  const peopleData = people ? (
    <div
      key={people.name}
      className="h-full rounded-xl shadow-lg bg-black border border-yellow-600 hover:shadow-yellow-500 transition-shadow duration-300 flex flex-col"
    >
      <div className="flex-none border-b border-yellow-600 pb-2 h-[10%]">
        <p className="text-5xl md:text-6xl text-yellow-500 font-bold text-center font-starjedi drop-shadow-[0_0_10px_#fce303]">
          {people.name}
        </p>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-yellow-600 h-[70%]">
        <div className="flex justify-center items-center border-yellow-600 border-r">
          <ProfileImage />
        </div>

        <div className="space-y-2 flex justify-center items-center flex-col">
          {paragraphText({ value: people.height, text: "Height" })}
          {paragraphText({ value: people.mass, text: "Mass" })}
          {paragraphText({ value: people.hair_color, text: "Hair Color" })}
          {paragraphText({ value: people.skin_color, text: "Skin Color" })}
          {paragraphText({ value: people.eye_color, text: "Eye Color" })}
          {paragraphText({ value: people.birth_year, text: "Birth Year" })}
          {paragraphText({ value: people.gender, text: "Gender" })}
        </div>
      </div>

      <div className=" flex-none h-[20%] p-6">
        <p className="text-xl text-yellow-400 border-yellow-600 pt-2">
          <span className="font-semibold">Films:</span>{" "}
          {films.map((film, index) => (
            <Link
              key={index}
              href={`/films/${film.url.split("/").filter(Boolean).pop()}`}
              className="hover:underline"
            >
              {film.title}
              {index < films.length - 1 ? ", " : ""}
            </Link>
          ))}
        </p>
      </div>
    </div>
  ) : null;

  return <div className="h-full star-background">{peopleData}</div>;
}
