from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import List, Optional

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    email: EmailStr
    created_at: datetime

    class Config:
        orm_mode = True


class PostCreate(BaseModel):
    title: str
    content: str


class PostResponse(BaseModel):
    id: str
    title: str
    content: str
    created_at: datetime
    author: UserResponse  # include user info in post response

    class Config:
        orm_mode = True
