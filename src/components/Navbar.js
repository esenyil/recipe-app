// importing Link from react-router-dom and it lets the user navigate to another page by clicking
import { Link } from "react-router-dom"
import foodIcon from "../assets/food.svg"

// styles
import "./Navbar.css"

function Navbar() {
  return (
    <div className="navbar">
      <nav>
        <Link to="/" className="brand">
          <img src={foodIcon} alt="logo" />
          <h1>Recipe App</h1>
        </Link>
        
        <Link to="/create">Create recipe</Link>
      </nav>
    </div>
  )
}
export default Navbar;