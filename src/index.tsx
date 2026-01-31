import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import { worker } from './mocks/browser';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import recipeTheme from "./styles/recipeTheme"
import './styles/RecipeStyles.css';

worker.start().then(() => {
  const root = ReactDOM.createRoot(document.getElementById('root')!);
  root.render(
    <React.StrictMode>
      <ThemeProvider theme={recipeTheme}>
        <CssBaseline /> {/* Normalizes CSS across browsers */}
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </ThemeProvider>
    </React.StrictMode>
  );
});

