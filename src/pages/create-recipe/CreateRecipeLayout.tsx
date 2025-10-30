import { useState, useCallback } from 'react';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Breadcrumbs,
  Link,
  Container,
  Button,
  LinearProgress,
  Typography,
  Box,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { recipeSchema, RecipeFormValues } from "../../validation/recipeSchema";
import { defaultRecipeValues } from "../../constants/defaultRecipeValues";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const steps = [
  { label: "Basic Info", path: "/create" },
  { label: "Brew Settings", path: "/create/brewSettings" },
  { label: "Ingredients", path: "/create/ingredients" },
];

export default function CreateRecipeLayout() {
  const methods = useForm<RecipeFormValues>({
    resolver: yupResolver(recipeSchema),
    defaultValues: defaultRecipeValues,
    mode: "onChange",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const currentStepIndex = steps.findIndex((s) => s.path === location.pathname);

  // Autosave and restore
  const [formData, setFormData] = useState(defaultRecipeValues);
  const handleLoad = useCallback((saved: typeof formData) => {
    setFormData(saved);
  }, []);

  useLocalStorage("recipeForm", formData, handleLoad);

  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const goNext = () => {
    if (currentStepIndex < steps.length - 1) {
      navigate(steps[currentStepIndex + 1].path);
    }
  };

  const goBack = () => {
    if (currentStepIndex > 0) {
      navigate(steps[currentStepIndex - 1].path);
    }
  };

  return (
    <FormProvider {...methods}>
      <Container sx={{ mt: 4, mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          Create a New Recipe
        </Typography>

        {/* Progress bar */}
        <Box sx={{ mb: 3 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ height: 10, borderRadius: 5 }}
          />
          <Typography variant="body2" sx={{ mt: 1 }}>
            Step {currentStepIndex + 1} of {steps.length}
          </Typography>
        </Box>

        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 3 }}>
          {steps.map((step, idx) => (
            <Link
              key={step.path}
              underline={idx === currentStepIndex ? "none" : "hover"}
              color={idx === currentStepIndex ? "text.primary" : "inherit"}
              onClick={() => navigate(step.path)}
              sx={{ cursor: "pointer" }}
            >
              {step.label}
            </Link>
          ))}
        </Breadcrumbs>

        {/* Render current page */}
        <Outlet />

        {/* Navigation buttons */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Button
            variant="outlined"
            disabled={currentStepIndex === 0}
            onClick={goBack}
          >
            Back
          </Button>

          {currentStepIndex < steps.length - 1 ? (
            <Button variant="contained" onClick={goNext}>
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={methods.handleSubmit((data) => {
                console.log("✅ Final recipe saved:", data);
                localStorage.removeItem("createRecipeDraft");
              })}
            >
              Save Recipe
            </Button>
          )}
        </Box>
      </Container>
    </FormProvider>
  );
}
