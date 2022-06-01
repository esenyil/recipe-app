import { useState } from "react"
import closeIcon from "../assets/close.svg"
import { db } from "../firebase/config"
import { useParams } from "react-router-dom"

//styles
import "./Modal.css"

function Modal({ open, onClose, data }) {
  const [title, setTitle] = useState(data.title)
  const [method, setMethod] = useState(data.method)
  const [cookingTime, setCookingTime] = useState(data.cookingTime)
  const [ingredients, setIngredients] = useState(data.ingredients.join(", "))

  const { id } = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // set() - to create/get a single document
      db.collection("Recipes").doc(id).set({
        title: title,
        ingredients: ingredients.split(","),
        method: method,
        cookingTime: cookingTime + " minutes",
      })

      await db
        .collection("Recipes")
        .doc(id)
        .update({
          title: title,
          ingredients: ingredients.split(","),
          method: method,
          cookingTime: cookingTime,
        })
      onClose()
    } catch (err) {
      console.log(err)
    }
  }

  // if open (prop state) is false then return null, so basically hiding modal
  if (!open) return null

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
              <textarea
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                cols="30"
                rows="5"
                required
              />
            </div>
          </label>

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
    </>
  )
}
export default Modal;
