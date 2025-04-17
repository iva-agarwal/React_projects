from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import models, schemas, auth,database
from fastapi import File, Form, UploadFile
from uuid import uuid4
from fastapi.responses import FileResponse
import os
from database import get_db
from auth import get_current_user
from models import User

router = APIRouter()

@router.post("/signup", response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    existing_user = db.query(models.User).filter(
        (models.User.email == user.email) | (models.User.username == user.username)
    ).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email or username already registered")
    
    hashed_password = auth.hash_password(user.password)

    new_user = models.User(
        email=user.email,
        password=hashed_password,
        username=user.username,
        user_image=user.user_image,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


@router.post("/login")
def login(user: schemas.LoginRequest, db: Session = Depends(database.get_db)):
    return auth.login_user(user.email, user.password, db)

@router.get("/users/me", response_model=schemas.UserResponse)
def get_current_user_info(current_user: models.User = Depends(auth.get_current_user)):
    return current_user

import os

@router.put("/users/me")
def update_user(
    username: str = Form(...),
    user_image: UploadFile = File(None),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    current_user.username = username

    if user_image:
        # Ensure 'uploads' directory exists
        os.makedirs("uploads", exist_ok=True)

        # Save the image
        filename = f"{uuid4()}_{user_image.filename}"
        filepath = f"uploads/{filename}"
        with open(filepath, "wb") as f:
            f.write(user_image.file.read())

        current_user.user_image = f"http://localhost:8000/{filepath}"

    db.commit()
    db.refresh(current_user)
    return current_user
