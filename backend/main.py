from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import connect_to_mongo, close_mongo_connection
from routes import auth, ingestion, analysis

app = FastAPI(title="Dark Web Monitoring & Intelligence API")

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_db_client():
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_db_client():
    await close_mongo_connection()

app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(ingestion.router, prefix="/api/ingest", tags=["Data Ingestion"])
app.include_router(analysis.router, prefix="/api/analysis", tags=["Threat Intelligence Analysis"])

@app.get("/")
def read_root():
    return {"message": "Dark Web Monitoring API is running."}
