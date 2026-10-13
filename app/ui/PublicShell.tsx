import type { ReactNode } from "react";
import Navigation from "../navigation/navigations";
import Footer from "../footer";
import ScrollExperience from "../motion/ScrollExperience";
import SiteVideo from "../motion/SiteVideo";
import styles from "../design.module.css";
import CommunicationProvider from "../communications/CommunicationProvider";

export default function PublicShell({ children }: { children: ReactNode }) {
  return (
    <CommunicationProvider>
      <ScrollExperience className={styles.site}>
        <SiteVideo>
          <a href="#main-content" className={styles.skipLink}>
            Skip to content
          </a>
          <Navigation />
          <main id="main-content">{children}</main>
          <Footer />
        </SiteVideo>
      </ScrollExperience>
    </CommunicationProvider>
  );
}
