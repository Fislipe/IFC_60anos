# Documento de Arquitetura e Planejamento: Plataforma IFC 60 Anos

**Visão Geral:** Este documento define as diretrizes técnicas, arquitetura de software e modelagem de banco de dados para a construção do portal comemorativo de 60 anos do Instituto Federal Catarinense (IFC) Campus Concórdia. O foco é garantir alta performance, preservação histórica, excelência em SEO e acessibilidade (padrão governamental/educacional).

---

## 1. Stack Tecnológica e Infraestrutura (CTO Advisory)

A composição abaixo foi selecionada para garantir escalabilidade, segurança e baixa manutenção a longo prazo.

**Runtime:** Node.js 20+ LTS.
**Linguagem:** TypeScript (Tipagem estática ponta a ponta, do banco de dados ao frontend).
**Framework Core:** Next.js 15 (App Router). Escolha definitiva para renderização híbrida (SSR/SSG), garantindo SEO perfeito e carregamento instantâneo.
**Headless CMS:** Payload CMS v3. Integrado nativamente ao Next.js, elimina a necessidade de um servidor Node separado, gerenciando o banco de dados e provendo uma interface administrativa premium e customizável.
**Banco de Dados:** PostgreSQL (Relacional). Por sua relativa facilidade de manutenção e expansão
**ORM:** Drizzle ORM. Leve, seguro contra SQL Injection e com excelente performance.
**Armazenamento de Mídia (Storage):** AWS S3 ou Cloudflare R2. Como é um portal com foco histórico (muitas fotos e áudios), as mídias não devem ficar no mesmo servidor da aplicação.
**Estilização:** Tailwind CSS v4 + componentes acessíveis (ex: Radix UI ou shadcn/ui).
**Infraestrutura (VPS):** Ubuntu com servidor web Nginx e processos node gerenciados pelo PM2.

---

## 2. Modelagem de Dados (Payload CMS Collections)

A modelagem foi expandida para incluir campos essenciais de SEO (Slugs), controle de publicação e navegação relacional.

### 2.1. Entidades de Conteúdo Histórico

#### `People` (Personagens Históricos)
| Campo | Tipo | Descrição |
| :--- | :--- | :--- |
| **slug** | Text | URL amigável (ex: `/personagens/joao-silva`) - *Único e Indexado*. |
| **name** | Text | Nome completo. |
| **bio** | RichText | Biografia completa (com formatação rica). |
| **photo** | Media | Foto oficial. |
| **role** | Select | 'Aluno', 'Servidor', 'Comunidade', 'Diretor'. |
| **campus** | Relationship | Vínculo com unidades do IFC (ex: Concórdia, Rio do Sul, etc.). |
| **status** | Select | 'Rascunho', 'Publicado'. |

#### `Interviews` (Acervo de História Oral / Entrevistas)
| Campo | Tipo | Descrição |
| :--- | :--- | :--- |
| **slug** | Text | URL amigável. |
| **title** | Text | Título da entrevista. |
| **person** | Relationship | Vínculo 1:1 com a coleção `People`. |
| **type** | Select | 'Áudio' ou 'Vídeo'. |
| **videoUrl** | Text | Link externo (YouTube/Vimeo). |
| **audioFile** | Media | Upload direto do arquivo. |
| **transcription** | RichText | Transcrição acessível (essencial para a11y e SEO). |
| **featuredImage** | Media | Imagem de capa/thumbnail. |
| **dateRecorded** | Date | Data da realização da entrevista. |
| **status** | Select | 'Rascunho', 'Publicado'. |

#### `Gallery` (Acervo Fotográfico Digital)
| Campo | Tipo | Descrição |
| :--- | :--- | :--- |
| **title** | Text | Título ou descrição curta da imagem. |
| **image** | Media | Arquivo original (otimizado automaticamente via Next.js). |
| **year** | Number | Ano exato (opcional). |
| **decade** | Select | '1960', '1970', '1980', '1990', '2000', '2010', '2020'. |
| **campus** | Relationship | Local da fotografia. |
| **tags** | Relationship | 'Eventos', 'Infraestrutura', 'Ensino', 'Esportes'. |
| **credits** | Text | Créditos do fotógrafo ou doador. |

#### `News` (Notícias e Marcos do Jubileu)
| Campo | Tipo | Descrição |
| :--- | :--- | :--- |
| **slug** | Text | URL amigável. |
| **title** | Text | Título da matéria. |
| **excerpt** | Textarea | Resumo para cards e SEO meta-description. |
| **content** | RichText | Corpo da matéria completo. |
| **coverImage** | Media | Imagem de destaque. |
| **publishDate** | Date | Agendamento de postagem. |
| **status** | Select | 'Rascunho', 'Publicado'. |

---

### 2.2. Entidades Globais (Payload Globals)

#### `Site Settings` (Configurações Gerais)
| Campo | Tipo | Descrição |
| :--- | :--- | :--- |
| **seoTitle** | Text | Sufixo global do título (ex: "| IFC 60 Anos"). |
| **seoDescription** | Textarea | Meta description padrão para o site. |
| **socialLinks** | Array | Repetidor de links (Rede Social, URL). |

#### `Home Interface` (Gerenciamento da Página Inicial)
| Campo | Tipo | Descrição |
| :--- | :--- | :--- |
| **heroBanners** | Array | Repetidor (Imagem, Título, Subtítulo, CTA Link). |
| **highlightStats** | Array | Repetidor numérico (Label, Valor). Ex: "60 Anos". |
| **featuredHistory** | Relationship | Seleção manual de entrevistas/galerias em destaque. |

---

## 3. Requisitos Não Funcionais Críticos

Como se trata de uma instituição federal/pública de educação:

1. **Acessibilidade (a11y):** O frontend deve seguir rigorosamente as diretrizes WCAG 2.1 (Nível AA) e o padrão e-MAG (Modelo de Acessibilidade em Governo Eletrônico). Isso inclui navegação por teclado, contraste adequado e suporte a leitores de tela.
2. **Performance (Core Web Vitals):** Uso do `next/image` para WebP/AVIF, lazy loading de componentes pesados e Font Optimization.
3. **Segurança:** Proteção de rotas do admin, Content Security Policy (CSP) rigorosa e sanitização de dados via Payload CMS.

---

## 4. Cronograma de Execução Detalhado

O cronograma foi expandido de 4 para 5 Sprints (assumindo sprints de 2 semanas) para garantir estabilidade e testes.

**Sprint 1: Infraestrutura e Modelagem (Foundation)**
  * Setup do repositório (Git), ESLint, Prettier.
  * Configuração do Next.js 15 e integração do Payload CMS v3.
  * Provisionamento do Banco de Dados (PostgreSQL) e Storage (S3/R2).
  * Criação das Collections e Globals no Drizzle/Payload.

**Sprint 2: Painel Administrativo e API**
  * Refinamento dos campos e validações do Payload (campos obrigatórios, custom hooks de validação).
  * Criação das Roles de usuário (Admin, Editor, Revisor).
  * Testes das rotas REST/GraphQL geradas pelo Payload.

**Sprint 3: Frontend Web - Core & UI**
  * Configuração do Tailwind v4 e variáveis de design (Cores do IFC).
  * Desenvolvimento de Componentes Base (Botões, Cards, Header, Footer).
  * Implementação da Página Inicial (Home) e Roteamento global.

**Sprint 4: Frontend Web - Funcionalidades Específicas**
  * Páginas de Acervo Fotográfico com sistema de filtros (por década, campus).
  * Página de Personagens e player customizado para Entrevistas (Áudio/Vídeo).
  * Página de Notícias.
  * Auditoria inicial de Acessibilidade (Lighthouse / Axe).

**Sprint 5: Migração de Dados, QA e Lançamento**
  * Treinamento da equipe do IFC para uso do CMS.
  * Importação em massa/cadastro do conteúdo histórico.
  * Homologação (Testes de usabilidade e stress).
  * Deploy em Produção (Vercel/AWS) e monitoramento pós-lançamento.