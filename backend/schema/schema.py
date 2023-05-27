# build a schema using pydantic
from pydantic import BaseModel

class Pengguna(BaseModel):
    id_user:int
    username:str
    password:str

    class Config:
        orm_mode = True

class Tempat(BaseModel):
    id_place:int
    nama_tempat:str

    class Config:
        orm_mode = True

class Waktu_Tersedia(BaseModel):
    id:int
    id_place:int
    is_available:bool
    waktu:str

    class Config:
        orm_mode = True

class Book_Tempat(BaseModel):
    id:int
    id_place:int
    id_user:int
    id_waktu:int

    class Config:
        orm_mode = True
