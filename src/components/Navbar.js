import { Link } from "react-router-dom";

// styles
import "./Navbar.css";

//components
import Searchbar from "./Searchbar";

function Navbar() {
  return (
    <div className="navbar">
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
