import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>
        <Image
          src="/imagens/logoprojeto.png"
          alt="Logo IFC 60 Anos"
          width={44}
          height={44}
        />
        <p>IFC Campus Concórdia — 60 Anos de História</p>
      </div>

      <ul className={styles.links}>
        <li>
          <Link href="/entrevistas">Vozes</Link>
        </li>
        <li>
          <Link href="/galeria">Galeria</Link>
        </li>
        <li>
          <Link href="/memorias">Memórias</Link>
        </li>
        <li>
          <Link href="/historia">História</Link>
        </li>
      </ul>

      <a
        href="https://concordia.ifc.edu.br/"
        className={styles.ifcLogo}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/imagens/logo-if.png"
          alt="Logo IFC"
          width={38}
          height={38}
        />
      </a>
    </footer>
  );
}
