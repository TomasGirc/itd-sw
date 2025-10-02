import { requestRoutes } from "@/constants/routes";
import { PersonType } from "@/types/api.types";

export const getPeople = async (): Promise<PersonType[]> => {
  const response = await fetch(requestRoutes.people, {
    method: "GET",
  });
  const data = await response.json();
  return (data || []).map((person: PersonType) => ({
    ...person,
    id: person.url.split("/").filter(Boolean).pop(),
  }));
};

export const getPeopleById = async (id: string): Promise<PersonType> => {
  const response = await fetch(`${requestRoutes.people}/${id}`, {
    method: "GET",
  });
  const person = await response.json();
  if (person.films && Array.isArray(person.films)) {
    person.films = person.films.map((filmUrl: string) => ({
      url: filmUrl,
      id: filmUrl.split("/").filter(Boolean).pop(),
    }));
  }
  return person;
};
