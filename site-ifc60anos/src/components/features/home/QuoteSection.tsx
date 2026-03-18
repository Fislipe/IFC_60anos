import ScrollReveal from "@/components/common/ScrollReveal";
import styles from "./QuoteSection.module.css";

export default function QuoteSection() {
  return (
    <section className={styles.section}>
      <ScrollReveal className={styles.inner}>
        <span className={styles.mark}>&ldquo;</span>
        <p className={styles.text}>
          Uma instituição não se mede apenas pelos seus anos, mas pelas vidas que
          transformou ao longo do caminho.
        </p>
        <span className={styles.source}>IFC Campus Concórdia · 60 Anos</span>
      </ScrollReveal>
    </section>
  );
}
