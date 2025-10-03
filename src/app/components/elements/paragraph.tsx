export default function paragraphText({
  value,
  text,
}: {
  value: string;
  text: string;
}) {
  return (
    <>
      <p className="text-xl text-yellow-400">
        <span className="font-semibold">
          {text}: {value}
        </span>
      </p>
    </>
  );
}
