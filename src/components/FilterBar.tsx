import { useEffect, useState } from "react";
import "../css/FilterBar.css";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { allMeals, filteredMeals } from "../store";
import { Link } from "react-router-dom";

export default function FilterBar() {
    const queryTypes = useQuery<{
        categories: any[];
    }>({
        queryKey: ["types"],
        queryFn: async () => {
            const response = await fetch(
                "https://www.themealdb.com/api/json/v1/1/categories.php"
            );
            const data = await response.json();
            return data;
        },
    });

    const [types, setTypes] = useState<
        {
            category: {};
            checked: boolean;
        }[]
    >([]);
    useEffect(() => {
        if (queryTypes.data) {
            const arr = [];
            const { categories } = queryTypes.data;
            for (const category of categories) {
                arr.push({
                    category,
                    checked: false,
                });
            }
            setTypes(arr);
        }
    }, [queryTypes.data]);

    const [isOpen, setIsOpen] = useState(false);
    const [meals, setMeals] = useAtom(allMeals);
    const [_, setFilteredMeals] = useAtom(filteredMeals);

    const handleCheckboxChange = ({
        event,
        category,
    }: {
        event: any;
        category: {
            idCategory: string;
            strCategory: string;
        };
    }) => {
        const { checked } = event.target;
        if (checked) {
            const newCheckedTypeIndex = types.findIndex(
                (item) => category.idCategory === item.category.idCategory
            );
            const newTypes = types.map(({ category, checked }, index) => {
                if (index === newCheckedTypeIndex) {
                    return {
                        category,
                        checked: true,
                    };
                }

                return {
                    category,
                    checked,
                };
            });
            setTypes(newTypes);
            const filteredMeals = meals.filter(
                (item) => item.strCategory === category.strCategory
            );
            console.log(filteredMeals);
            setFilteredMeals(filteredMeals);
            return;
        }

        const newUncheckedTypeIndex = types.findIndex(
            (item) => category.idCategory === item.category.idCategory
        );
        const newTypes = types.map(({ category, checked }, index) => {
            if (index === newUncheckedTypeIndex) {
                return {
                    category,
                    checked: false,
                };
            }

            return {
                category,
                checked,
            };
        });
        setTypes(newTypes);
    };

    return (
        <div className="filters-bar">
            <button
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
            >
                Filter
            </button>
            <Link to="/cart">Open cart</Link>
            {isOpen && (
                <div className="filters-pop-up">
                    <div className="checkboxes">
                        {types.map((item, index) => (
                            <div key={index}>
                                <input
                                    id={item.category.strCategory}
                                    checked={item.checked}
                                    type="checkbox"
                                    onChange={(event) => {
                                        handleCheckboxChange({
                                            event,
                                            category: item.category,
                                        });
                                    }}
                                />
                                <label htmlFor={item.category.strCategory}>
                                    {item.category.strCategory}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="btn-row">
                        <button
                            onClick={() => {
                                setFilteredMeals(meals);
                                setTypes(
                                    types.map((item) => ({
                                        category: item.category,
                                        checked: false,
                                    }))
                                );
                            }}
                        >
                            скинути
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
