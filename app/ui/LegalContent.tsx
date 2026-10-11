import styles from "./editorial.module.css";
export default function LegalContent({
  sections,
  privacy = false,
}: {
  sections: { title: string; content: string }[];
  privacy?: boolean;
}) {
  return (
    <div className={styles.legal}>
      <nav className={styles.legalIndex} aria-label="On this page">
        {sections.map((section, index) => (
          <a key={section.title} href={`#policy-${index}`}>
            {String(index + 1).padStart(2, "0")} / {section.title}
          </a>
        ))}
      </nav>
      <div className={styles.legalBody}>
        {privacy && (
          <p className={styles.revision}>Last updated: September 2026</p>
        )}
        {sections.map((section, index) => (
          <article key={section.title} id={`policy-${index}`}>
            <h2>{section.title}</h2>
            <p>{section.content}</p>
          </article>
        ))}
        <article>
          <h2>Contact Tokilo Technologies</h2>
          <p>
            {privacy
              ? "If you have questions about this Privacy Policy, please contact us."
              : "For questions regarding these Terms and Conditions, contact us through:"}
          </p>
          <p>
            <a href="mailto:mubassirnasar@gmail.com">mubassirnasar@gmail.com</a>
            <br />
            <a href="https://www.tokilotech.com">www.tokilotech.com</a>
          </p>
        </article>
      </div>
    </div>
  );
}
