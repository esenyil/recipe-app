import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme } from '../../hooks/useTheme';
import { projectFirestore } from '../../firebase/config';
import updateIcon from '../../assets/update.svg';

//components
import Modal from '../../components/Modal';

//styles
import "./Recipe.css";

function Recipe() {
  const { id } = useParams()
  const { mode } = useTheme()

  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsPending(true)
    //fetching data
    const unsub = projectFirestore.collection('Recipes').doc(id).onSnapshot((doc) => {
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

    // cleanup function
    return () => unsub()

  }, [id])

  const handleClick = () => {
    // projectFirestore.collection('Recipes').doc(id).update({
    //   title: 'Something different'
    // })

  }

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
          <img src={updateIcon} className="update" onClick={() => setIsOpen(true)} />
        </>
      )}
      <Modal open={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
export default Recipe;
