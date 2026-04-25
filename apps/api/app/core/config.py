from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    app_name: str = "DockOS API"
    secret_key: str = "change-me"
    access_token_expire_minutes: int = 60 * 24
    algorithm: str = "HS256"
    database_url: str = "postgresql+psycopg2://dockos:dockos_dev@postgres:5432/dockos"
    redis_url: str = "redis://redis:6379/0"
    platform_fee_rate: float = 0.15


settings = Settings()
