
import Navbar from "./Navbar";
import HomeHero from "./HomeHero";
import Features from "./Features";
import Footer from "./Footer";
import Background from "./Background";


const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Générateur', href: '/generateur' },
  { name: 'Informations', href: '/information' },
]



export default function Home() {
  return (
    <div className="relative bg-gray-50 overflow-hidden">
      <Background />
      <div className="relative pt-6 pb-16 sm:pb-24">
        <Navbar navigation = { navigation }/>
        <HomeHero />
        <Features />
        <Footer />
      </div>
    </div>
  );
}