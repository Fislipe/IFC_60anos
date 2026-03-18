"use client";

import { useEffect, useRef } from "react";
import styles from "./StatsBar.module.css";

const STATS = [
  { target: 5000, label: "Alunos Formados" },
  { target: 60, label: "Anos de História" },
  { target: 200, label: "Servidores" },
  { target: 15, label: "Cursos Ativos" },
];

function animateCounter(el: HTMLElement, target: number) {
  const duration = 1800;
  const start = performance.now();

  function tick(now: number) {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target).toLocaleString("pt-BR");
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target.toLocaleString("pt-BR");
  }

  requestAnimationFrame(tick);
}

export default function StatsBar() {
  const statsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = statsRef.current;
    if (!section) return;

    const statEls = section.querySelectorAll<HTMLElement>("[data-stat]");
    const counterEls = section.querySelectorAll<HTMLElement>("[data-target]");

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add(styles.visible);
        });
      },
      { threshold: 0.3 }
    );

    statEls.forEach((el) => obs.observe(el));

    const counterObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          animateCounter(el, +(el.dataset.target || 0));
          counterObs.unobserve(el);
        });
      },
      { threshold: 0.3 }
    );

    counterEls.forEach((el) => counterObs.observe(el));

    return () => {
      obs.disconnect();
      counterObs.disconnect();
    };
  }, []);

  return (
    <section className={styles.stats} ref={statsRef}>
      {STATS.map((stat, i) => (
        <div key={i} className={styles.stat} data-stat>
          <span className={styles.num} data-target={stat.target}>
            0
          </span>
          <span className={styles.label}>{stat.label}</span>
        </div>
      ))}
    </section>
  );
}
