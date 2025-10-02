"use client";

import { getPeople } from "@/api/people";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

export default function PeoplePage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["people"],
    queryFn: () => getPeople(),
  });

  const [page, setPage] = React.useState(1);
  const [searchTerm, setSearchTerm] = React.useState("");
  const pageSize = 9;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading people</div>;
  }

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

  return (
    <div>
      <h1>People Page</h1>

      <input
        type="text"
        placeholder="Search people..."
        className="mb-4 p-2 border rounded"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {visiblePeople.map((person) => (
          <Link href={`/people/${person.id}`} key={person.id}>
            <div className="border rounded-lg p-6 flex flex-col items-center justify-center h-40 bg-gray-100 hover:bg-gray-200 transition">
              <span className="text-lg font-bold mb-2">{person.name}</span>
              <span className="text-xs text-gray-500">ID: {person.id}</span>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
