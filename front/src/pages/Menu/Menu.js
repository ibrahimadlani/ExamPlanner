
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";
import Background from "../../components/Background";
import Grid from "./components/Grid";


const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Générateur', href: '/generateur' },
  { name: 'Informations', href: '/information' },
]



export default function Menu() {
  return (
    <div className="relative bg-gray-50 overflow-hidden">
      <Background className="h-100"/>
      <div className="relative pt-6 pb-16 sm:pb-24">
        <Navbar navigation = { navigation }/>
        <Grid />
        <Footer />
      </div>
    </div>
  );
}