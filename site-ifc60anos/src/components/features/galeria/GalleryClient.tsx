"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./GalleryClient.module.css";

interface GalleryImage {
  src: string;
  year: number;
  desc: string;
  tags: string[];
}

const IMAGES: GalleryImage[] = [
  {
    src: "/imagens/EAgrotecnica.jpg",
    year: 1999,
    desc: "Várias pessoas e uma bandeirona do Brasil",
    tags: ["Alunos", "Eventos"],
  },
  {
    src: "/imagens/depenandoGalinha1969 (1).jpg",
    year: 1979,
    desc: "Crianças depenando galinhas",
    tags: ["Alunos"],
  },
  {
    src: "/imagens/refeitório.jpg",
    year: 1969,
    desc: "Refeitório do IFC",
    tags: ["Infraestrutura"],
  },
  {
    src: "/imagens/inauguraçãoCampo.jpg",
    year: 1969,
    desc: "Inauguração do Campo do IFC Concórdia",
    tags: ["Infraestrutura", "Eventos"],
  },
  {
    src: "/imagens/formaturaPrimeiraTurma (1).jpg",
    year: 1969,
    desc: "Primeira turma a se formar no IFC Concórdia",
    tags: ["Alunos", "Eventos"],
  },
];

const TAGS = ["Desfiles", "Infraestrutura", "Alunos", "Eventos"];

export default function GalleryClient() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = IMAGES.filter((img) => {
    if (!activeTag) return true;
    return img.tags.includes(activeTag);
  }).sort((a, b) => a.year - b.year);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add(styles.visible);
        });
      },
      { threshold: 0.08 }
    );

    container
      .querySelectorAll(`.${styles.item}`)
      .forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [filtered]);

  return (
    <>
      <div className={styles.filters}>
        <span className={styles.filtersLabel}>Filtrar por:</span>
        <div className={styles.tagsArea}>
          {TAGS.map((tag) => (
            <button
              key={tag}
              className={`${styles.tag} ${activeTag === tag ? styles.ativo : ""}`}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.wrapper}>
        <div className={styles.container} ref={containerRef}>
          {filtered.map((img, i) => (
            <div key={`${img.src}-${i}`} className={styles.item}>
              <Image
                src={img.src}
                alt={img.desc}
                width={600}
                height={400}
                sizes="(max-width: 520px) 100vw, (max-width: 900px) 50vw, 33vw"
                style={{ width: "100%", height: "auto" }}
              />
              <div className={styles.overlay}>
                <span className={styles.fotoTag}>
                  {img.year} — {img.tags.join(" · ")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
