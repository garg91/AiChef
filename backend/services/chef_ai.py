import os
import json
import time
import random
import google.generativeai as genai
from dotenv import load_dotenv
from models import UserProfile, MealPlanRequest, MealPlanResponse
load_dotenv()

# Configure API key
API_KEY = os.getenv("GEMINI_API_KEY")
if API_KEY:
    genai.configure(api_key=API_KEY)

def generate_meal_plan(request: MealPlanRequest) -> MealPlanResponse:
    if not API_KEY:
        raise ValueError("GEMINI_API_KEY not found in environment variables")

    # Use the stable flash alias
    model = genai.GenerativeModel('gemini-flash-latest')
    
    prompt = f"""
    You are an experienced, nutritional optimist Chef AI. Your goal is to create a personalized meal plan.
    
    User Profile:
    - Current Weight: {request.user_profile.current_weight}
    - Target Weight: {request.user_profile.target_weight}
    - Goal: {request.user_profile.goal}
    - Time Frame: {request.user_profile.time_frame_weeks} weeks
    - Diet: {', '.join(request.user_profile.dietary_restrictions)}
    - Budget: {request.user_profile.budget}
    
    Ingredients Available: {', '.join(request.ingredients)}
    Calories Target: {request.calories_per_day if request.calories_per_day else 'Calculate based on goal'}
    
    Please provide a detailed meal plan for 1 day representing the diet.
    Include advice on how to achieve the weight goal within the timeframe.
    
    Output JSON format:
    {{
        "plan": [
            {{
                "day": "Day 1",
                "total_calories": 2000,
                "meals": [
                    {{
                        "name": "Breakfast name",
                        "calories": 500,
                        "ingredients": ["egg", "toast"],
                        "recipe_instructions": "Cook egg..."
                    }}
                ]
            }}
        ],
        "advice": "..."
    }}
    """
    
    max_retries = 3
    base_delay = 5
    
    for attempt in range(max_retries):
        try:
            response = model.generate_content(prompt, generation_config={"response_mime_type": "application/json"})
            data = json.loads(response.text)
            return MealPlanResponse(**data)
        except Exception as e:
            if "429" in str(e) or "quota" in str(e).lower():
                if attempt < max_retries - 1:
                    sleep_time = base_delay * (2 ** attempt) + random.uniform(0, 1)
                    print(f"Quota exceeded, retrying in {sleep_time:.2f} seconds...")
                    time.sleep(sleep_time)
                    continue
            # Re-raise if not 429 or retries exhausted
            print(f"Error parsing AI response: {e}")
            if 'response' in locals() and hasattr(response, 'text'):
                print(response.text)
            raise e
