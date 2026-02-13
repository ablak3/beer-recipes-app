import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useRecipesInfinite } from "../hooks/useRecipesInfinite";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import RecipeCard from "../components/RecipeCard";
import LoadingSpinner from "../components/LoadingSpinner";

const MyRecipes = () => {
  const {
    items: recipes,
    loading,
    error,
    hasMore,
    loadMore
  } = useRecipesInfinite({ mode: "mine", initialSize: 12 });

  const { sentinelRef } = useInfiniteScroll({
    loading,
    hasMore,
    onLoadMore: loadMore,
    rootMargin: "400px",
  });

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        My Recipes
      </Typography>

      <Grid container spacing={2}>
        {recipes.map((recipe) => (
          <Grid key={recipe.id ?? recipe.title} size={{ xs: 12, sm: 6, md: 4 }}>
            <RecipeCard recipe={recipe} />
          </Grid>
        ))}
      </Grid>

      {/* sentinel triggers loadMore when it enters viewport */}
      <div ref={sentinelRef} style={{ height: 1 }} />

      {error && <p className="p-4 text-red-500">{error}</p>}  
      {loading && <LoadingSpinner />}
      {!loading && !hasMore && (
        <Typography sx={{ mt: 2, opacity: 0.7 }}>
          You&apos;ve reached the end.
        </Typography>
      )}
    </Container>
  );
};

export default MyRecipes;
