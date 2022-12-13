//importing browserRouter, Routes (before Switch) and Route from react-router-dom v6
import { BrowserRouter, Routes, Route } from "react-router-dom"

// page components
import Navbar from "./components/Navbar"
import Create from "./pages/create/Create"
import Home from "./pages/home/Home"
import Recipe from "./pages/recipe/Recipe"

// styles
import "./App.css"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/create" element={<Create />} />
          <Route exact path="/recipes/:id" element={<Recipe />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
