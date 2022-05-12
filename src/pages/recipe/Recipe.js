import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme } from '../../hooks/useTheme'
import { projectFirestore } from '../../firebase/config'

//styles
import "./Recipe.css";

function Recipe() {
  const { id } = useParams()
  const { mode } = useTheme()

  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setIsPending(true)
    //fetching data
    projectFirestore.collection('Recipes').doc(id).get().then((doc) => {
      //output data
      if (doc.exists) {
        setIsPending(false)
        setData(doc.data())
      } else {
        // output error if no recipe
        setIsPending(false)
        setError('Could not find that recipe')
      }
    })
  }, [id])

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && (
        <>
          <h2 className="page-title">{data.title}</h2>
          <p>Takes {data.cookingTime} to cook.</p>
          <ul>
            {data.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p className="method">{data.method}</p>
        </>
      )}
    </div>
  );
}
export default Recipe;
