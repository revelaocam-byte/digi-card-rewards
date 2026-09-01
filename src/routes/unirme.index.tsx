import { createFileRoute, Link } from "@tanstack/react-router";
import { QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/unirme/")({
  head: () => ({
    meta: [
      { title: "Únete a un club — Fideleo" },
      {
        name: "description",
        content: "Escanea el QR de tu establecimiento para unirte a su programa de fidelización.",
      },
    ],
  }),
  component: JoinLanding,
});

function JoinLanding() {
  return (
    <main className="grid min-h-screen place-items-center bg-neutral-100 p-6">
      <section className="w-full max-w-lg rounded-[2rem] bg-white p-8 text-center shadow-xl sm:p-12">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-black text-white">
          <QrCode className="size-7" />
        </span>
        <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight">
          Escanea el QR de tu local
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-black/55">
          Cada establecimiento tiene su propio enlace. Escanea el QR que encontrarás en el local
          para unirte a su club y conseguir tu tarjeta digital.
        </p>
        <Button asChild className="mt-7 rounded-full">
          <Link to="/">Conocer Fideleo</Link>
        </Button>
      </section>
    </main>
  );
}
