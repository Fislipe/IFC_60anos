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

## 3. Organização de Pastas (Feature-Based Architecture)

Para garantir que o projeto seja fácil de manter e escalar, utilizaremos uma organização baseada em **funcionalidades (features)** tanto no frontend quanto no backend.

```text
/src
  ├── /app                  # Camada de Roteamento (Next.js App Router)
  │   ├── (frontend)        # Agrupamento lógico das páginas do site
  │   │   ├── /galeria      # Funcionalidade de Acervo de Fotos
  │   │   ├── /entrevistas  # Funcionalidade de História Oral
  │   │   ├── /noticias     # Funcionalidade de Blog/Notícias
  │   │   └── /personagens  # Páginas de bios dos personagens
  │   └── (payload)         # Agrupamento da área administrativa
  │       └── /admin        # Endpoint do Payload CMS
  │
  ├── /collections          # Definições do Backend (Payload CMS)
  │   ├── /People           # Configuração de campos e hooks de Personagens
  │   ├── /Interviews       # Configuração de Entrevistas
  │   ├── /Gallery          # Configuração do Acervo Fotográfico
  │   └── /News             # Configuração de Notícias
  │
  ├── /components           # Biblioteca de Componentes UI
  │   ├── /common           # Botões, Inputs, Modal (Acessíveis)
  │   ├── /layout           # Header, Footer, Sidebar
  │   └── /features         # Componentes vinculados a funcionalidades
  │       ├── /gallery      # Grid de fotos, filtros por década
  │       ├── /interviews   # Players de áudio/vídeo customizados
  │       └── /news         # Cards de notícias, paginação
  │
  ├── /lib                  # Utilitários e Integrações
  │   ├── /api              # Helpers para fetch de dados do Payload
  │   ├── /utils            # Funções helpers genéricas
  │   └── /payload          # Inicialização e Configuração do Payload
  │
  ├── /styles               # CSS Global e Design System (Tailwind v4)
  └── /types                # Definições de tipos TypeScript globais
```

---

## 4. Requisitos Não Funcionais Críticos

Como se trata de uma instituição federal/pública de educação:

1. **Acessibilidade (a11y):** O frontend deve seguir rigorosamente as diretrizes WCAG 2.1 (Nível AA) e o padrão e-MAG (Modelo de Acessibilidade em Governo Eletrônico). Isso inclui navegação por teclado, contraste adequado e suporte a leitores de tela.
2. **Performance (Core Web Vitals):** Uso do `next/image` para WebP/AVIF, lazy loading de componentes pesados e Font Optimization.
3. **Segurança:** Proteção de rotas do admin, Content Security Policy (CSP) rigorosa e sanitização de dados via Payload CMS.

---

## 6. Plano de Reuso de Ativos (Legacy Assets)

Para otimizar o cronograma, o projeto atual (`/site`) será tratado como a nossa **Fonte de Dados Legada (Legacy Data Source)**.

- **Mídias (`/site/imagens`):** Migração direta de arquivos JPEG/PNG para o novo Storage.
- **Metadados (`/site/dados/galeria.json`):** Base para o script de semente (*seeding*) do banco de dados (anos, décadas, tags).
- **Conteúdo Textual:** Transcrições de entrevistas e textos de memória serão convertidos em blocos de *RichText* no CMS.
- **Identidade Visual:** Reaproveitamento das escalas de cores (hex) e tipografia (fuentes) no Tailwind v4.

---

## 7. Cronograma de Execução Detalhado (8 Semanas / 2 Meses)

O cronograma foi otimizado para **4 Sprints de 2 semanas**, focando em entregas funcionais e testes simultâneos.

**Sprint 1: Infraestrutura e Backend (Foundation & CMS)**
  * **Objetivo:** Estabelecer o coração do sistema e o painel admin.
  * Setup do repositório, Next.js 15 e integração do Payload CMS v3.
  * Provisionamento do PostgreSQL e Storage S3/R2 para mídias.
  * Criação das Collections Relacionais (People, Interviews, Gallery, News).
  * **Migração Inicial:** Upload dos logotipos e ícones do site legado.

**Sprint 2: UI Design System e Frontend Core**
  * **Objetivo:** Definir a identidade visual e a estrutura da home.
  * Configuração do Tailwind v4 herdando a paleta de cores do site legado.
  * Desenvolvimento dos componentes base (Botões, Cards, Header/Footer acessíveis).
  * Implementação da Página Inicial (Home) consumindo Banners e Stats dinâmicos.

**Sprint 3: Funcionalidades de Acervo e Conteúdo Dinâmico**
  * **Objetivo:** Desenvolver as páginas específicas de conteúdo histórico.
  * Galeria com filtros por década/tags (baseado na estrutura do `galeria.json`).
  * Página de Personagens e Custom Player para Entrevistas (Áudio/Vídeo).
  * Seção de Notícias e Marcos do Jubileu.

**Sprint 4: Migração, QA e Lançamento Final**
  * **Objetivo:** Garantir a entrada do conteúdo e a subida para produção.
  * **Migração de Dados:** Importação automatizada/manual das mídias e textos do site legado para o CMS.
  * Treinamento da equipe do campus para uso do painel administrativo.
  * Homologação final, auditoria de acessibilidade e Deploy em Produção (VPS).

---

## 8. Evolução e Pós-Entrega (Future Roadmap)

Após a entrega final e o lançamento oficial, os seguintes itens de melhoria foram identificados para futuras iterações:

1. **Dockerização da Aplicação:** 
   - Criação de `Dockerfile` e `docker-compose.yml`.
   - **Objetivo:** Facilitar o aprendizado, a portabilidade e o deploy rápido em qualquer plataforma com apenas um comando (`docker-compose up`).
2. **Monitoramento e Otimização:** 
   - Implementação de monitoramento de performance e análise de logs em produção.