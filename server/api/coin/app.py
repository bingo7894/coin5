from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
from PIL import Image
import io
import uvicorn

app = FastAPI()

# อนุญาตให้ frontend เรียก API ได้ (เปลี่ยน origin ตาม URL frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # สำหรับทดสอบ ใช้ "*" ได้
    allow_methods=["*"],
    allow_headers=["*"],
)

# โหลดโมเดล YOLOv8
model = YOLO("best.pt")

@app.post("/api/process-image")
async def process_image(file: UploadFile = File(...)):
    # อ่านไฟล์ภาพเป็น bytes
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")

    # รันตรวจจับ
    results = model(image)

    # แปลงผลลัพธ์ให้เข้าใจง่าย
    detections = []
    for result in results:
        for box, cls, conf in zip(result.boxes.xyxy, result.boxes.cls, result.boxes.conf):
            detections.append({
                "bbox": box.tolist(),
                "class_id": int(cls.item()),
                "confidence": float(conf.item()),
                "class_name": model.names[int(cls.item())]
            })

    return {"detections": detections}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
