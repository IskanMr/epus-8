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


class Administrator(Base):
    __tablename__ = 'administrator'
    id_user = Column(Integer, primary_key=True)
    kode_user = Column(VARCHAR(255))
    nis = Column(VARCHAR(255))
    fullname = Column(VARCHAR(255))
    username = Column(VARCHAR(255))
    password = Column(VARCHAR(255))
    kelas = Column(VARCHAR(255))
    alamat = Column(VARCHAR(255))
    verif = Column(VARCHAR(255))
    role = Column(VARCHAR(255))
    join_date = Column(VARCHAR(255))
    terakhir_login = Column(VARCHAR(255))

class Authors(Base):
    __tablename__ = 'authors'
    id = Column(Integer, primary_key=True)
    name = Column(VARCHAR(255))

class Books(Base):
    __tablename__ = 'books'
    id = Column(Integer, primary_key=True)
    title = Column(VARCHAR(255))
    author_id = Column(Integer, ForeignKey('authors.id'))
    author = relationship('Authors')
    description = Column(VARCHAR(255))
    category_id = Column(Integer, ForeignKey('categories.id'))
    cover = Column(VARCHAR(255))
    file = Column(VARCHAR(255))
    stock = Column(Integer, default=1)
    year_published = Column(VARCHAR(255))
    isbn = Column(Integer)
    publisher_id = Column(Integer, ForeignKey('publisher.id_penerbit'))

class Categories(Base):
    __tablename__ = 'categories'
    id = Column(Integer, primary_key=True)
    name = Column(VARCHAR(255))

class Publisher(Base):
    __tablename__ = 'publisher'
    id_penerbit = Column(Integer, primary_key=True)
    kode_penerbit = Column(VARCHAR(255))
    nama_penerbit = Column(VARCHAR(255))
    verif_penerbit = Column(VARCHAR(255))

class Identity(Base):
    __tablename__ = 'identity'
    id_identitas = Column(Integer, primary_key=True)
    nama_app = Column(VARCHAR(255))
    alamat_app = Column(VARCHAR(255))
    email_app = Column(VARCHAR(255))
    nomor_hp = Column(VARCHAR(255))

class TbTransaksi(Base):
    __tablename__ = 'tb_transaksi'
    id_transaksi = Column(Integer, primary_key=True)
    id_books = Column(Integer, ForeignKey('books.id'))
    id_user = Column(Integer, ForeignKey('pengguna.id_user'))
    tgl_pinjam = Column(VARCHAR(255))
    tgl_kembali = Column(VARCHAR(255))
    status = Column(VARCHAR(255))

    



