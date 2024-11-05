import { useAtom } from "jotai"
import { recipesInCart } from "../store"
import "../css/cart.css"

export default function SelectedRecipes() {
    const [selectedRecipes, setSelectedRecipes] = useAtom(recipesInCart)
    
    const removeRecipe = (item:object) => {
        const newArr = selectedRecipes.filter((recipe) => recipe.idMeal !== item.idMeal)    
        setSelectedRecipes(newArr)
    }

    return (
        <div>
        <h2 className="selected-recipes-title">Selected recipes</h2>
        <div className="selected-recipes-list">
        {selectedRecipes.map((item, index) =>
            <div key={index} className="selected-recipe">
                <div>{item.strMeal}</div>
                <button onClick={() => {removeRecipe(item)}}>remove</button>
            </div>
        )}
        </div>
        </div>
    )
}