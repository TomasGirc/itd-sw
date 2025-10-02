import Link from "next/link";

export default function Screen({
  title,
  href,
  background,
}: {
  title: string;
  href: string;
  background: string;
}) {
  return (
    <Link
      href={href}
      className={`flex-1 flex items-center justify-center ${background}`}
    >
      <span className="text-9xl text-yellow-500 star-background">{title}</span>
    </Link>
  );
}
