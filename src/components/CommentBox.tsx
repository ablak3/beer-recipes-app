import { Box, Typography, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { addComment } from '../api/recipes';
import { useNavigate } from 'react-router-dom';
import { Recipe } from '../types';
import { useAuth } from '../hooks/useAuth';

interface CommentBoxProps {
  recipe: Recipe;
}

export const CommentBox: React.FC<CommentBoxProps> = ({ recipe }) => {
  const { user } = useAuth();
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!recipe.id || !user) return;
    addComment(recipe.id, { id: null, user, content: comment })
      .then(() => setComment(''))
      .then(() => navigate(`/recipes/${recipe.id}`));
  };

  return (
    <Box mt={4}>
      <Typography variant="h6">Comments</Typography>
      {recipe.comments?.map((comment, index) => (
        <Box key={index} mb={2}>
          <Typography variant="subtitle2">{comment.user}</Typography>
          <Typography>{comment.content}</Typography>
        </Box>
      ))}
      <TextField
        fullWidth
        label="Add a comment"
        value={comment}
        onChange={e => setComment(e.target.value)}
      />
      <Button onClick={handleSubmit} variant="contained" sx={{ mt: 2 }}>Submit</Button>
    </Box>
  );
};

export default CommentBox;
