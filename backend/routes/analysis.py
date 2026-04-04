import sys
import os
from fastapi import APIRouter, Depends, HTTPException
from database import get_db
import traceback

# Add ml-models to python path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..', 'ml-models'))
try:
    from nlp_engine import extract_entities
    from threat_scorer import analyze_threat
    from breach_detector import check_breaches
except ImportError as e:
    print(f"Error importing ML modules: {e}")

router = APIRouter()

@router.post("/process/chatter")
async def process_chatter(db=Depends(get_db)):
    """
    Iterates over unanalyzed forum and marketplace data, extracts entities, 
    scores the threat, and saves the intelligence back.
    """
    try:
        # Find raw records that haven't been analyzed yet
        cursor = db.raw_data.find({"source_type": {"$in": ["forum", "marketplace"]}, "analyzed": {"$ne": True}})
        records = await cursor.to_list(length=100)
        
        processed_count = 0
        for record in records:
            content = record.get("content", "") or record.get("description", "")
            
            entities = extract_entities(content)
            threat_analysis = analyze_threat(content, entities)
            
            intelligence = {
                "raw_id": str(record["_id"]),
                "source_type": record["source_type"],
                "actor": record.get("actor") or record.get("vendor"),
                "content": content,
                "extracted_entities": entities,
                "threat_score": threat_analysis,
                "severity": threat_analysis["severity"],
                "timestamp": record.get("timestamp")
            }
            
            await db.intelligence.insert_one(intelligence)
            await db.raw_data.update_one({"_id": record["_id"]}, {"$set": {"analyzed": True}})
            
            # If critical or targeted, generate an alert
            if threat_analysis["severity"] in ["High", "Critical"]:
                alert = {
                    "title": f"High Threat Chatter Detected by {intelligence['actor']}",
                    "description": f"Detected chatter: {content[:100]}...",
                    "severity": threat_analysis["severity"],
                    "recommended_action": "Investigate extracted entities and closely monitor actor activity.",
                    "timestamp": record.get("timestamp")
                }
                await db.alerts.insert_one(alert)
                
            processed_count += 1
            
        return {"message": f"Processed {processed_count} chatter records."}
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/process/credentials")
async def process_credentials(db=Depends(get_db)):
    """
    Processes unanalyzed leaked credentials against monitored domains.
    """
    try:
        cursor = db.raw_data.find({"source_type": "credential", "analyzed": {"$ne": True}})
        records = await cursor.to_list(length=1000)
        
        alerts_generated = check_breaches(records)
        for alert in alerts_generated:
            await db.alerts.insert_one(alert)
            
        # Mark as analyzed
        record_ids = [r["_id"] for r in records]
        if record_ids:
            await db.raw_data.update_many({"_id": {"$in": record_ids}}, {"$set": {"analyzed": True}})
            
        return {"message": f"Processed {len(records)} credentials. Generated {len(alerts_generated)} alerts."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/dashboard/stats")
async def get_dashboard_stats(db=Depends(get_db)):
    """
    Returns aggregated stats for the dashboard.
    """
    total_intel = await db.intelligence.count_documents({})
    critical_alerts = await db.alerts.count_documents({"severity": "Critical"})
    total_leaks = await db.raw_data.count_documents({"source_type": "credential"})
    
    # Aggregation for severity chart
    pipeline = [{"$group": {"_id": "$severity", "count": {"$sum": 1}}}]
    severity_counts = await db.intelligence.aggregate(pipeline).to_list(length=10)
    severity_chart = {item["_id"]: item["count"] for item in severity_counts}
    
    # Get recent alerts
    recent_alerts = await db.alerts.find().sort("_id", -1).limit(5).to_list(length=5)
    for alert in recent_alerts:
        alert["_id"] = str(alert["_id"])
        
    return {
        "total_intel": total_intel,
        "critical_alerts": critical_alerts,
        "total_leaks": total_leaks,
        "severity_breakdown": severity_chart,
        "recent_alerts": recent_alerts
    }
