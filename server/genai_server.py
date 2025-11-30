from fastapi import Depends, FastAPI, HTTPException, status, Request
import mysql.connector
from flask import Flask, request,render_template
from datetime import datetime, timedelta, timezone
from typing import Annotated
import jwt
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jwt.exceptions import InvalidTokenError
from pwdlib import PasswordHash
from pydantic import BaseModel

# to get a string like this run:
# openssl rand -hex 32
SECRET_KEY = "5bda3e59dcae360064cc1ccc8dec660e0517c5044eae96cbd845f8b285237579"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30




class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None


class User(BaseModel):
    username: str
    email: str | None = None
    full_name: str | None = None
    disabled: bool | None = None


class UserInDB(User):
    hashed_password: str


password_hash = PasswordHash.recommended()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


conn = mysql.connector.connect(host="final-5166-db.c41mcoeg0zsr.us-east-1.rds.amazonaws.com",user="finaluser",password="finalpassword",database="final")
print("Connection established successfully!")

app = FastAPI()



@app.get("/")
def test():
    return ("Hello World")


@app.get("/dashboard")
def dashboard_test():
    return ("Hello Dashboard")

@app.get('/users/list/')
def user_list():
    result_list=[]
    if conn.is_connected():
        cursor=conn.cursor()
        cursor.execute("select username from final.users")
        result=cursor.fetchall()
        for row in result:
            result_list.append(row)
        print (result_list)
        return(result_list)
    
@app.get('/login')
def validate_user(request: Request):
    username = request.query_params.get('username')
    password = request.query_params.get('password')
    if not username or not password:
        return {"status": "Error", "message": "Missing username or password query parameters"}

    if conn.is_connected():
        cursor = conn.cursor()
        print('connection')
        query = "select username from final.users where username=%s and password=%s"
        cursor.execute(query, (username, password))
        print('executed')
        result = cursor.fetchone()
        cursor.close()

        if result and len(result) > 0:
            return {"status": "Login Successful", "user_data": result[0]}
        else:
            return {"status": "Invalid username or password"}
    else:
        return {"status": "Error", "message": "Database connection failed"}



@app.get('/data/dataset1')
def user_list():
    result_list=[]
    if conn.is_connected():
        cursor=conn.cursor()
        cursor.execute("select * from final.dataset1")
        result=cursor.fetchall()
        for row in result:
            result_list.append(row)
        print (result_list)
        return(result_list)

           
@app.get('/data/dataset2')
def user_list():
    result_list=[]
    if conn.is_connected():
        cursor=conn.cursor()
        cursor.execute("select * from final.dataset2")
        result=cursor.fetchall()
        for row in result:
            result_list.append(row)
        print (result_list)
        return(result_list)
           

def verify_password(plain_password, hashed_password):
    return password_hash.verify(plain_password, hashed_password)


def get_password_hash(password):
    return password_hash.hash(password)


def get_user(db, username: str):
    if username in db:
        user_dict = db[username]
        return UserInDB(**user_dict)


def authenticate_user(fake_db, username: str, password: str):
    user = get_user(fake_db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except InvalidTokenError:
        raise credentials_exception
    user = get_user(fake_users_db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)],
):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


@app.post("/token")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> Token:
    user = authenticate_user(fake_users_db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")


@app.get("/users/me/", response_model=User)
async def read_users_me(
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    return current_user


@app.get("/users/me/items/")
async def read_own_items(
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    return [{"item_id": "Foo", "owner": current_user.username}]