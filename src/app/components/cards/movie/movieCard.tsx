import Link from "next/link";
import { FilmsType } from "@/types/api.types";

type MovieCardProps = {
  movie: FilmsType;
  href?: string;
  className?: string;
};

export default function MovieCard({ movie, href, className }: MovieCardProps) {
  return (
    <Link href={href ?? `/films/${movie.id + 1}`}>
      <div
        className={`border-5   border-yellow-600 rounded-xl overflow-hidden shadow-lg transition-shadow duration-300 group-hover:shadow-yellow-500 ${className}`}
      >
        <div className="p-4 flex flex-col justify-between h-[100px] md:h-[220px]">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-yellow-500 mb-2">
              {movie.title}
            </h3>
            <p className="text-sm text-yellow-400 line-clamp-3">
              {movie.opening_crawl}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
