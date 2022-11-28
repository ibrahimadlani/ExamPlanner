import Navbar from './Navbar';
import Articles from './Articles';
import Footer from './Footer';
import Background from './Background';

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
