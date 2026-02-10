from sqlalchemy import Column, Integer, String
from backend.db.pgdatabase import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    full_name = Column(String)
    photo_path = Column(String)
    role = Column(String, default="user")  # admin / user
