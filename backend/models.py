from pydantic import BaseModel, Field
from typing import List, Optional
from enum import Enum

class Goal(str, Enum):
    WEIGHT_LOSS = "weight_loss"
    WEIGHT_GAIN = "weight_gain"
    MAINTAIN = "maintain"

class UserProfile(BaseModel):
    current_weight: float = Field(..., description="Current weight in kg or lbs")
    target_weight: float = Field(..., description="Target weight in kg or lbs")
    goal: Goal
    time_frame_weeks: int = Field(..., description="Time frame in weeks")
    dietary_restrictions: Optional[List[str]] = []
    budget: Optional[str] = "moderate"
    activity_level: Optional[str] = "moderate"

class MealPlanRequest(BaseModel):
    ingredients: List[str] = []
    calories_per_day: Optional[int] = None
    user_profile: UserProfile

class Meal(BaseModel):
    name: str
    calories: int
    ingredients: List[str]
    recipe_instructions: str

class DayPlan(BaseModel):
    day: str
    meals: List[Meal]
    total_calories: int

class MealPlanResponse(BaseModel):
    plan: List[DayPlan]
    advice: str
