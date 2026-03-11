import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.config import settings
from app.api.router import api_router

app = FastAPI(title="AI Comic Generator")

# Setup CORS
origins = [origin.strip() for origin in settings.ALLOWED_ORIGINS.split(',')]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static files for images and PDFs
os.makedirs(settings.IMAGE_STORAGE_PATH, exist_ok=True)
os.makedirs(settings.PDF_STORAGE_PATH, exist_ok=True)
app.mount("/api/images", StaticFiles(directory=settings.IMAGE_STORAGE_PATH), name="images")

app.include_router(api_router, prefix="/api")

@app.get("/api/health")
def health_check():
    return {"status": "ok"}

