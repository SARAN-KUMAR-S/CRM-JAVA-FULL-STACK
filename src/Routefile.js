import {BrowserRouter,Route,Routes,Router,Link} from 'react-router-dom'
import {Home} from'./Home';
import {About} from'./About';
export function Routefile()
{
    return (
    <BrowserRouter>
    <nav>
        <Link to="/home">Home</Link>{" | "}
        <Link to="/about">About</Link>
    </nav>
    <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
    </Routes>
    </BrowserRouter>);
}
