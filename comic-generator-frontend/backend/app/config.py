from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_ENV: str = "development"
    BASE_URL: str = "http://localhost:8000"
    
    # DB
    DATABASE_URL: str = "sqlite:///./comics.db"
    
    # Providers
    LLM_PROVIDER: str = "ollama"
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    OLLAMA_MODEL: str = "mistral"
    
    IMAGE_PROVIDER: str = "huggingface"
    HUGGINGFACE_API_KEY: str = ""
    HF_IMAGE_MODEL: str = "stabilityai/stable-diffusion-xl-base-1.0"
    
    # Storage
    IMAGE_STORAGE_PATH: str = "./static/images"
    PDF_STORAGE_PATH: str = "./static/exports"
    
    # CORS
    ALLOWED_ORIGINS: str = "http://localhost:5173,http://localhost:3000"

    class Config:
        env_file = ".env"

settings = Settings()
