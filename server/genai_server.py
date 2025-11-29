from fastapi import FastAPI, Request
import mysql.connector
from flask import Flask, request,render_template


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
           