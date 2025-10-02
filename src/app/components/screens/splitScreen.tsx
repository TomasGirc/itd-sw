import Screen from "./screen";

export default function SplitScreen({
  screens,
}: {
  screens: Array<{ title: string; href: string; background: string }>;
}) {
  return (
    <div className="flex flex-col h-screen w-full md:flex-row wrapper">
      {screens.map((screen) => (
        <Screen
          key={screen.title}
          title={screen.title}
          href={screen.href}
          background={screen.background}
        />
      ))}
    </div>
  );
}
