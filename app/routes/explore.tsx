import type { V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "Explore",
    },
  ];
};

export default function ExplorePage() {
  return (
    <main>
      <h1>Explore</h1>
    </main>
  );
}
