"use client";

import { getFilmById } from "@/api/films";
import { getPeopleById } from "@/api/people";
import { FilmsType } from "@/types/api.types";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function PeopleDetails({
  params,
}: {
  params: { peopleId: string };
}) {
  const {
    data: people,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getPeopleById(params.peopleId),
    queryKey: ["person"],
  });

  const [films, setFilms] = React.useState<FilmsType[]>([]);

  React.useEffect(() => {
    if (people && people.films) {
      Promise.all(people.films.map((film) => getFilmById(film.id))).then(
        (filmData: FilmsType[]) => setFilms(filmData)
      );
    }
  }, [people]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading movies</div>;
  }

  const peopleData = people ? (
    <div key={people.name} className="mb-4 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-2">{people.name}</h2>
      <p className="text-sm text-gray-600">Height: {people.height}</p>
      <p className="text-sm text-gray-600">Mass: {people.mass}</p>
      <p className="text-sm text-gray-600">Hair Color: {people.hair_color}</p>
      <p className="text-sm text-gray-600">Skin Color: {people.skin_color}</p>
      <p className="text-sm text-gray-600">Eye Color: {people.eye_color}</p>
      <p className="text-sm text-gray-600">Birth Year: {people.birth_year}</p>
      <p className="text-sm text-gray-600">Gender: {people.gender}</p>
      <p className="text-sm text-gray-600">
        Films: {films.map((film) => film.title).join(", ")}
      </p>
    </div>
  ) : null;

  return (
    <div className="some-class">
      <h1 className="text-2xl font-bold mb-4">People Details</h1>
      {peopleData}
    </div>
  );
}
