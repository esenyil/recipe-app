import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useTheme } from "../../hooks/useTheme"
import { projectFirestore } from "../../firebase/config"
import updateIcon from "../../assets/update.svg"

//components
import Modal from "../../components/Modal"

//styles
import "./Recipe.css"

function Recipe() {
  const { id } = useParams()
  const { mode } = useTheme()

  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  //useEffect is fired after the page is rendered
  useEffect(() => {
    setIsPending(true)
    //fetching data
    const unsub = projectFirestore
      .collection("Recipes")
      .doc(id)
      .onSnapshot((doc) => {
        //outputting data
        if (doc.exists) {
          setIsPending(false)
          setData(doc.data())
        } else {
          // outputting error if no recipe
          setIsPending(false)
          setError("Could not find that recipe")
        }
      })

    // cleanup function
    return () => unsub()
  }, [id])

  return (
    <div className={`recipe ${mode}`}>
      {/* conditional rendering using logical and */}
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && (
        <>
          <h2 className="page-title">{data.title}</h2>
          <p>Takes {data.cookingTime} to cook.</p>
          <ul>
            {/* using map */}
            {data.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p className="method">{data.method}</p>
          <img
            src={updateIcon}
            className="update"
            onClick={() => setIsOpen(true)}
            alt="icon for updating recipe"
          />
        </>
      )}
      <Modal open={isOpen} data={data} onClose={() => setIsOpen(false)} />
    </div>
  )
}
export default Recipe
