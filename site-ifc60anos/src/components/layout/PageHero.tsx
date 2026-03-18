import Image from "next/image";
import styles from "./PageHero.module.css";

interface PageHeroProps {
  bgImage: string;
  eyebrow: string;
  title: string;
  titleEm: string;
}

export default function PageHero({
  bgImage,
  eyebrow,
  title,
  titleEm,
}: PageHeroProps) {
  return (
    <section className={styles.hero}>
      <Image
        className={styles.bg}
        src={bgImage}
        alt=""
        fill
        sizes="100vw"
        priority
      />
      <div className={styles.content}>
        <span className="eyebrow">{eyebrow}</span>
        <h1>
          {title}
          <br />
          <em>{titleEm}</em>
        </h1>
      </div>
    </section>
  );
}
