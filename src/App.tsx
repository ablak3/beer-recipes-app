import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecipeDetail from "./pages/RecipeDetail";
import MyRecipes from "./pages/MyRecipes";
import CreateRecipeLayout from "./pages/create-recipe/CreateRecipeLayout";
import RecipeStepBasic from "./pages/create-recipe/RecipeStepBasic";
import RecipeStepBrew from "./pages/create-recipe/RecipeStepBrew";
import RecipeStepIngredients from "./pages/create-recipe/RecipeStepIngredients";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          {/* --- Public routes --- */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />

          {/* --- Protected routes wrapper --- */}
          <Route element={<ProtectedRoute />}>
            {/* ✅ Protect My Recipes */}
            <Route path="/my-recipes" element={<MyRecipes />} />

            {/* ✅ Protect nested “Create Recipe” routes */}
            <Route path="/create" element={<CreateRecipeLayout />}>
              <Route index element={<RecipeStepBasic />} />
              <Route path="/create/details" element={<RecipeStepBasic />} />
              <Route path="/create/brewSettings" element={<RecipeStepBrew />} />
              <Route
                path="/create/ingredients"
                element={<RecipeStepIngredients />}
              />
            </Route>
          </Route>

          {/* --- Catch-all route --- */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
