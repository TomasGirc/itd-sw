"use client";

import { getPeople } from "@/api/people";
import ProfileCard from "@/app/components/cards/profileCard";
import SearchInput from "@/app/components/inputs/searchInput";
import Pagination from "@/app/components/pagination/pagination";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function PeoplePage() {
  const { data, isLoading } = useQuery({
    queryKey: ["people"],
    queryFn: () => getPeople(),
  });

  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 10;

  const filteredPeople = searchTerm
    ? (data || []).filter((person) =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : data || [];

  const totalPages = filteredPeople.length
    ? Math.ceil(filteredPeople.length / pageSize)
    : 1;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const visiblePeople = filteredPeople.slice(startIndex, endIndex);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchTerm(inputValue);
    }, 1000);

    return () => clearTimeout(handler);
  }, [inputValue]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full flex flex-col star-background">
      <SearchInput
        value={inputValue}
        onChange={setInputValue}
        placeholder="Search people..."
      />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-10">
        {visiblePeople.map((person) => (
          <ProfileCard key={person.id} data={person} />
        ))}
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        className="mt-auto"
      />
    </div>
  );
}
