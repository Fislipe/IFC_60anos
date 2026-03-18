"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./EntrevistasList.module.css";

interface Entrevista {
  num: string;
  title: string;
  desc: string;
  transcricaoHref?: string;
  image?: string;
  videoUrl?: string;
  hasAudio?: boolean;
  invert?: boolean;
}

const ENTREVISTAS: Entrevista[] = [
  {
    num: "01",
    title: "Memórias do Início",
    desc: "Entrevista com os primeiros servidores da Escola Agrotécnica, relatando os desafios da década de 60.",
    transcricaoHref: "#",
    image: "/imagens/inauguraçãoCampo.jpg",
    hasAudio: true,
    invert: false,
  },
  {
    num: "02",
    title: "Evolução e Tecnologia",
    desc: "Depoimentos sobre a transição para o Instituto Federal e a modernização dos laboratórios e campos experimentais.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    invert: true,
  },
];

export default function EntrevistasList() {
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
    <section className={styles.list} ref={sectionRef}>
      {ENTREVISTAS.map((e) => (
        <div
          key={e.num}
          className={`${styles.item} ${e.invert ? styles.invert : ""}`}
        >
          <div className={styles.text}>
            <span className={styles.num}>{e.num}</span>
            <h2 className={styles.title}>{e.title}</h2>
            <p className={styles.desc}>{e.desc}</p>
            {e.transcricaoHref && (
              <a href={e.transcricaoHref} className={styles.btnTranscricao}>
                Ler Transcrição →
              </a>
            )}
          </div>
          <div className={styles.media}>
            {e.image && (
              <div className={styles.mediaImg}>
                <Image
                  src={e.image}
                  alt={e.title}
                  width={800}
                  height={450}
                  sizes="(max-width: 900px) 100vw, 50vw"
                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                />
              </div>
            )}
            {e.videoUrl && (
              <div className={styles.mediaImg}>
                <iframe
                  src={e.videoUrl}
                  allowFullScreen
                  title={e.title}
                  style={{
                    width: "100%",
                    aspectRatio: "16/9",
                    border: "none",
                  }}
                />
              </div>
            )}
            {e.hasAudio && (
              <audio controls className={styles.audioPlayer}>
                <source src="#" type="audio/mpeg" />
              </audio>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
