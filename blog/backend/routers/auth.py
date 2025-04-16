from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import models, schemas, auth,database

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
