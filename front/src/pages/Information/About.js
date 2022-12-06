import Navbar from '../../components/Navbar/Navbar';
import Articles from './components/Articles';
import Footer from '../../components/Footer';
import Background from '../../components/Background';

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Générateur', href: '/generateur' },
  { name: 'Informations', href: '/about' },
]

function About() {
  return (
    <>
    <div className="relative bg-gray-50 overflow-hidden">
      <Background />
      <div className="relative pt-6 pb-16 sm:pb-24">
        <Navbar navigation={ navigation } />
        <Articles />
        <Footer />
      </div>
    </div>

    </>    
  );
}

export default About;
