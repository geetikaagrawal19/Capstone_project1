import pandas as pd

df = pd.read_csv("C:\\Users\\archa\\.vscode\\Capstone project 2.0\\Capstone_project\\models\\Malware dataset.csv")
print("📄 Dataset loaded successfully!")
print(df.head())

text_column = df.columns[0]
label_column = df.columns[2]

from sklearn.preprocessing import LabelEncoder

label_encoder = LabelEncoder()
df[label_column] = label_encoder.fit_transform(df[label_column])

X = df[df.drop(columns=[text_column,label_column],axis=1).columns]
y = df[label_column]
print(y.head())
print(X.head())

from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

from sklearn.ensemble import RandomForestClassifier

model=RandomForestClassifier(n_estimators=100,random_state=42)

model.fit(X_train, y_train)

from sklearn.metrics import classification_report, accuracy_score

y_pred = model.predict(X_test)
print("\n✅ Accuracy:", accuracy_score(y_test, y_pred))
print("\n📊 Classification Report:\n", classification_report(y_test, y_pred))

custom_docs = [
    "This document contains a malicious script that should be removed.",
    "Your invoice for last month's cloud usage is attached.",
    "Warning: ransomware detected in attachment."
]

'''custom_preds = model.predict(custom_docs)
for doc, label in zip(custom_docs, custom_preds):
    print(f"\n📄 \"{doc}\"\n➤ Prediction: {label}")'''

import joblib

joblib.dump(model, 'rf_malware_model.pkl')
joblib.dump(label_encoder, 'malware_label_encoder.pkl')
