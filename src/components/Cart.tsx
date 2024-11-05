import { useAtom } from "jotai";
import { recipesInCart } from "../store";

export default function Cart() {
    const [inCart, setInCart] = useAtom(recipesInCart);
    const cartItems = inCart;

    return (
        <div className="cart">
            <div className="list-of-ingredients">
                <ul></ul>
            </div>
            <div>
                {inCart.map((item, index) => (
                    <div key={index}>
                        <div>{item.strMeal}</div>
                        <div>{item.strInstructions}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
