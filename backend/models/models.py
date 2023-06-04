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
    is_admin = Column(Boolean)
    password = Column(VARCHAR(128))
    booking_waktus = relationship('Booking_Waktu', back_populates='user')
    #time_created = Column(DateTime(timezone=True), server_default=func.now())
    #time_updated = Column(DateTime(timezone=True), onupdate=func.now())

class Tempat(Base):
    __tablename__ = 'tempat'
    id_place = Column(Integer, primary_key=True)
    nama_tempat = Column(VARCHAR(128))
    waktu_tersedias = relationship('Waktu_Tersedia', back_populates='place')
    #time_created = Column(DateTime(timezone=True), server_default=func.now())
    #time_updated = Column(DateTime(timezone=True), onupdate=func.now())

class Waktu_Tersedia(Base):
    __tablename__ = 'waktu_tersedia'
    id = Column(Integer, primary_key=True)

    id_place = Column(Integer, ForeignKey('tempat.id_place'))
    place = relationship('Tempat', back_populates='waktu_tersedias')

    is_available = Column(Boolean)
    waktu = Column(DateTime(timezone=True))

    booking_waktus = relationship('Booking_Waktu', back_populates='waktu_tersedia')
    #time_created = Column(DateTime(timezone=True), server_default=func.now())
    #time_updated = Column(DateTime(timezone=True), onupdate=func.now())

class Booking_Waktu(Base):
    __tablename__ = 'booking_waktu'
    id = Column(Integer, primary_key=True)
    #id_place = Column(Integer, ForeignKey('tempat.id_place'))

    id_user = Column(Integer, ForeignKey('pengguna.id_user'))
    user = relationship('Pengguna', back_populates='booking_waktus')

    id_waktu = Column(Integer, ForeignKey('waktu_tersedia.id'))
    waktu_tersedia = relationship('Waktu_Tersedia', back_populates='booking_waktus')
    
    #time_created = Column(DateTime(timezone=True), server_default=func.now())
    #time_updated = Column(DateTime(timezone=True), onupdate=func.now())

class Buku(Base):
    __tablename__ = 'buku'
    id_buku = Column(Integer, primary_key=True)
    judul_buku = Column(VARCHAR(128))
    penulis = Column(VARCHAR(128))
    cover = Column(VARCHAR(128))
    stock = Column(Integer)

class PinjamBuku(Base):
    __tablename__ = 'pinjam_buku'
    id_pinjam = Column(Integer, primary_key=True)
    id_user = Column(Integer, ForeignKey('pengguna.id_user'))
    user = relationship('Pengguna')
    id_buku = Column(Integer, ForeignKey('buku.id_buku'))
    buku = relationship('Buku')

class admin(Base):
    __tablename__ = 'admin'
    id = Column(Integer, primary_key=True)
    full_name = Column(VARCHAR(128))
    email = Column(VARCHAR(128))
    password = Column(VARCHAR(128))