
import Home from "./Home";
import About from "./About";
import NotFound from "./NotFound";
import Dashboard from "./Generateur";
import Connexion from "./Connexion";
import {Routes, Route} from "react-router-dom";
function App() {
    return(
        <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/information" element={ <About /> } />
            <Route path="/generateur" element={ <Dashboard /> } />
            <Route path="/connexion" element={ <Connexion /> } />
            <Route path="*" element={ <NotFound /> } />
        </Routes>
    )
}

export default App;
