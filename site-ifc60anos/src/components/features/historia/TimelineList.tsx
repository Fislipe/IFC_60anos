"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./TimelineList.module.css";

const TIMELINE_DATA = [
  {
    year: "1961",
    title: "Visita de Jânio Quadros",
    text: "Durante visita de Jânio Quadros a Concórdia, o senador Attilio Fontana sugere a criação de uma escola agrícola na região, plantando a semente do que viria a ser o campus.",
    image: "/imagens/depenandoGalinha1969 (1).jpg",
    caption: "Semente do Conhecimento",
    invert: false,
  },
  {
    year: "1965",
    title: "Fundação do Campus",
    text: "A fundação oficial sob influência do empresário Attilio Fontana, marcando o início das atividades educacionais voltadas ao setor agrícola no oeste catarinense.",
    image: "/imagens/formaturaPrimeiraTurma (1).jpg",
    caption: "Primeiros Passos",
    invert: true,
  },
  {
    year: "1968",
    title: "Primeira Formatura",
    text: "Formatura da 1ª turma do Ginásio Agrícola. Na época, os alunos se formavam como mestres agrícolas, prontos para transformar a agricultura regional.",
    image: "/imagens/refeitório.jpg",
    caption: "Mestres Agrícolas",
    invert: false,
  },
  {
    year: "1972",
    title: "Colégio Agrícola",
    text: "Elevação de categoria para Colégio Agrícola através do Decreto nº 70.513, ampliando a oferta educacional e a importância da instituição.",
    image: "/imagens/inauguraçãoCampo.jpg",
    caption: "Expansão e Reconhecimento",
    invert: true,
  },
  {
    year: "1979",
    title: "Escola Agrotécnica Federal",
    text: "A instituição passa a denominar-se Escola Agrotécnica Federal, consolidando seu papel como referência nacional em ensino técnico agrícola.",
    image: "/imagens/EAgrotecnica.jpg",
    caption: "Referência Federal",
    invert: false,
  },
  {
    year: "2008",
    title: "O Surgimento do IFC",
    text: "Criação dos Institutos Federais. A unidade passa a integrar o Instituto Federal Catarinense, unindo tradição histórica a um novo modelo de educação superior e técnica.",
    image: "/imagens/logoprojeto.png",
    caption: "Uma Nova Era",
    invert: true,
    containImage: true,
  },
];

export default function TimelineList() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add(styles.visible);
        });
      },
      { threshold: 0.1 }
    );

    section
      .querySelectorAll(`.${styles.item}`)
      .forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      {TIMELINE_DATA.map((item, i) => (
        <div
          key={i}
          className={`${styles.item} ${item.invert ? styles.invert : ""}`}
        >
          <div className={styles.text}>
            <span className={styles.year}>{item.year}</span>
            <h2>{item.title}</h2>
            <p>{item.text}</p>
          </div>
          <div className={styles.spine}>
            <div className={styles.dot} />
          </div>
          <div className={styles.img}>
            <div
              className={styles.imgInner}
              style={item.containImage ? { background: "var(--color-green)" } : undefined}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{
                  objectFit: item.containImage ? "contain" : "cover",
                  padding: item.containImage ? "2rem" : undefined,
                }}
              />
              <span className={styles.caption}>{item.caption}</span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
