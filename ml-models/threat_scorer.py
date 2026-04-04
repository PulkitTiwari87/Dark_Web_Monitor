def analyze_threat(text: str, extracted_entities: dict) -> dict:
    """
    Analyzes text and entities to produce a severity score and matched keywords.
    """
    content_lower = text.lower()
    
    critical_keywords = ['zero-day', '0-day', 'ransomware', 'cve-', 'root access', 'admin access', 'botnet']
    high_keywords = ['leak', 'dump', 'breach', 'exploit', 'phishing', 'rce', 'sql injection', 'ddos']
    medium_keywords = ['vulnerability', 'bypass', 'scam', 'credential', 'password']
    
    matched_critical = [kw for kw in critical_keywords if kw in content_lower]
    matched_high = [kw for kw in high_keywords if kw in content_lower]
    matched_medium = [kw for kw in medium_keywords if kw in content_lower]
    
    score = 0
    severity = "Low"
    
    # Base scoring
    score += len(matched_critical) * 10
    score += len(matched_high) * 5
    score += len(matched_medium) * 2
    
    # Entity based multipliers (if targets are specified)
    if extracted_entities.get("organizations") or extracted_entities.get("domains"):
        score += 5 # targeted attack
        
    if score >= 15:
        severity = "Critical"
    elif score >= 8:
        severity = "High"
    elif score >= 3:
        severity = "Medium"
        
    return {
        "severity": severity,
        "score": score,
        "matched_keywords": {
            "critical": matched_critical,
            "high": matched_high,
            "medium": matched_medium
        }
    }
