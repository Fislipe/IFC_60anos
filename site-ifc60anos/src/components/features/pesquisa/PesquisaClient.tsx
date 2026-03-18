"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./PesquisaClient.module.css";

export default function PesquisaClient() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      contentRef.current?.classList.add(styles.visible);
    }, 100);
  }, []);

  return (
    <div className={styles.page}>
      <span className={styles.bgNum}>60</span>
      <div className={styles.content} ref={contentRef}>
        <span className={styles.badge}>Em desenvolvimento</span>
        <h1 className={styles.title}>
          Sistema de
          <br />
          <em>Busca</em>
        </h1>
        <p className={styles.desc}>
          Estamos centralizando o acervo digital de 60 anos para buscas
          inteligentes. Em breve você poderá pesquisar por nomes, datas e eventos
          específicos.
        </p>
        <Link href="/" className={styles.btnBack}>
          ← Voltar ao Início
        </Link>
      </div>
    </div>
  );
}
