from fastapi import APIRouter
from fastapi.responses import FileResponse, RedirectResponse


router = APIRouter(tags=["download"], prefix="/download")


@router.get("/pdf", response_class=RedirectResponse, status_code=302)
def download_pdf():
    return "/download/link/pdf"


@router.get("/link/pdf", response_class=FileResponse)
def pdf_download_link():
    return FileResponse(
        "samples/bitcoin.pdf",
        filename="bitcoin.pdf",
        media_type="application/octet-stream",
    )
