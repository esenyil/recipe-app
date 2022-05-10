import { Link } from "react-router-dom";
import { useTheme } from '../hooks/useTheme'

// styles
import "./Navbar.css";

//components
import Searchbar from "./Searchbar";

function Navbar() {
  const { color, changeColor } = useTheme()

  return (
    <div className="navbar" style={{background: color}}>
      <nav>
        <Link to="/" className="brand">
        <h1>Recipe App</h1>
        </Link>
        <Searchbar />
        <Link to="/create">Create recipe</Link>
      </nav>
    </div>
  );
}
export default Navbar;
