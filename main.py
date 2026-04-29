import pickle
import pandas as pd
import numpy as np
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

# Modeli yükle
with open("house_price_model.pkl", "rb") as f:
    data_pack = pickle.load(f)

model = data_pack["model"]
scaler = data_pack["scaler"]
neighborhood_means = data_pack["neighborhood_means"]
training_columns = data_pack["training_columns"]

class HouseData(BaseModel):
    neighborhood: str
    net_sqm: float
    rooms: str
    district: str

@app.post("/predict")
async def predict_price(data: HouseData):
    try:
        input_df = pd.DataFrame(0, index=[0], columns=training_columns)
        input_df["net_sqm"] = float(data.net_sqm)
        
        # 1. Oda Sayısı
        r_val = str(data.rooms)
        total = int(r_val.split('+')[0]) + int(r_val.split('+')[1]) if "+" in r_val else int(r_val)
        room_col = next((c for c in training_columns if "room" in c.lower() or "oda" in c.lower()), "total_rooms")
        input_df[room_col] = total
        
        # 2. Mahalle
        input_df["neighborhood_target"] = neighborhood_means.get(data.neighborhood.upper(), neighborhood_means.mean())
        
        # 3. İlçe (İşte burası kritik!)
        girdi = data.district.upper().strip()
        found = False
        for col in training_columns:
            # Modelin içindeki isimle senin yazdığını karşılaştırıyor (büyük/küçük harf bakmadan)
            if girdi in col.upper():
                input_df[col] = 1
                found = True
                print(f"✅ BULDUM! Eşleşen Sütun: {col}")
                break
        
        if not found:
            print(f"❌ BULAMADIM! Senin yazdığın: {girdi}")
            print(f"⚠️ Modelin beklediği bazı örnekler: {training_columns[10:20]}")

        # Tahmin
        input_scaled = scaler.transform(input_df)
        prediction = model.predict(input_scaled)[0]
        return {"price": int(prediction)}

    except Exception as e:
        return {"price": 0, "error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)