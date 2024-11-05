import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Recipe } from "./pages/Recipe";
import { CartPage } from "./pages/CartPage";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/recipes/:mealId" element={<Recipe />} />
                    <Route path="/cart" element={<CartPage />} />
                </Routes>
            </Router>
        </QueryClientProvider>
    );
}
export default App;
