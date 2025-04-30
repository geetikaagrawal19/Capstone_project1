import sys
import json
import joblib
import pandas as pd

# Load model and encoder
model = joblib.load('C:/Users/archa/.vscode/Capstone project 2.0/Capstone_project/backend/models/rf_malware_model.pkl')
label_encoder = joblib.load('C:/Users/archa/.vscode/Capstone project 2.0/Capstone_project/backend/models/malware_label_encoder.pkl')

# Read input from Node
input_data = json.loads(sys.stdin.read())
df = pd.DataFrame([input_data])

# Predict
pred = model.predict(df)[0]
label = label_encoder.inverse_transform([pred])[0]
print(label)
