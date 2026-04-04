from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from database import get_db
from models import UserCreate, UserResponse, Token, UserInDB
from auth_utils import get_password_hash, verify_password, create_access_token
from config import settings
from datetime import timedelta
import uuid

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

@router.post("/signup", response_model=UserResponse)
async def signup(user: UserCreate, db=Depends(get_db)):
    try:
        if await db.users.find_one({"username": user.username}):
            raise HTTPException(status_code=400, detail="Username already registered")
        
        hashed_password = get_password_hash(user.password)
        # Use model_dump for Pydantic V2 compatibility
        user_dict = user.model_dump() if hasattr(user, 'model_dump') else user.dict()
        user_dict["hashed_password"] = hashed_password
        user_dict["id"] = str(uuid.uuid4())
        del user_dict["password"]
        
        await db.users.insert_one(user_dict)
        
        # MongoDB injects `_id` which might fail Pydantic strict validation if passed back
        if "_id" in user_dict:
            del user_dict["_id"]
            
        return UserResponse(**user_dict)
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=400, detail=f"Backend Error: {str(e)}")

@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db=Depends(get_db)):
    user_dict = await db.users.find_one({"username": form_data.username})
    if not user_dict or not verify_password(form_data.password, user_dict["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user_dict["username"], "role": user_dict["role"], "email": user_dict.get("email", "")}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
