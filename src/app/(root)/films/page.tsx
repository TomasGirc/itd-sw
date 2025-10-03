"use client";

import { getFilms } from "@/api/films";
import MovieCard from "@/app/components/cards/movie/movieCard";
import Loading from "@/app/components/screens/loading";
import { FilmsType } from "@/types/api.types";
import { useQuery } from "@tanstack/react-query";

export default function FilmPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["films"],
    queryFn: () => getFilms(),
  });

  if (isLoading) {
    return <Loading />;
  }

  const listOfFilms = data?.map((film: FilmsType) => (
    <MovieCard movie={film} key={film.id} className="m-6" />
  ));

  return (
    <div className="h-full flex flex-col col-2 star-background">
      <div id="movie-card-list" className="grid grid-cols-2 ">
        {listOfFilms}
      </div>
    </div>
  );
}
