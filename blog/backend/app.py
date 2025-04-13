from fastapi import FastAPI
from database import engine
import models
from routers import auth, post
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow CORS for your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Or "*" for all, but better to be specific
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth.router)
app.include_router(post.router) 

models.Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
    return {"message": "hello"}
