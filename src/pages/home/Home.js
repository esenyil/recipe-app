import { db } from '../../firebase/config'
import { useEffect, useState } from 'react';

// styles
import './Home.css';

//components
import RecipeList from '../../components/RecipeList';


function Home() {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(false)

    //useEffect is fired after the page is rendered
    useEffect(() => {
        setIsPending(true)

        //fetching data
        const unsub = db.collection('Recipes').onSnapshot((snapshot) => {
            console.log(snapshot)
            //outputting error if no recipe - empty firebase property
            if (snapshot.empty) {
                setError('No recipes to load')
                setIsPending(false)
            } else {
                let results = []
                // outputting data
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

        // cleanup funtion invoked - stop listening when unmounting
        return () => unsub()

    }, [])

    return(
        <div className='home'>
            {/* conditional rendering using logical and */}
            {error && <p className='error'>{error}</p>}
            {isPending && <p className='loading'>Loading...</p>}
            {data && <RecipeList recipes={data} />}
        </div>
    )
}
export default Home;