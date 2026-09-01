import { createFileRoute } from "@tanstack/react-router";
import { PublicClubExperience } from "@/components/app/public-club-experience";
import { loadPublicClubExperience } from "@/lib/public-club";

export const Route = createFileRoute("/unirme/$organizationSlug/$locationSlug")({
  loader: ({ params }) => loadPublicClubExperience(params.organizationSlug, params.locationSlug),
  head: () => ({
    meta: [
      { title: "Únete al programa de fidelización" },
      {
        name: "description",
        content: "Regístrate, verifica tu email y consigue tu tarjeta digital.",
      },
    ],
  }),
  component: JoinPage,
});

function JoinPage() {
  const { organizationSlug, locationSlug } = Route.useParams();
  const initialData = Route.useLoaderData();
  return (
    <PublicClubExperience
      organizationSlug={organizationSlug}
      locationSlug={locationSlug}
      initialData={initialData}
    />
  );
}
