from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from database import get_db
import json
import csv
from io import StringIO
from datetime import datetime

router = APIRouter()

@router.post("/upload/json")
async def upload_json(file: UploadFile = File(...), source_type: str = "forum", db=Depends(get_db)):
    if not file.filename.endswith('.json'):
        raise HTTPException(status_code=400, detail="Only JSON files are allowed.")
    
    try:
        contents = await file.read()
        data = json.loads(contents)
        
        # Simple ingestion
        inserted_ids = []
        for item in data:
            item['source_type'] = source_type
            item['ingested_at'] = datetime.utcnow()
            result = await db.raw_data.insert_one(item)
            inserted_ids.append(str(result.inserted_id))
            
        return {"message": f"Successfully ingested {len(inserted_ids)} records.", "inserted": len(inserted_ids)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/upload/csv")
async def upload_csv(file: UploadFile = File(...), source_type: str = "credential", db=Depends(get_db)):
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="Only CSV files are allowed.")
    
    try:
        contents = await file.read()
        csv_data = contents.decode('utf-8')
        reader = csv.DictReader(StringIO(csv_data))
        
        inserted_ids = []
        for row in reader:
            row['source_type'] = source_type
            row['ingested_at'] = datetime.utcnow()
            result = await db.raw_data.insert_one(row)
            inserted_ids.append(str(result.inserted_id))
            
        return {"message": f"Successfully ingested {len(inserted_ids)} records.", "inserted": len(inserted_ids)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
