import { Link, createFileRoute } from "@tanstack/react-router";

import { buildMeta } from "@/lib/public/seo";

export const Route = createFileRoute("/")({
  head: () =>
    buildMeta({
      title: "Publieke omgeving in voorbereiding",
      siteName: "VZ Juspol Gen",
      description:
        "De publieke pagina's van VZ Juspol Gen worden voorbereid. Er is nog geen goedgekeurde inhoud gepubliceerd.",
    }),
  component: Index,
});

function Index() {
  return (
    <div className="vz-public flex min-h-screen flex-col">
      <main className="vz-section flex flex-1 items-center">
        <div className="vz-container">
          <div className="mx-auto max-w-[42rem] rounded-vz-card bg-vz-light p-8 shadow-vz-card sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-vz-primary">
              VZ Juspol Gen
            </p>
            <h1 className="mt-3">Publieke omgeving in voorbereiding</h1>
            <p className="mt-4">
              De publieke pagina's worden opgebouwd op een vastgestelde
              visuele basis. Er is nog geen goedgekeurde inhoud beschikbaar,
              daarom toont deze pagina bewust geen informatie over diensten,
              contactgegevens of procedures.
            </p>
            <p className="mt-4">
              Zodra inhoud is goedgekeurd en vrijgegeven, verschijnt deze hier.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
