from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.features.health.router import router as health_router
from app.features.download.router import router as download_router


app = FastAPI()


origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(health_router)
app.include_router(download_router)
