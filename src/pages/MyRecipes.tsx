import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useMyRecipes } from "../hooks/useMyRecipes";
import RecipeCard from "../components/RecipeCard";
import LoadingSpinner from "../components/LoadingSpinner";

const MyRecipes = () => {
  const { recipes, loading, error } = useMyRecipes();

  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (loading) return <LoadingSpinner />;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        My Recipes
      </Typography>
      <Grid container spacing={2}>
        {recipes.map((recipe) => (
          <Grid key={recipe.id} size={{xs:12, sm:6, md:4}}>
            <RecipeCard recipe={recipe} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MyRecipes;
