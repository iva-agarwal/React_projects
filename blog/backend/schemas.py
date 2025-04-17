from pydantic import BaseModel, EmailStr, root_validator
from datetime import datetime
from typing import List, Optional

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    username: str
    user_image: Optional[str] = None  

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    email: EmailStr
    username: str
    user_image: Optional[str]
    created_at: datetime

    class Config:
        orm_mode = True

class PostCreate(BaseModel):
    title: str
    content: str

# PostResponse with datetime conversion
class PostResponse(BaseModel):
    id: str
    title: str
    content: str
    created_at: str  # Change to str (since datetime will be serialized to ISO8601 string)
    updated_at: str  # Change to str (since datetime will be serialized to ISO8601 string)
    username: str
    user_image: Optional[str]  # This allows user_image to be None

    @root_validator(pre=True)
    def convert_datetimes(cls, values):
        for field in ['created_at', 'updated_at']:
            if isinstance(values.get(field), datetime):
                values[field] = values[field].isoformat()  # Convert datetime to string in ISO format
        return values

    class Config:
        orm_mode = True  # This allows Pydantic to serialize ORM models
