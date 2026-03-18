"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import styles from "./NavCards.module.css";

const CARDS = [
  {
    href: "/galeria",
    icon: "◈",
    num: "01",
    title: "Galeria",
    desc: "Acervo histórico digitalizado com imagens de todas as décadas do campus.",
  },
  {
    href: "/entrevistas",
    icon: "◎",
    num: "02",
    title: "Vozes do Campus",
    desc: "Histórias e depoimentos de quem viveu a evolução do IFC em primeira pessoa.",
  },
  {
    href: "/memorias",
    icon: "◉",
    num: "03",
    title: "Memórias",
    desc: "Relatos escritos que preservam a identidade e o espírito da instituição.",
  },
];

export default function NavCards() {
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
    <>
      <div className={styles.sectionHeader}>
        <span className="eyebrow">Explore o portal</span>
        <h2>Navegue pela História</h2>
      </div>
      <section className={styles.grid} ref={gridRef}>
        {CARDS.map((card) => (
          <Link key={card.num} href={card.href} className={styles.card}>
            <span className={styles.icon}>{card.icon}</span>
            <span className={styles.num}>{card.num}</span>
            <h3 className={styles.title}>{card.title}</h3>
            <p className={styles.desc}>{card.desc}</p>
            <span className={styles.arrow}>→</span>
          </Link>
        ))}
      </section>
    </>
  );
}
