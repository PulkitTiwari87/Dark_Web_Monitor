from typing import List, Dict

MONITORED_DOMAINS = [
    "example-corp.com",
    "contoso.com",
    "secure-bank.org"
]

def check_breaches(credential_records: List[Dict]) -> List[Dict]:
    """
    Checks leaked credentials against a list of monitored organizational domains.
    Generates alerts if a match is found.
    """
    alerts = []
    
    for record in credential_records:
        email = record.get("email", "")
        if "@" in email:
            domain = email.split("@")[1].lower()
            if domain in MONITORED_DOMAINS:
                alerts.append({
                    "title": f"Compromised Credential: {domain}",
                    "description": f"The email {email} was found in the {record.get('breach_source')} data dump.",
                    "severity": "Critical",
                    "recommended_action": "Force immediate password reset for the affected user and check for unauthorized access.",
                    "source_record_id": record.get("id"),
                    "timestamp": record.get("timestamp")
                })
                
    return alerts
