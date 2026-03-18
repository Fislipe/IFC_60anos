import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ArticleReader from "@/components/features/memorias/ArticleReader";

const TEXTOS: Record<
  string,
  { title: string; author: string; about: string; content: string[] }
> = {
  "texto-1": {
    title: "O despertar da EAgro nos anos 80",
    author: "João Silva",
    about: "Vivências estudantis",
    content: [
      "Sílvia: Olha, 60 anos do Campus Concórdia, um projeto que a gente tem no ensino, pesquisa e extensão, e essa é a parte da pesquisa, né? Conversar com ex-servidores, com ex-alunos, para coletar dados e para a gente também pensar, escrever um pouco das memórias da escola, é essa a ideia. Então, Helena, você foi servidora aqui no Campus, hoje já aposentada, você se apresenta, fala quem é você, onde você mora, filhos, quanto tempo trabalhou aqui?",
      "Helena: Sim, sim. Tá, meu nome é Helena Kritzmann, eu me aposentei agora, no passado, em junho. Trabalhei 37 anos aqui no Instituto, vim morar no Instituto em 1985, com 16 anos, fiz concurso dois anos depois que eu estava aqui dentro. Quando vim morar, meu filho tinha cinco meses, agora ele tem 40 anos. Depois de dois anos morando aqui na escola, eu fiz o concurso público, aí demorou alguns meses, eu entrei na serviços gerais, e daí fui passando vários setores da escola. Trabalhei 37 anos só aqui no Instituto, foi o meu único emprego, não trabalhei em outro lugar.",
      '|DESTAQUE|"Trabalhei 37 anos só aqui no Instituto — foi o meu único emprego, não trabalhei em outro lugar."',
      "Nós morávamos ali em Concórdia. O pai trabalhava numa empresa de construção, na prefeitura eu acho que ele trabalhava, se não me engano, e a escola estava procurando funcionários. Tinha a Elisete Benetti, que estava à cata de gente, tipo a laço procurando, porque como a escola era muito longe, ninguém gostava de trabalhar aqui, porque daí se tu morasse no centro, a condução era o ônibus do Instituto, trazia de manhã e levava de volta de noite.",
    ],
  },
  "texto-2": {
    title: "Dos Mestres Agrícolas ao IFC",
    author: "Maria Oliveira",
    about: "Evolução institucional",
    content: [
      "A transição de Escola Agrotécnica Federal para Instituto Federal Catarinense em 2008 representou mais do que uma mudança de nome — foi uma reinvenção completa da missão educacional do campus.",
      "Desde os primeiros mestres agrícolas formados em 1968, a instituição sempre manteve seu compromisso com o desenvolvimento rural e a formação técnica de excelência.",
      '|DESTAQUE|"A mudança para Instituto Federal não apagou nossa história — a amplificou."',
      "Hoje, com mais de 15 cursos ativos entre técnicos, graduações e pós-graduações, o Campus Concórdia é uma referência no oeste catarinense, mantendo suas raízes agrícolas enquanto abraça novas áreas do conhecimento.",
    ],
  },
  "texto-3": {
    title: "A Ciência no Campo: 60 anos",
    author: "Prof. Carlos",
    about: "Desenvolvimento técnico",
    content: [
      "O desenvolvimento técnico-científico do Campus Concórdia acompanhou as grandes transformações da agricultura brasileira ao longo de seis décadas.",
      "Dos primeiros campos experimentais nos anos 60, passando pela modernização dos laboratórios nos anos 90, até os projetos de pesquisa aplicada em agroecologia e sustentabilidade dos dias atuais.",
      '|DESTAQUE|"A ciência no campo não é apenas sobre produtividade — é sobre o futuro das comunidades rurais."',
      "O legado científico do campus se reflete não apenas nas publicações acadêmicas, mas principalmente nas transformações concretas que gerações de pesquisadores e técnicos trouxeram para as propriedades rurais da região.",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(TEXTOS).map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const texto = TEXTOS[slug];
    return {
      title: texto ? texto.title : "Texto de Memória",
    };
  });
}

export default async function MemoriaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const texto = TEXTOS[slug];
  if (!texto) notFound();

  return (
    <ArticleReader
      title={texto.title}
      author={texto.author}
      about={texto.about}
      content={texto.content}
    />
  );
}
