"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ArticleReader.module.css";

interface ArticleReaderProps {
  title: string;
  author: string;
  about: string;
  content: string[];
}

export default function ArticleReader({
  title,
  author,
  about,
  content,
}: ArticleReaderProps) {
  const [progress, setProgress] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      setProgress((doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Reveal animation
    setTimeout(() => {
      headerRef.current?.classList.add(styles.visible);
      bodyRef.current?.classList.add(styles.visible);
    }, 120);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className={styles.progressBar} style={{ width: `${progress}%` }} />

      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          window.history.back();
        }}
        className={styles.btnVoltar}
        title="Voltar"
      >
        ←
      </a>

      <div className={styles.pageWrap}>
        <header className={styles.articleHeader} ref={headerRef}>
          <div className={styles.metaEyebrow}>
            <span>Texto de Memória</span>
          </div>
          <h1 className={styles.articleTitle}>{title}</h1>
          <div className={styles.byline}>
            <div className={styles.bylineItem}>
              <span className={styles.bylineLabel}>Autor(a)</span>
              <span className={styles.bylineValue}>{author}</span>
            </div>
            <div className={styles.bylineItem}>
              <span className={styles.bylineLabel}>Sobre</span>
              <span className={styles.bylineValue}>{about}</span>
            </div>
          </div>
        </header>

        <article className={styles.articleBody} ref={bodyRef}>
          {content.map((p, i) => {
            if (p.startsWith("|DESTAQUE|")) {
              return (
                <p key={i} className={styles.destaque}>
                  {p.replace("|DESTAQUE|", "")}
                </p>
              );
            }
            if (p === "|DIVIDER|") {
              return (
                <div key={i} className={styles.divider}>
                  ✦
                </div>
              );
            }
            return <p key={i}>{p}</p>;
          })}
        </article>
      </div>
    </>
  );
}
