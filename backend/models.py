from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class UserBase(BaseModel):
    username: str
    email: EmailStr
    role: str = "analyst"

class UserCreate(UserBase):
    password: str

class UserInDB(UserBase):
    id: str
    hashed_password: str

class UserResponse(UserBase):
    id: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class ThreatEntity(BaseModel):
    id: str
    source_type: str  # forum, marketplace, credential
    content: str
    actor: Optional[str] = None
    extracted_entities: dict = {}
    severity_score: str = "Low"
    timestamp: datetime
    
class Alert(BaseModel):
    id: str
    title: str
    description: str
    severity: str
    recommended_action: str
    timestamp: datetime
