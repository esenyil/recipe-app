import { useState, useRef } from "react"
import closeIcon from "../assets/close.svg"
import { db } from "../firebase/config"
import { useParams } from "react-router-dom"

//styles
import "./Modal.css"

function Modal({ open, children, onClose, data }) {
  const [title, setTitle] = useState(data.title)
  const [method, setMethod] = useState(data.method)
  const [cookingTime, setCookingTime] = useState(data.cookingTime)
  const [newIngredient, setNewIngredient] = useState("")
  const [ingredients, setIngredients] = useState([])
  const ingredientinput = useRef(null)

  const { id } = useParams()

  // we need the default text to be the previous data

  const handleSubmit = async (e) => {
    e.preventDefault()

    // explaning this
    try {
      const updatedRecipe = db.collection("Recipes").doc(id)
      updatedRecipe.set({
        title: title,
        ingredients: ingredients,
        method: method,
        cookingTime: cookingTime + " minutes",
      })

      await db
        .collection("Recipes")
        .doc(id)
        .update({
          title: title,
          ingredients: ingredients,
          method: method,
          cookingTime: cookingTime + " minutes",
        })
      onClose()
      //we need to reset form
    } catch (err) {
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
    ingredientinput.current.focus()
  }

  // if open (prop state) is false then return null, so basically hiding modal
  if (!open) return null

  //hjælp med value={data.title}
  return (
    <>
      <div className="overlay" />
      <div className="modal">
        <div className="modal-header">
          <img
            src={closeIcon}
            className="close"
            onClick={onClose}
            alt="icon for closing modal"
          />
          <h2 className="modal-title">Update recipe</h2>
        </div>

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
              value={parseInt(cookingTime)}
              required
            />
          </label>

          <button className="btn">update</button>
        </form>
      </div>
      {children}
    </>
  )
}
export default Modal
