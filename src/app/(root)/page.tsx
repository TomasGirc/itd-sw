import SplitScreen from "../components/screens/splitScreen";

export default function Home() {
  const screens = [
    {
      title: "films",
      href: "/films",
      background: "films-background",
    },
    {
      title: "people",
      href: "/people",
      background: "people-background",
    },
  ];

  return <SplitScreen screens={screens} />;
}
