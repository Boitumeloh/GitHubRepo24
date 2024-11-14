import sys
import json
import spacy
import re

# Load the spaCy model
nlp = spacy.load("en_core_web_sm")

def generate_summary(text):
    # Process the text with spaCy NER
    doc = nlp(text)
    
    summary = {
        "clientName": "",
        "premium": "",
        "franchise": "",
        "hazard": "",
        "accidentInsurance": "",
        "freeDoctorChoice": ""
    }
    
    # Extract client name and clean it
    for ent in doc.ents:
        if ent.label_ == "PERSON" and not summary["clientName"]:
            summary["clientName"] = ent.text.strip()  # .strip() removes leading/trailing whitespace or newlines
    
    # Use regular expressions to find premium and franchise
    premium_match = re.search(r"Premium:\s*\$?(\d+)", text)
    franchise_match = re.search(r"Franchise:\s*\$?(\d+)", text)
    
    if premium_match:
        summary["premium"] = premium_match.group(1)
    if franchise_match:
        summary["franchise"] = franchise_match.group(1)

    # Keyword matching for other fields
    text_lower = text.lower()

    # Accident insurance coverage
    if "accident insurance" in text_lower:
        summary["accidentInsurance"] = "Covered"
    else:
        summary["accidentInsurance"] = "Not Covered"

    # Free doctor choice
    if "free doctor choice" in text_lower:
        summary["freeDoctorChoice"] = "Yes"
    else:
        summary["freeDoctorChoice"] = "No"

    # Check for hazards like fire, theft, etc.
    if "fire" in text_lower or "theft" in text_lower or "natural disasters" in text_lower:
        summary["hazard"] = "Fire, Theft, and Natural Disasters"

    # Return the structured summary
    return summary

# Read text input from Node.js
input_text = sys.stdin.read()
summary = generate_summary(input_text)

# Print the summary as a JSON string to pass back to Node.js
print(json.dumps(summary))
