import { projectFirestore } from '../../firebase/config'
import { useEffect, useState } from 'react';

// styles
import './Home.css';

//components
import RecipeList from '../../components/RecipeList';


function Home() {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        setIsPending(true)

        //fetching data
        const unsub = projectFirestore.collection('Recipes').onSnapshot((snapshot) => {
            console.log(snapshot)
            //output error if no recipe
            if (snapshot.empty) {
                setError('No recipes to load')
                setIsPending(false)
            } else {
                let results = []
                // output data
                snapshot.docs.forEach(doc => {
                    results.push({ id: doc.id, ...doc.data()})
                })
                setData(results)
                setIsPending(false)
            }
        }, (err) => {
            setError(err.message)
            setIsPending(false)
        })

        // cleanup funtion invoked
        return () => unsub()

    }, [])

    return(
        <div className='home'>
            {error && <p className='error'>{error}</p>}
            {isPending && <p className='loading'>Loading...</p>}
            {data && <RecipeList recipes={data} />}
        </div>
    )
}
export default Home;