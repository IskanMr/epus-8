# build a schema using pydantic
from pydantic import BaseModel
from datetime import datetime

class Pengguna(BaseModel):
    username:str
    password:str

    class Config:
        orm_mode = True

class Tempat(BaseModel):
    nama_tempat:str

    class Config:
        orm_mode = True

class Waktu_Tersedia(BaseModel):
    id_place:int
    is_available:bool = True
    waktu:datetime

    class Config:
        orm_mode = True

class Booking_Waktu(BaseModel):
    id_user:int
    id_waktu:int

    class Config:
        orm_mode = True
