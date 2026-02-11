// CreateRecipeLayout.tsx
import { useEffect } from "react";
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
import { RecipeProvider } from "../../context/RecipeContext";
import { useRecipe } from "../../hooks/useRecipe";
import { defaultRecipeValues } from "../../constants/defaultRecipeValues";
import { createRecipe } from "../../api/recipes";
import { recipeSchema } from "../../validation/recipeSchema";

const STORAGE_KEY = "recipeForm";

const steps = [
  { label: "Basic Info", path: "/create" },
  { label: "Grain Bill", path: "/create/grainBillSettings" },
  { label: "Brew Settings", path: "/create/brewSettings" },
  { label: "Water Chemistry Settings", path: "/create/waterChemistrySettings" },
  { label: "ABV Settings", path: "/create/abvSettings" },
  { label: "IBU Settings", path: "/create/ibuSettings" },
  { label: "Misc Ingredients", path: "/create/ingredients" },
  { label: "Recipe Summary", path: "/create/recipeSummary" },
];

// --- inner component that can use context ---
function CreateRecipeLayoutInner() {
  const { recipe, loadRecipe } = useRecipe();

  const navigate = useNavigate();
  const location = useLocation();

  const currentStepIndex = steps.findIndex((s) => s.path === location.pathname);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  // Restore once on mount
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const saved = JSON.parse(raw);
      loadRecipe(saved);
    } catch {
      // ignore bad storage
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Autosave whenever recipe changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipe));
  }, [recipe]);

  const goNext = () => {
    if (currentStepIndex < steps.length - 1) navigate(steps[currentStepIndex + 1].path);
  };

  const goBack = () => {
    if (currentStepIndex > 0) navigate(steps[currentStepIndex - 1].path);
  };

  const onSave = async () => {
    // Optional validation (since RHF is gone)
    try {
      await recipeSchema.validate(recipe, { abortEarly: false });
    } catch (err: any) {
      console.log("❌ Validation errors:", err?.errors ?? err);
      return;
    }

    console.log("✅ Final recipe saved:", recipe);
    await createRecipe(recipe);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <Container sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" gutterBottom>
        Create a New Recipe
      </Typography>

      {/* Progress */}
      <Box sx={{ mb: 3 }}>
        <LinearProgress variant="determinate" value={progress} sx={{ height: 10, borderRadius: 5 }} />
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

      {/* Current step */}
      <Outlet />

      {/* Navigation buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button variant="outlined" disabled={currentStepIndex === 0} onClick={goBack}>
          Back
        </Button>

        {currentStepIndex < steps.length - 1 ? (
          <Button variant="contained" onClick={goNext}>
            Next
          </Button>
        ) : (
          <Button variant="contained" onClick={onSave}>
            Save Recipe
          </Button>
        )}
      </Box>
    </Container>
  );
}

export default function CreateRecipeLayout() {
  return (
    <RecipeProvider initialRecipe={defaultRecipeValues}>
      <CreateRecipeLayoutInner />
    </RecipeProvider>
  );
}
