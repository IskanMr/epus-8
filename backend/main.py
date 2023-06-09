import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi_sqlalchemy import DBSessionMiddleware, db
from fastapi.middleware.cors import CORSMiddleware

from models.models import Pengguna as PenggunaModel, Tempat as TempatModel, Waktu_Tersedia as Waktu_TersediaModel, Booking_Waktu as Booking_WaktuModel
from schema.schema import Pengguna as PenggunaSchema, Tempat as TempatSchema, Waktu_Tersedia as Waktu_TersediaSchema, Booking_Waktu as Booking_WaktuSchema, PenggunaWithID as PenggunaWithIDSchema

import os
from dotenv import load_dotenv

load_dotenv('.env')


app = FastAPI()

# to avoid csrftokenError
app.add_middleware(DBSessionMiddleware, db_url=os.environ['DATABASE_URL'])

# Configure CORS
origins = [
    "http://localhost:3000",  # Replace with the allowed origin(s) for your application,
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Content-Type"],
)

@app.get("/")
async def root():
    return {"message": "hello world"}

@app.post("/pengguna/")#,, response_model=PenggunaSchema)
async def create_pengguna(pengguna: PenggunaSchema):
    try:
        db_pengguna = PenggunaModel(username=pengguna.username, password=pengguna.password, is_admin=False)
        #check if username already exist
        if db.session.query(PenggunaModel).filter(PenggunaModel.username == pengguna.username).first() is not None:
            raise HTTPException(status_code=400, detail="Username already exist")
        db.session.add(db_pengguna)
        db.session.commit()
        #get user_id values
        print(db_pengguna.id_user)
        return db_pengguna
    except Exception as e:
        print(e)
        if e is HTTPException:
            raise HTTPException(status_code=400, detail=e.detail)
        else:
            raise HTTPException(status_code=400, detail=str(e))

@app.post("/pengguna/admin")#,, response_model=PenggunaSchema)
async def create_pengguna(pengguna: PenggunaSchema):
    try:
        db_pengguna = PenggunaModel(username=pengguna.username, password=pengguna.password, is_admin=True)
        #check if username already exist
        if db.session.query(PenggunaModel).filter(PenggunaModel.username == pengguna.username).first() is not None:
            raise HTTPException(status_code=400, detail="Username already exist")
        db.session.add(db_pengguna)
        db.session.commit()
        #get user_id values
        print(db_pengguna.id_user)
        return db_pengguna
    except Exception as e:
        print(e)
        if e is HTTPException:
            raise HTTPException(status_code=400, detail=e.detail)
        else:
            raise HTTPException(status_code=400, detail=str(e))
        
@app.post("/pengguna/login/")#, response_model=PenggunaWithIDSchema)
async def login_pengguna(pengguna: PenggunaSchema):
    try:
        db_pengguna = db.session.query(PenggunaModel).filter(PenggunaModel.username == pengguna.username).first()
        if db_pengguna is None:
            raise HTTPException(status_code=400, detail="Username not found")
        if db_pengguna.password == pengguna.password:
            return db_pengguna
        raise HTTPException(status_code=400, detail="Wrong password")
    except Exception as e:
        print(e)
        if e is HTTPException:
            raise HTTPException(status_code=400, detail=e.detail)
        else:
            raise HTTPException(status_code=400, detail=str(e))

@app.post("/pengguna/logout/")
async def logout_pengguna(pengguna: PenggunaSchema):
    db_pengguna = db.session.query(PenggunaModel).filter(PenggunaModel.username == pengguna.username).first()
    if db_pengguna is None:
        return {"message": "not found"}
    return {"message": "logout success"}


@app.delete("/pengguna/{id_user}")
async def delete_pengguna(id_user: int):
    try:
        db_pengguna = db.session.query(PenggunaModel).filter(PenggunaModel.id_user == id_user).first()
        #if not found
        if db_pengguna is None:
            return {"message": "not found"}
        db.session.delete(db_pengguna)
        db.session.commit()
        return db_pengguna
    except Exception as e:
        print(e)
        if e is HTTPException:
            raise HTTPException(status_code=400, detail=e.detail)
        else:
            raise HTTPException(status_code=400, detail=str(e))

@app.post("/tempat/")#,, response_model=TempatSchema)
async def create_tempat(tempat: TempatSchema):
    try:
        db_tempat = TempatModel(nama_tempat=tempat.nama_tempat)
        db.session.add(db_tempat)
        db.session.commit()
        print(db_tempat.id_place)
        return db_tempat
    except Exception as e:
        print(e)
        if e is HTTPException:
            raise HTTPException(status_code=400, detail=e.detail)
        else:
            raise HTTPException(status_code=400, detail=str(e))
        
@app.delete("/tempat/{id_place}")
async def delete_tempat(id_place: int):
    try:
        db_tempat = db.session.query(TempatModel).filter(TempatModel.id_place == id_place).first()
        if db_tempat is None:
            return {"message": "not found"}
        db.session.delete(db_tempat)
        db.session.commit()
        return db_tempat
    except Exception as e:
        print(e)
        if e is HTTPException:
            raise HTTPException(status_code=400, detail=e.detail)
        else:
            raise HTTPException(status_code=400, detail=str(e))

@app.get("/tempat/")
async def get_all_tempat():
    return db.session.query(TempatModel).all()

@app.post("/waktu_tersedia/")#, response_model=Waktu_TersediaSchema)
async def create_waktu_tersedia(waktu_tersedia: Waktu_TersediaSchema):
    try:
        db_waktu_tersedia = Waktu_TersediaModel(id_place=waktu_tersedia.id_place, is_available=waktu_tersedia.is_available, waktu=waktu_tersedia.waktu)
        db.session.add(db_waktu_tersedia)
        db.session.commit()
        print(db_waktu_tersedia.id)
        return db_waktu_tersedia
    except Exception as e:
        print(e)
        if e is HTTPException:
            raise HTTPException(status_code=400, detail=e.detail)
        else:
            raise HTTPException(status_code=400, detail=str(e))

@app.get("/waktu_tersedia/{id_place}")
async def get_waktu_tersedia(id_place: int):

    results= db.session.query(Waktu_TersediaModel).filter(Waktu_TersediaModel.id_place == id_place).all()
    return results

@app.delete("/waktu_tersedia/{id_waktu}")
async def delete_waktu_tersedia(id_waktu: int):
    try:
        db_waktu_tersedia = db.session.query(Waktu_TersediaModel).filter(Waktu_TersediaModel.id == id_waktu).first()
        if db_waktu_tersedia is None:
            return {"message": "not found"}
        db.session.delete(db_waktu_tersedia)
        db.session.commit()
        return {"message": "deleted"}
    except Exception as e:
        print(e)
        if e is HTTPException:
            raise HTTPException(status_code=400, detail=e.detail)
        else:
            raise HTTPException(status_code=400, detail=str(e))

@app.post("/booking_waktu/")#,, response_model=Booking_WaktuSchema)
async def create_booking_waktu(booking_waktu: Booking_WaktuSchema):
    try:
        db_booking_waktu = Booking_WaktuModel(id_user=booking_waktu.id_user, id_waktu=booking_waktu.id_waktu)
        db.session.add(db_booking_waktu)
        db.session.commit()
        #set waktu tersedia menjadi tidak tersedia
        db_waktu_tersedia = db.session.query(Waktu_TersediaModel).filter(Waktu_TersediaModel.id == booking_waktu.id_waktu).first()
        db_waktu_tersedia.is_available = False
        db.session.commit()
        print(db_booking_waktu.id)
        return db_booking_waktu
    except Exception as e:
        print(e)
        if e is HTTPException:
            raise HTTPException(status_code=400, detail=e.detail)
        else:
            raise HTTPException(status_code=400, detail=str(e))

@app.delete("/booking_waktu/{id_booking_waktu}")
async def delete_booking_waktu(id_booking_waktu: int):
    try:
        #set dahulu waktu tersedia menjadi tersedia
        db_booking_waktu = db.session.query(Booking_WaktuModel).filter(Booking_WaktuModel.id == id_booking_waktu).first()
        db_waktu_tersedia = db.session.query(Waktu_TersediaModel).filter(Waktu_TersediaModel.id == db_booking_waktu.id_waktu).first()
        db_waktu_tersedia.is_available = True
        db.session.commit()
        #delete booking waktu
        db.session.query(Booking_WaktuModel).filter(Booking_WaktuModel.id == id_booking_waktu).delete()
        db.session.commit()
    
        return {"message": "deleted"}
    except Exception as e:
        print(e)
        if e is HTTPException:
            raise HTTPException(status_code=400, detail=e.detail)
        else:
            raise HTTPException(status_code=400, detail=str(e))

@app.get("/booking_waktu/user/{id_user}")
async def get_booking_waktu(id_user: int):
    results= db.session.query(Booking_WaktuModel).filter(Booking_WaktuModel.id_user == id_user).join(Waktu_TersediaModel, Booking_WaktuModel.id_waktu == Waktu_TersediaModel.id).join(TempatModel, Waktu_TersediaModel.id_place == TempatModel.id_place).all()
    for result in results:
        print(result.waktu_tersedia.id_place)
        print(result.waktu_tersedia.place.nama_tempat)
    return results



# To run locally
if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=1945)