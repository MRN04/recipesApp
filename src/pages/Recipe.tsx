import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import "../css/Recipe.css"

export function Recipe() {
    const { mealId } = useParams();
    const queryMeal = useQuery<{
        meals: any[];
    }>({
        queryKey: ["meal"],
        queryFn: async () => {
            const response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
            );
            const data = await response.json();
            return data;
        },
        refetchInterval: false,
        refetchOnWindowFocus: false,
    });
    useEffect(() => {
        if (queryMeal.data) {
            console.log(queryMeal.data.meals[0]);
        }
    }, [queryMeal.data]);

    const keys = Object.keys(queryMeal?.data?.meals[0] || {});
    const filteredKeysIng = keys?.filter((key) => key.includes("Ingredient"));
    const filteredKeysMes = keys?.filter((key) => key.includes("Measure"));
    const ingridients = useMemo(() => {
        const arr = [];
        for (const key of filteredKeysIng) {
            const ingridientName = queryMeal.data?.meals[0][key];
            arr.push(ingridientName);
        }
        return arr.filter((item) => {
            if (!(typeof item === "string")) {
                return false;
            }
            return item.length !== 0;
        });
    }, [filteredKeysIng]);
    const measures = useMemo(() => {
        const arr = [];
        for (const key of filteredKeysMes) {
            const ingridientName = queryMeal.data?.meals[0][key];
            arr.push(ingridientName);
        }
        return arr.filter((item) => {
            if (!(typeof item === "string")) {
                return false;
            }
            return item.length !== 0;
        });
    }, [filteredKeysMes]);

    return (
        <div className="recipe-page">
            <div className="image">
                <img src={queryMeal.data?.meals[0].strMealThumb} alt="" />
            </div>
            <div className="content">
                <h2>{queryMeal.data?.meals[0].strMeal}</h2>
                <div className="ingredients">
                    <ul className="ingredients-name">
                        {ingridients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                    <ul className="measures">
                        {measures.map((measure, index) => (
                            <li key={index}>{measure}</li>
                        ))}
                    </ul>
                </div>
                <p>{queryMeal.data?.meals[0].strInstructions}</p>
            </div>
        </div>
    );
}
