INSTALLED_APPS = [
    # ... other apps ...
    'corsheaders',
]

MIDDLEWARE = [
    # ... other middleware ...
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # 允许前端访问
] 