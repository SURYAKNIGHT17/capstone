from fastapi import APIRouter
from app.api.routes import generate, status, comics, export, cancel

api_router = APIRouter()

api_router.include_router(generate.router, tags=["Generate"])
api_router.include_router(status.router, tags=["Status"])
api_router.include_router(comics.router, tags=["Comics"])
api_router.include_router(export.router, tags=["Export"])
api_router.include_router(cancel.router, tags=["Cancel"])
