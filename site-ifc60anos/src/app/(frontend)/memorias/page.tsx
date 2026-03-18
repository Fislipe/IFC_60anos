import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import MemoriasGrid from "@/components/features/memorias/MemoriasGrid";

export const metadata: Metadata = {
  title: "Memórias",
  description: "Relatos e vivências que moldaram o IFC Campus Concórdia.",
};

export default function MemoriasPage() {
  return (
    <>
      <PageHero
        bgImage="/imagens/formaturaPrimeiraTurma (1).jpg"
        eyebrow="Relatos e Vivências"
        title="Textos de"
        titleEm="Memórias"
      />
      <div className="section-intro">
        <p>
          Uma coleção de perspectivas sobre o cotidiano, os desafios e as
          conquistas que moldaram o campus ao longo de seis décadas.
        </p>
      </div>
      <MemoriasGrid />
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
