from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Dark Web Monitoring & Intelligence"
    MONGODB_URL: str = "mongodb://localhost:27017"
    DATABASE_NAME: str = "darkweb_intel"
    SECRET_KEY: str = "super_secret_jwt_key_please_change_in_production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        env_file = ".env"

settings = Settings()
