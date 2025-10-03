"use client";

import Link from "next/link";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center star-background p-6">
      <h2 className="text-4xl md:text-5xl font-bold text-yellow-500 font-starjedi drop-shadow-[0_0_10px_#fce303]">
        Something went wrong!
      </h2>
      <p className="mt-4 text-yellow-400 text-lg">{error.message}</p>
      <Link
        href="/"
        className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-3 rounded-lg transition-colors duration-300"
      >
        Go back to Home
      </Link>
    </div>
  );
}
