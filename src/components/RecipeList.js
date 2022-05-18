import { Link } from "react-router-dom";
import trashcan from '../assets/trashcan.svg';
import { projectFirestore } from '../firebase/config';

// styles
import "./RecipeList.css";

function RecipeList({ recipes }) {

  // checking if there is any recipes, if not then error message
  if (recipes.length === 0) {
    return <div className="error">No recipes to load...</div>;
  }

  // taking id as a parameter to delete a recipe, and then passing the recipe id in as argument when clicked
  const handleClick = (id) => {
    projectFirestore.collection('Recipes').doc(id).delete()
  }
  
  return (
    <div className="recipe-list">
      {/* Creating components from arrays ?? */}
      {recipes.map((recipe) => (
        <div key={recipe.id} className="card">
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make.</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
          <img 
            className="delete"
            src={trashcan}
            onClick={() => handleClick(recipe.id)}
            alt="icon for deleting recipe"
            />
        </div>
      ))}
    </div>
  );
}
export default RecipeList;
