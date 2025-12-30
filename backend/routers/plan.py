from fastapi import APIRouter, HTTPException
from models import MealPlanRequest, MealPlanResponse
from services.chef_ai import generate_meal_plan

router = APIRouter()

@router.post("/generate-plan", response_model=MealPlanResponse)
async def create_meal_plan(request: MealPlanRequest):
    try:
        plan = generate_meal_plan(request)
        return plan
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        print(f"Internal Server Error: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to generate meal plan: {str(e)}")
