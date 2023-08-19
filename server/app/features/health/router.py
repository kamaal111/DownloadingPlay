from fastapi import APIRouter


router = APIRouter(tags=["health"], prefix="/health")


@router.get("/ping")
def health_ping():
    return {"message": "pong"}
