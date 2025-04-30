import os
import sys
import json
import torch
import torch.nn as nn
from torchvision import transforms
from PIL import Image

# --- Model Definition ---
class SimpleCNN(nn.Module):
    def __init__(self):
        super(SimpleCNN, self).__init__()
        self.conv_block = nn.Sequential(
            nn.Conv2d(3, 16, 3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),
            nn.Conv2d(16, 32, 3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),
        )
        self.fc = nn.Sequential(
            nn.Flatten(),
            nn.Linear(32 * 32 * 32, 128),
            nn.ReLU(),
            nn.Linear(128, 2)
        )

    def forward(self, x):
        x = self.conv_block(x)
        x = self.fc(x)
        return x

# --- Load Model ---
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = SimpleCNN().to(device)

model_path = os.path.join(os.path.dirname(__file__), "cnn_stego_model.pth")
try:
    model.load_state_dict(torch.load(model_path, map_location=device))
    model.eval()
except Exception as e:
    print(json.dumps({"error": f"Failed to load model: {str(e)}"}))
    sys.exit(1)

# --- Read Input ---
try:
    input_data = json.loads(sys.stdin.read())
    image_path = input_data["image_path"]
    img = Image.open(image_path).convert('RGB')
except Exception as e:
    print(json.dumps({"error": f"Failed to read input: {str(e)}"}))
    sys.exit(1)

# --- Image Transform ---
transform = transforms.Compose([
    transforms.Resize((128, 128)),
    transforms.ToTensor(),
])

img_tensor = transform(img).unsqueeze(0).to(device)

# --- Predict ---
with torch.no_grad():
    output = model(img_tensor)
    predicted_class = torch.argmax(output, 1).item()

label_map = {0: "clean", 1: "stego"}
print(json.dumps({"prediction": label_map[predicted_class]}))
