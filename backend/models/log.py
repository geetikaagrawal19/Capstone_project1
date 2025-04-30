import pandas as pd
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt
import seaborn as sns

df = pd.read_csv("C:\\Users\\archa\\.vscode\\Capstone project 2.0\\Capstone_project\\models\\cybercrime_forensic_dataset.csv")

df.fillna(df.mean(numeric_only=True), inplace=True)

df.dropna(subset=['Timestamp', 'Label'], inplace=True)

categorical_cols = ['Activity_Type', 'Action', 'Anomaly_Type']
label_encoders = {}
for col in categorical_cols:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    label_encoders[col] = le

df['Timestamp'] = pd.to_datetime(df['Timestamp'])
df['Hour'] = df['Timestamp'].dt.hour
df['Day'] = df['Timestamp'].dt.day
df.drop(columns=['Timestamp'], inplace=True)

df.drop(columns=['User_ID', 'IP_Address', 'File_Name', 'Resource_Accessed'], inplace=True)

df['Label_Encoded'] = df['Label'].apply(lambda x: 1 if x == 'Suspicious' else 0)

features = df.drop(columns=['Label', 'Label_Encoded'])
scaler = StandardScaler()
X_scaled = scaler.fit_transform(features)

X = X_scaled
y = df['Label_Encoded']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier(n_estimators=200, random_state=42)
model.fit(X_train, y_train)
preds_binary = model.predict(X_test)

print("Confusion Matrix:")
print(confusion_matrix(y_test, preds_binary))
print("\nClassification Report:")
print(classification_report(y_test, preds_binary))

sns.heatmap(confusion_matrix(y_test, preds_binary), annot=True, fmt="d", cmap="Blues")
plt.title("Confusion Matrix")
plt.xlabel("Predicted")
plt.ylabel("Actual")
plt.show()

import joblib
joblib.dump(model, 'rf_model.pkl')
joblib.dump(scaler, 'scaler.pkl')
joblib.dump(label_encoders, 'label_encoders.pkl')