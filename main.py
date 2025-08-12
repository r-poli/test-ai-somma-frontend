from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cambierai più avanti con il dominio frontend esatto
    allow_methods=["*"],
    allow_headers=["*"]
)

class SumRequest(BaseModel):
    num1: float
    num2: float

@app.post("/sum")
async def sum_numbers(req: SumRequest):
    return {"result": req.num1 + req.num2}
