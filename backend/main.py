import uvicorn
from fastapi import FastAPI
from fastapi_sqlalchemy import DBSessionMiddleware, db

from models.models import Pengguna as PenggunaModel, Tempat as TempatModel, Waktu_Tersedia as Waktu_TersediaModel, Book_Tempat as Book_TempatModel
from schema.schema import Pengguna as PenggunaSchema, Tempat as TempatSchema, Waktu_Tersedia as Waktu_TersediaSchema, Book_Tempat as Book_TempatSchema

import os
from dotenv import load_dotenv

load_dotenv('.env')


app = FastAPI()

# to avoid csrftokenError
app.add_middleware(DBSessionMiddleware, db_url=os.environ['DATABASE_URL'])

@app.get("/")
async def root():
    return {"message": "hello world"}

@app.post("/pengguna/")
async def create_pengguna(pengguna: PenggunaSchema, response_model=PenggunaSchema):
    db_pengguna = PenggunaModel(username=pengguna.username, password=pengguna.password)
    db.session.add(db_pengguna)
    db.session.commit()
    return db_pengguna

@app.post("/tempat/")
async def create_tempat(tempat: TempatSchema, response_model=TempatSchema):
    db_tempat = TempatModel(nama_tempat=tempat.nama_tempat)
    db.session.add(db_tempat)
    db.session.commit()
    return db_tempat

@app.get("/tempat/")
async def get_all_tempat():
    return db.session.query(TempatModel).all()

@app.post("/waktu_tersedia/")
async def create_waktu_tersedia(waktu_tersedia: Waktu_TersediaSchema, response_model=Waktu_TersediaSchema):
    db_waktu_tersedia = Waktu_TersediaModel(id_place=waktu_tersedia.id_place, is_available=waktu_tersedia.is_available, waktu=waktu_tersedia.waktu)
    db.session.add(db_waktu_tersedia)
    db.session.commit()
    return db_waktu_tersedia

@app.post("/book_tempat/")
async def create_book_tempat(book_tempat: Book_TempatSchema, response_model=Book_TempatSchema):
    db_book_tempat = Book_TempatModel(id_place=book_tempat.id_place, id_user=book_tempat.id_user, id_waktu=book_tempat.id_waktu)
    db.session.add(db_book_tempat)
    db.session.commit()
    return db_book_tempat

@app.get("/book_tempat/{user_id}")
async def get_book_tempat(user_id: int):
    return db.session.query(Book_TempatModel).filter(Book_TempatModel.id_user == user_id).all()

@app.delete("/book_tempat/{id}")
async def delete_book_tempat(id: int):
    db.session.query(Book_TempatModel).filter(Book_TempatModel.id == id).delete()
    db.session.commit()
    return {"message": "deleted"}




# To run locally
if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)