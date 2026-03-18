import type { Metadata } from "next";
import PesquisaClient from "@/components/features/pesquisa/PesquisaClient";

export const metadata: Metadata = {
  title: "Pesquisa",
  description: "Sistema de busca do acervo digital do IFC 60 Anos — Em breve.",
};

export default function PesquisaPage() {
  return <PesquisaClient />;
}
