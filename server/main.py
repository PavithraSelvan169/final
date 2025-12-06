from fastapi import FastAPI, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import Base, User, Dataset1, Dataset2, Maturity
from auth import hash_password, verify_password, create_access_token, get_current_user
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS for Angular
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


class SignupRequest(BaseModel):
    username: str
    fullname: str
    password: str


class LoginRequest(BaseModel):
    username: str
    password: str


# -------------- SIGNUP -----------------
@app.post("/signup")
def signup(data: SignupRequest, db: Session = Depends(get_db)):
    print(data)
    exists = db.query(User).filter(User.username == data.username).first()
    if exists:
        raise HTTPException(status_code = 400, detail="User already exists")

    new_user = User(
        username = data.username,
        fullname = data.fullname,
        hashed_password = hash_password(data.password)
    )

    db.add(new_user)
    db.commit()

    return {"message": "User created successfully"}


# -------------- LOGIN -----------------
@app.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.username == data.username).first()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": user.username, "fullname": user.fullname})

    return {
        "access_token": token,
        "token_type": "bearer",
        "username": user.username,
        "fullname": user.fullname
    }


@app.get("/data/dataset1")
def get_dataset1(
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
    ):

    results = db.query(Dataset1).all()

    return [
        {"id": r.id, "implementation_strategy": r.implementation_strategy, "percentage": r.percentage}
        for r in results
    ]


@app.get("/data/dataset2")
def get_dataset2(
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
    ):

    results = db.query(Dataset2).all()

    return [
        {"id": r.id, "current_state_of_adoption": r.current_state_of_adoption, "percentage": r.percentage}
        for r in results
    ]


@app.get("/data/maturity")
def get_dataset2(
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
    ):

    results = db.query(Maturity).all()

    return [
        {"maturity_level": r.maturity_level, "period": r.period, "percentage": r.percentage}
        for r in results
    ]


# -------------- TEST ROUTE -----------------
@app.get("/")
def root():
    return {"status": "FastAPI Service is Running for GenAI Innovation Service.."}
