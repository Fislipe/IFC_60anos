import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import TimelineList from "@/components/features/historia/TimelineList";

export const metadata: Metadata = {
  title: "História",
  description: "Conheça a trajetória de 60 anos do IFC Campus Concórdia.",
};

export default function HistoriaPage() {
  return (
    <>
      <PageHero
        bgImage="/imagens/EAgrotecnica.jpg"
        eyebrow="Nossa Jornada"
        title="História do"
        titleEm="Campus"
      />
      <TimelineList />
    </>
  );
}
