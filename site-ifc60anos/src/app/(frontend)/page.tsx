import type { Metadata } from "next";
import HeroCarousel from "@/components/features/home/HeroCarousel";
import StatsBar from "@/components/features/home/StatsBar";
import TimelineBanner from "@/components/features/home/TimelineBanner";
import NavCards from "@/components/features/home/NavCards";
import QuoteSection from "@/components/features/home/QuoteSection";

export const metadata: Metadata = {
  title: "IFC 60 Anos — Legado em Evolução",
  description:
    "Portal oficial comemorativo dos 60 anos do IFC Campus Concórdia. Uma jornada pela nossa história, memórias e legado.",
};

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <StatsBar />
      <TimelineBanner />
      <NavCards />
      <QuoteSection />
    </>
  );
}
