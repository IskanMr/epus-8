from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Float, VARCHAR, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

Base  = declarative_base()
"""
class Book(Base):
    __tablename__ = 'book'
    id  = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    rating = Column(Float)
    time_created = Column(DateTime(timezone=True), server_default=func.now())
    time_updated = Column(DateTime(timezone=True), onupdate=func.now())
    author_id = Column(Integer, ForeignKey('author.id'))

    author = relationship('Author')

    class Author(Base):
    __tablename__ = 'author'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    age = Column(Integer)
    time_created = Column(DateTime(timezone=True), server_default=func.now())
    time_updated = Column(DateTime(timezone=True), onupdate=func.now())
"""
#Room Booking DB Model

class Pengguna(Base):
    __tablename__ = 'pengguna'
    id_user = Column(Integer, primary_key=True)
    username = Column(VARCHAR(128))
    password = Column(VARCHAR(128))
    #time_created = Column(DateTime(timezone=True), server_default=func.now())
    #time_updated = Column(DateTime(timezone=True), onupdate=func.now())

class Tempat(Base):
    __tablename__ = 'tempat'
    id_place = Column(Integer, primary_key=True)
    nama_tempat = Column(VARCHAR(128))
    #time_created = Column(DateTime(timezone=True), server_default=func.now())
    #time_updated = Column(DateTime(timezone=True), onupdate=func.now())

class Waktu_Tersedia(Base):
    __tablename__ = 'waktu_tersedia'
    id = Column(Integer, primary_key=True)
    id_place = Column(Integer, ForeignKey('tempat.id_place'))
    place = relationship('Tempat')
    is_available = Column(Boolean)
    waktu = Column(DateTime(timezone=True))
    #time_created = Column(DateTime(timezone=True), server_default=func.now())
    #time_updated = Column(DateTime(timezone=True), onupdate=func.now())

class Book_Tempat(Base):
    __tablename__ = 'pengguna_tempat'
    id = Column(Integer, primary_key=True)
    id_place = Column(Integer, ForeignKey('tempat.id_place'))

    id_user = Column(Integer, ForeignKey('pengguna.id_user'))
    user = relationship('Pengguna')

    id_waktu = Column(Integer, ForeignKey('waktu_tersedia.id'))
    waktu = relationship('Waktu_Tersedia')
    
    #time_created = Column(DateTime(timezone=True), server_default=func.now())
    #time_updated = Column(DateTime(timezone=True), onupdate=func.now())



