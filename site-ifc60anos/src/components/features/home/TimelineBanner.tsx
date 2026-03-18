import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/common/ScrollReveal";
import styles from "./TimelineBanner.module.css";

export default function TimelineBanner() {
  return (
    <section className={styles.banner}>
      <Image
        src="/imagens/EAgrotecnica.jpg"
        alt="Escola Agrotécnica"
        fill
        sizes="100vw"
      />
      <ScrollReveal className={styles.inner}>
        <span className="eyebrow">Nossa trajetória</span>
        <h2>
          Linha do
          <br />
          <em>Tempo</em>
        </h2>
        <Link href="/historia" className={styles.btn}>
          Abrir Linha do Tempo
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </ScrollReveal>
    </section>
  );
}
