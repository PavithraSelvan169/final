cd /apps/server/
source ./py313_env/bin/activate

cd /apps/final/server
nohup uvicorn main:app --host 0.0.0.0 --port 3000 > uvicorn_output.log 2>&1 &
