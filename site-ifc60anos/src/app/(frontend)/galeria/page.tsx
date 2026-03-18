import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import GalleryClient from "@/components/features/galeria/GalleryClient";

export const metadata: Metadata = {
  title: "Galeria",
  description: "Acervo fotográfico digital dos 60 anos do IFC Campus Concórdia.",
};

export default function GaleriaPage() {
  return (
    <>
      <PageHero
        bgImage="/imagens/depenandoGalinha1969 (1).jpg"
        eyebrow="Acervo Digital"
        title="Galeria de"
        titleEm="Memórias"
      />
      <GalleryClient />
    </>
  );
}
