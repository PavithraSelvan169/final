from sqlalchemy import Column, Integer, String
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True)
    fullname = Column(String(200), unique=False)
    hashed_password = Column(String(255))

class Dataset1(Base):
    __tablename__ = "dataset1"

    id = Column(Integer, primary_key=True, index=True)
    implementation_strategy = Column(String(200), unique=False)
    percentage = Column(Integer)


class Dataset2(Base):
    __tablename__ = "dataset2"

    id = Column(Integer, primary_key=True, index=True)
    current_state_of_adoption = Column(String(200), unique=False)
    percentage = Column(Integer)


class Maturity(Base):
    __tablename__ = "maturity_prediction"
    
    id = Column(Integer, primary_key=True, index=True)
    maturity_level = Column(String(10), unique=False)
    period = Column(String(25), unique=False)
    percentage = Column(Integer)