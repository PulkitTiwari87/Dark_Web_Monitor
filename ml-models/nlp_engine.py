import spacy
import re
from typing import Dict, List

# Load the English NLP model. Note: require python -m spacy download en_core_web_sm
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    import spacy.cli
    spacy.cli.download("en_core_web_sm")
    nlp = spacy.load("en_core_web_sm")

def extract_entities(text: str) -> Dict[str, List[str]]:
    """
    Extracts traditional NLP entities (ORG, GPE, PERSON) and regex-based cyber entities (IPs, Emails, Domains).
    """
    doc = nlp(text)
    
    entities = {
        "organizations": [],
        "locations": [],
        "people": [],
        "emails": [],
        "domains": [],
        "crypto_addresses": []
    }
    
    # NLP Entities
    for ent in doc.ents:
        if ent.label_ == "ORG":
            entities["organizations"].append(ent.text)
        elif ent.label_ == "GPE":
            entities["locations"].append(ent.text)
        elif ent.label_ == "PERSON":
            entities["people"].append(ent.text)
            
    # Regex for Cyber Entities
    email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
    domain_pattern = r'(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}'
    btc_pattern = r'\b[13][a-km-zA-HJ-NP-Z1-9]{25,34}\b' # simplistic BTC regex
    
    entities["emails"] = re.findall(email_pattern, text)
    entities["domains"] = re.findall(domain_pattern, text)
    entities["crypto_addresses"] = re.findall(btc_pattern, text)
    
    # Deduplicate
    for k in entities.keys():
        entities[k] = list(set(entities[k]))
        
    return entities
