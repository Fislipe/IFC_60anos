"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import styles from "./MemoriasGrid.module.css";

const MEMORIAS = [
  {
    slug: "texto-1",
    cat: "Cotidiano",
    title: "O despertar da EAgro nos anos 80",
    author: "João Silva",
    about: "Vivências estudantis",
  },
  {
    slug: "texto-2",
    cat: "Legado",
    title: "Dos Mestres Agrícolas ao IFC",
    author: "Maria Oliveira",
    about: "Evolução institucional",
  },
  {
    slug: "texto-3",
    cat: "Trabalho",
    title: "A Ciência no Campo: 60 anos",
    author: "Prof. Carlos",
    about: "Desenvolvimento técnico",
  },
];

export default function MemoriasGrid() {
  const gridRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add(styles.visible);
        });
      },
      { threshold: 0.12 }
    );
    grid.querySelectorAll(`.${styles.card}`).forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className={styles.grid} ref={gridRef}>
      {MEMORIAS.map((m) => (
        <Link key={m.slug} href={`/memorias/${m.slug}`} className={styles.card}>
          <span className={styles.cat}>{m.cat}</span>
          <h2 className={styles.title}>{m.title}</h2>
          <div className={styles.divider} />
          <div className={styles.meta}>
            Por: {m.author}
            <br />
            Sobre: {m.about}
          </div>
          <span className={styles.arrow}>Ler Memória →</span>
        </Link>
      ))}
    </section>
  );
}
