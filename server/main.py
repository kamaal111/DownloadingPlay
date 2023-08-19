from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse, FileResponse


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


@app.get("/download/pdf", response_class=RedirectResponse, status_code=302)
def download_pdf():
    return "/download-link/pdf"


@app.get("/download-link/pdf", response_class=FileResponse)
def pdf_download_link():
    return FileResponse("samples/bitcoin.pdf")


@app.get("/health/ping")
def health_ping():
    return {"message": "pong"}
