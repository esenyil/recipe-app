// importing hooks
import { useState, useRef } from "react";

//importing useNavigate (before useHistory) from react-router-dom v6
import { useNavigate } from "react-router-dom";
import { projectFirestore } from "../../firebase/config";

//styles
import "./Create.css";

function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const ingredientinput = useRef(null);
  const navigate = useNavigate();

  // asynchronous submit function 
  const handleSubmit = async (e) => {
    e.preventDefault()
    const doc = {
      title,
      ingredients,
      method,
      cookingTime: cookingTime + " minutes",
    }

    try {
      await projectFirestore.collection("Recipes").add(doc);
      navigate('/') //before useHistory.push('/')
    } catch(err) {
      console.log(err)
    }
  }

  const handleAdd = (e) => {
    e.preventDefault()
    // removes whitespace
    const ing = newIngredient.trim()
    //checking for no duplicate values. No repeat
    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIngredients) => [...prevIngredients, ing])
    }
    // Resets state and focuses on input field
    setNewIngredient("")
    ingredientinput.current.focus();
  }

  return (
    <div className="create">
      <h2 className="page-title">Add a new recipe</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Recipe ingredients:</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientinput}
            />
            <button onClick={handleAdd} className="btn">
              add
            </button>
          </div>
        </label>
        <p>
          Current ingredients:{" "}
          {ingredients.map((i) => (
            <em key={i}>{i}, </em>
          ))}
        </p>

        <label>
          <span>Recipe method:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>

        <label>
          <span>Cooking time in (minutes):</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>

        <button className="btn">submit</button>
      </form>
    </div>
  );
}
export default Create;
