import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import EntrevistasList from "@/components/features/entrevistas/EntrevistasList";

export const metadata: Metadata = {
  title: "Vozes",
  description:
    "Testemunhos de quem ajudou a construir a história do IFC Campus Concórdia.",
};

export default function EntrevistasPage() {
  return (
    <>
      <PageHero
        bgImage="/imagens/inauguraçãoCampo.jpg"
        eyebrow="Relatos Orais"
        title="Vozes do"
        titleEm="Campus"
      />
      <div className="section-intro">
        <p>
          Testemunhos emocionantes de quem ajudou a construir a história de seis
          décadas do IFC Campus Concórdia.
        </p>
      </div>
      <EntrevistasList />
      <style>{`
        .section-intro {
          padding: 5rem 5rem 3rem;
          max-width: 680px;
        }
        .section-intro p {
          font-size: 1.05rem;
          line-height: 1.8;
          color: var(--color-muted);
        }
        @media (max-width: 900px) {
          .section-intro { padding: 3rem 2rem 2rem; }
        }
      `}</style>
    </>
  );
}
