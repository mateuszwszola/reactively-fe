import type { V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Reactively" }];
};

export default function Index() {
  return (
    <main>
      <h1>Reactively ✨</h1>
    </main>
  );
}
