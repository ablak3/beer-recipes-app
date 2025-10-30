import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useAuth } from "../hooks/useAuth";
import { getUserRecipes } from "../api/recipes";
import { Recipe } from "../types";
import RecipeCard from "../components/RecipeCard";
import LoadingSpinner from "../components/LoadingSpinner";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return; // no user, skip

    const fetchUserRecipes = async () => {
      try {
        setLoading(true);
        const response = await getUserRecipes(user);
        setRecipes(response.data);
      } catch (err) {
        console.error("Failed to fetch user recipes:", err);
        setError("Failed to fetch user recipes.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserRecipes();
  }, [user]);

  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (loading) return <LoadingSpinner />;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        My Recipes
      </Typography>
      <Grid container spacing={2}>
        {recipes.map((recipe) => (
          <Grid key={recipe.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <RecipeCard recipe={recipe} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MyRecipes;
