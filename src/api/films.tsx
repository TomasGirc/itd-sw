import { FilmsType } from "@/types/api.types";
import { requestRoutes } from "../constants/routes";

export const getFilms = async (): Promise<FilmsType[]> => {
  const response = await fetch(requestRoutes.films, {
    method: "GET",
  });
  const films = await response.json();
  return films.map((film: FilmsType, idx: number) => ({ ...film, id: idx }));
};

export const getFilmById = async (id: string): Promise<FilmsType> => {
  const response = await fetch(`${requestRoutes.films}/${id}`, {
    method: "GET",
  });
  return await response.json();
};
