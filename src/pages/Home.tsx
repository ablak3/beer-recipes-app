import { Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import RecipeCard from '../components/RecipeCard';
import { useRecipes } from '../hooks/useRecipes';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const { recipes, loading } = useRecipes();

  if (loading) return <LoadingSpinner />;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>All Beer Recipes</Typography>
      <Grid container spacing={2}>
        {recipes.map(recipe => (
          <Grid key={recipe.id} size={{xs:12, sm:6, md:4}}>
            <RecipeCard recipe={recipe} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
