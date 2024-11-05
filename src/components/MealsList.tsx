import { useQuery } from "@tanstack/react-query";
import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import { allMeals, filteredMeals as filteredMealsAtom, itemId, recipesInCart } from "../store";
import "../css/MealsList.css";
import RecipeDialog from "./RecipeDialog";
import { usePagination } from "../hooks/usePagination";
import { Pagination } from "@mui/material";
import { Link } from "react-router-dom";

export default function MealsList() {
    const queryMeals = useQuery<{
        meals: any[];
    }>({
        queryKey: ["meals"],
        queryFn: async () => {
            const response = await fetch(
                "https://www.themealdb.com/api/json/v1/1/search.php?f=b"
            );
            const data = await response.json();
            return data;
        },
        refetchInterval: false,
        refetchOnWindowFocus: false,
    });
    const [meals, setMeals] = useAtom(allMeals);
    const [filteredMeals, setFilteredMeals] = useAtom(filteredMealsAtom);
    const { chunk, currentPage, pageCount, setCurrentPage } = usePagination({
        arr: filteredMeals,
        pageSize: 6,
    });
    const [inCart, setInCart] = useAtom(recipesInCart)

    useEffect(() => {
        if (queryMeals.data) {
            setMeals(queryMeals.data.meals);
            setFilteredMeals(queryMeals.data.meals);
        }
    }, [queryMeals.data]);

    const addToCart = (meal:object) => {
        const cartArr = [...inCart, meal]
        setInCart(cartArr)
        alert("Recipe added to cart")
    }

    return (
        <div className="">
            <div className="meals-list">
                {chunk?.map((meal, index) => (
                    <div className="meal-card" key={index}>
                        <img src={meal.strMealThumb} alt="" />
                        <div className="content">
                            <h4>{meal.strMeal}</h4>
                            <div className="characteristics">
                                <p>{meal.strArea}</p>
                                <p>{meal.strCategory}</p>
                            </div>
                            <div className="btn-row">
                                <Link to={`/recipes/${meal.idMeal}`}>Open full recipe</Link>
                                <button onClick={() => {addToCart(meal)}}>Add to cart</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination
                className="pagination"
                onChange={(event, value) => {
                    setCurrentPage(value);
                }}
                page={currentPage}
                count={pageCount}
            />
        </div>
    );
}
