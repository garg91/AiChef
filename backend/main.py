from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="AI Chef API", description="Backend for AI Chef Application")

# CORS setup
origins = [
    "http://localhost:5173",  # Vite default
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to AI Chef API"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

from routers import plan
app.include_router(plan.router, prefix="/api", tags=["plan"])
