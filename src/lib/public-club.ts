import { supabase } from "@/integrations/supabase/client";

export async function loadPublicClubExperience(organizationSlug: string, locationSlug?: string) {
  try {
    const { data: organization, error } = await supabase
      .from("organizations")
      .select("id, display_name, slug, contact_email, contact_phone, organization_branding(*)")
      .eq("slug", organizationSlug)
      .eq("status", "active")
      .maybeSingle();
    if (error || !organization) return null;

    let location: { id: string; name: string } | null = null;
    let locationProgramId: string | null = null;
    if (locationSlug) {
      const locationResult = await supabase
        .from("locations")
        .select("id, name")
        .eq("organization_id", organization.id)
        .eq("slug", locationSlug)
        .eq("status", "active")
        .maybeSingle();
      location = locationResult.data ?? null;
      if (locationResult.error || !location) return null;

      const { data: assignment, error: assignmentError } = await supabase
        .from("program_locations")
        .select("program_id")
        .eq("location_id", location.id)
        .limit(1)
        .maybeSingle();
      if (assignmentError || !assignment) return null;
      locationProgramId = assignment.program_id;
    }

    let programQuery = supabase
      .from("loyalty_programs")
      .select("id, public_name, description, earning_mode, earning_value, terms")
      .eq("organization_id", organization.id)
      .eq("status", "active");
    if (locationProgramId) programQuery = programQuery.eq("id", locationProgramId);
    const { data: program, error: programError } = await programQuery.limit(1).maybeSingle();
    if (programError || !program) return null;

    const rawBranding = organization.organization_branding;
    return {
      organization,
      program,
      branding: Array.isArray(rawBranding) ? (rawBranding[0] ?? null) : rawBranding,
      location,
    };
  } catch (error) {
    console.error("No se pudo cargar el club público", error);
    return null;
  }
}

export type PublicClubData = Awaited<ReturnType<typeof loadPublicClubExperience>>;
