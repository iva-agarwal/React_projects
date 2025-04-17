from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import models, schemas, database
from auth import get_current_user 
from database import get_db
from sqlalchemy.orm import joinedload

router = APIRouter(prefix="/posts", tags=["Posts"])

@router.post("/", response_model=schemas.PostResponse, status_code=status.HTTP_201_CREATED)
def create_post(post: schemas.PostCreate, db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    new_post = models.Post(
        title=post.title,
        content=post.content,
        user_id=current_user.id
    )
    db.add(new_post)
    db.commit()
    db.refresh(new_post)

    # Convert to PostResponse schema before returning
    return schemas.PostResponse(
        id=str(new_post.id),  # Convert UUID to string
        title=new_post.title,
        content=new_post.content,
        created_at=new_post.created_at.isoformat(),
        updated_at=new_post.updated_at.isoformat(),
        username=current_user.username,
        user_image=current_user.user_image
    )


@router.get("/", response_model=List[schemas.PostResponse])
def get_all_posts(db: Session = Depends(database.get_db)):
    posts = db.query(models.Post).join(models.User).order_by(models.Post.created_at.desc()).all()
    
    return [
        schemas.PostResponse(
            id=str(post.id),  # Convert UUID to string
            title=post.title,
            content=post.content,
            created_at=post.created_at.isoformat(),  # Convert datetime to string
            updated_at=post.updated_at.isoformat(),  # Convert datetime to string
            username=post.user.username,  # Assuming the User model has a 'username' field
            user_image=post.user.user_image if post.user.user_image else None, # Assuming the User model has a 'user_image' field
        )
        for post in posts
    ]

@router.get("/{post_id}", response_model=schemas.PostResponse)
def get_post(post_id: str, db: Session = Depends(database.get_db)):
    post = db.query(models.Post).options(joinedload(models.Post.user)).filter(models.Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

@router.put("/{post_id}", response_model=schemas.PostResponse)
def update_post(post_id: str, updated_post: schemas.PostCreate, db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    if post.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this post")

    post.title = updated_post.title
    post.content = updated_post.content
    db.commit()
    db.refresh(post)
    return post

@router.delete("/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(post_id: str, db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    if post.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this post")

    db.delete(post)
    db.commit()
    return

@router.get("/user/{user_id}", response_model=List[schemas.PostResponse])
def get_posts_by_user(user_id: str, db: Session = Depends(get_db)):
    posts = db.query(models.Post).filter(models.Post.user_id == user_id).all()
    if not posts:
        raise HTTPException(status_code=404, detail="No posts found for this user")
    
    return [
        schemas.PostResponse(
            id=str(post.id),  # Convert UUID to string
            title=post.title,
            content=post.content,
            created_at=post.created_at.isoformat(),
            updated_at=post.updated_at.isoformat(),
            username=post.user.username,  # Assuming the User model has a 'username' field
            user_image=post.user.user_image if post.user.user_image else None,  # Assuming the User model has a 'user_image' field
        )
        for post in posts
    ]
