
import Navbar from "../../components/Navbar";
import HomeHero from "./components/HomeHero";
import Features from "./components/Features";
import Footer from "../../components/Footer";
import Background from "../../components/Background";


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