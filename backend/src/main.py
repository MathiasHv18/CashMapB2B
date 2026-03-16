from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from api.authEP import authRouter
from api.ownerEP import ownerRouter
from api.businessEP import businessRouter
from api.itemsEP import itemRouter
from api.transactionEP import transactionRouter
from api.dashboardEP import dashboardRouter

load_dotenv()

app = FastAPI()

# Permite que el frontend (Vite en :5173) llame al backend sin ser bloqueado
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(authRouter, prefix="/auth", tags=["auth"])
app.include_router(ownerRouter, prefix="/owner", tags=["owner"])
app.include_router(businessRouter, prefix="/business", tags=["business"])
app.include_router(itemRouter, prefix="/item", tags=["item"])
app.include_router(transactionRouter, prefix="/transaction",
                   tags=["transaction"])
app.include_router(dashboardRouter, prefix="/dashboard", tags=["dashboard"])
