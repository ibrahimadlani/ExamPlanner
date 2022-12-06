
import Home from "./pages/Accueil/Home";
import About from "./pages/Information/About";
import NotFound from "./pages/NotFound/NotFound";
import Dashboard from "./pages/Generateur/Generateur";
import Connexion from "./pages/Connexion/Connexion";
import Menu from "./pages/Menu/Menu";
import {Routes, Route} from "react-router-dom";
function App() {
    return(
        <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/information" element={ <About /> } />
            <Route path="/generateur" element={ <Menu /> } />
            <Route path="/planning/:idPlanning" element={ <Dashboard /> } />
            <Route path="/connexion" element={ <Connexion /> } />
            <Route path="*" element={ <NotFound /> } />
        </Routes>
    )
}

export default App;
