import sys
import json
import joblib
import numpy as np
import pandas as pd

# Load model and tools
model = joblib.load('C:/Users/archa/.vscode/Capstone project 2.0/Capstone_project/backend/models/rf_model.pkl')
scaler = joblib.load('C:/Users/archa/.vscode/Capstone project 2.0/Capstone_project/backend/models/scaler.pkl')
label_encoders = joblib.load('C:/Users/archa/.vscode/Capstone project 2.0/Capstone_project/backend/models/label_encoders.pkl')

# Fake input when running manually
if sys.stdin.isatty():
    data = {
        "Activity_Type": "Login",
        "Action": "Success",
        "Anomaly_Type": "None",
        "Timestamp": "2024-04-25T10:00:00",
        "User_ID": "1234",
        "IP_Address": "192.168.1.1",
        "File_Name": "file.txt",
        "Resource_Accessed": "resource"
    }
else:
    data = json.loads(sys.stdin.read())

df = pd.DataFrame([data])

# Process like training
for col in ['Activity_Type', 'Action', 'Anomaly_Type']:
    le = label_encoders[col]
    df[col] = le.transform(df[col])

df['Timestamp'] = pd.to_datetime(df['Timestamp'])
df['Hour'] = df['Timestamp'].dt.hour
df['Day'] = df['Timestamp'].dt.day
df.drop(columns=['Timestamp'], inplace=True)

df.drop(columns=['User_ID', 'IP_Address', 'File_Name', 'Resource_Accessed'], inplace=True)

# Scale
X_scaled = scaler.transform(df)

# Predict
pred = model.predict(X_scaled)[0]
print(int(pred))
