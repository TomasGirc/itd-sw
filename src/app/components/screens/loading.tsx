import Image from "next/image";

export default function Loading() {
  return (
    <div className="h-screen w-screen flex items-center justify-center star-background">
      <div className="flex flex-col items-center justify-center p-5">
        <Image
          src="/images/loading.gif"
          alt="Loading..."
          className="mb-5"
          width={800}
          height={600}
          unoptimized
        />
        <p className="text-yellow-500 text-xl">Loading, please wait...</p>
      </div>
    </div>
  );
}
