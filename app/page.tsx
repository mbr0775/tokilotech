// app/page.tsx
import HomeScreen from "./homescreen/homescreen";
import About from "./about/about";
import Navigation from "./navigation/navigations";
import Stakeholders from "./stackholder/stackholder";
import Services from "./services/services";
import Contact from "./contact/contact";



export default function Page() {
  return (
    <>
      <Navigation />
      <HomeScreen />
      <About />
      <Stakeholders />
      <Services />
      <Contact />
    </>
  );
}