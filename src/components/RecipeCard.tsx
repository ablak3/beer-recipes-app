import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Recipe } from '../types';

interface Props {
  recipe: Recipe;
}

const RecipeCard: React.FC<Props> = ({ recipe }) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{recipe.title}</Typography>
        <Typography variant="body2">{recipe.description}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => navigate(`/recipes/${recipe.id}`)}>View</Button>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;
