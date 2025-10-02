export type FilmsType = {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    characters: string[];
    planets: string[];
    starships: string[];
    vehicles: string[];
    species: string[];
    created: string;
    edited: string;
    url: string;
    id: number;
};

export type PersonType = {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    films: [{ url: string; id: string }];
    url: string;
    species: string[];
    vehicles: string[];
    starships: string[];
    created: string;
    edited: string;
    id: number;
};

export type FilmsResponseType = {
    count: number;
    next: string | null;
    results: FilmsType[];
};