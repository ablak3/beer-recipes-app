import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import { getRecipeById } from "../api/recipes";
import { Recipe } from "../types";
import CommentBox from "../components/CommentBox";
import LoadingSpinner from "../components/LoadingSpinner";
import RecipeSummarySections from "../components/recipe-summary/RecipeSummarySections";
import { useAuth } from "../hooks/useAuth";

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

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

  const canEdit = useMemo(() => {
    if (!recipe || !user) return false;

    // pick ONE canonical comparison:
    // return recipe.authorId === user.id;
    return recipe.author === user; // adjust to your schema
  }, [recipe, user]);

  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (loading || !recipe) return <LoadingSpinner />;

  return (
    <Container>
      <Typography variant="h4">{recipe.title}</Typography>
      <Typography sx={{ mb: 2 }}>{recipe.description}</Typography>

      {/* Reused summary UI */}
      <RecipeSummarySections recipe={recipe} editable={canEdit} />

      <Typography variant="h6">Instructions</Typography>
      <Typography sx={{ mb: 2 }}>{recipe.instructions}</Typography>

      <CommentBox recipe={recipe} />
    </Container>
  );
};

export default RecipeDetail;
