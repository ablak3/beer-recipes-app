import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import { getRecipeById } from "../api/recipes";
import { Recipe } from "../types";
import CommentBox from "../components/CommentBox";
import LoadingSpinner from "../components/LoadingSpinner";

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; // no id in URL, skip

    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const response = await getRecipeById(id);
        setRecipe(response.data);
      } catch (err) {
        console.error("Failed to fetch recipe:", err);
        setError("Failed to fetch recipe.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (loading || !recipe) return <LoadingSpinner />;

  return (
    <Container>
      <Typography variant="h4">{recipe.title}</Typography>
      <Typography>{recipe.description}</Typography>
      {recipe.ingredients &&
        recipe.ingredients.map((ingredient) => (
          <Typography>{ingredient.name}</Typography>
        ))}
      {/* <IngredientBox recipe={recipe}/> */}
      <Typography variant="h6">Instructions</Typography>
      <Typography>{recipe.instructions}</Typography>
      <CommentBox recipe={recipe} />
    </Container>
  );
};

export default RecipeDetail;
