"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import styles from "./HeroCarousel.module.css";

const SLIDES = [
  {
    src: "/imagens/depenandoGalinha1969 (1).jpg",
    alt: "Alunos do IFC em 1969",
  },
  {
    src: "/imagens/formaturaPrimeiraTurma (1).jpg",
    alt: "Formatura da primeira turma",
  },
  { src: "/imagens/EAgrotecnica.jpg", alt: "Escola Agrotécnica Federal" },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((n: number) => {
    setCurrent((n + SLIDES.length) % SLIDES.length);
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className={styles.hero}>
      <div className={styles.slides}>
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className={`${styles.slide} ${i === current ? styles.active : ""}`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="100vw"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      <div className={styles.content}>
        <div className={styles.eyebrow}>
          <span>1964 — 2024 · Campus Concórdia</span>
        </div>
        <h1>
          Legado
          <br />
          <em>em Evolução</em>
        </h1>
        <p className={styles.desc}>
          Sessenta anos formando profissionais, transformando o Oeste Catarinense
          e construindo um futuro com raízes firmes.
        </p>
        <a href="/historia" className={styles.cta}>
          Explorar a história
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>

      <div className={styles.indicators}>
        {SLIDES.map((_, i) => (
          <div
            key={i}
            className={`${styles.dot} ${i === current ? styles.activeDot : ""}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      <button className={styles.arrowRight} onClick={() => goTo(current + 1)}>
        →
      </button>
    </section>
  );
}
