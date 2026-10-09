// app/page.tsx
import HomeScreen from "./homescreen/homescreen";
import About from "./about/about";
import Navigation from "./navigation/navigations";
import Stakeholders from "./stackholder/stackholder";
import Services from "./services/services";
import Projects from "./projects/projects";
import Contact from "./contact/contact";
import Footer from "./footer";
import ScrollExperience from "./motion/ScrollExperience";
import styles from "./design.module.css";

export default function Page() {
  return (
    <ScrollExperience className={styles.site}>
      <Navigation />
      <main>
        <HomeScreen />
        <About />
        <Projects />
        <Services />
        <Stakeholders />
        <Contact />
      </main>
      <Footer />
    </ScrollExperience>
  );
}
