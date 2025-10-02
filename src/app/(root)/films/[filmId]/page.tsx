"use client";

import { getFilmById } from "@/api/films";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function FilmDetails({
  params,
}: {
  params: { filmId: string };
}) {
  const {
    data: film,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getFilmById(params.filmId),
    queryKey: ["film"],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading movies</div>;
  }

  const filmData = film ? (
    <div key={film.episode_id} className="mb-4 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-2">{film.title}</h2>
      <p className="mb-2">{film.opening_crawl}</p>
      <p className="text-sm text-gray-600">Director: {film.director}</p>
      <p className="text-sm text-gray-600">Producer: {film.producer}</p>
      <p className="text-sm text-gray-600">Release Date: {film.release_date}</p>
    </div>
  ) : null;

  return (
    <div className="some-class">
      <h1 className="text-2xl font-bold mb-4">Film Details</h1>
      {filmData}
    </div>
  );
}
