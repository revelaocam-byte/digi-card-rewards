import { createFileRoute } from "@tanstack/react-router";
import { PublicClubExperience } from "@/components/app/public-club-experience";
import { loadPublicClubExperience } from "@/lib/public-club";

export const Route = createFileRoute("/club/$businessSlug")({
  loader: ({ params }) => loadPublicClubExperience(params.businessSlug),
  head: () => ({
    meta: [
      { title: "Club de fidelización" },
      {
        name: "description",
        content: "Únete al club y recibe tu tarjeta digital después de verificar tu email.",
      },
    ],
  }),
  component: ClubPage,
});

function ClubPage() {
  const { businessSlug } = Route.useParams();
  const initialData = Route.useLoaderData();
  return <PublicClubExperience organizationSlug={businessSlug} initialData={initialData} />;
}
