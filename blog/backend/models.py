import uuid
from sqlalchemy import Column, String, DateTime,ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID 
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key= True, index=True,  default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True, index= True, nullable=False)
    password = Column( String, nullable=False)
    created_at = Column(DateTime , default=datetime.utcnow)
    username = Column(String, unique=True, nullable=False) 
    user_image = Column(String, nullable=True) 
    posts = relationship("Post", back_populates="user")

class Post(Base):
    __tablename__ = "posts"

    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, index=True)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)  # Added `updated_at`

    user_id = Column(String, ForeignKey("users.id"))
    user = relationship("User", back_populates="posts")
