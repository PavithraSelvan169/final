cd /apps/server/
source ./py313_env/bin/activate

nohup uvicorn genai_server:app --host 0.0.0.0 --port 8000 > uvicorn_output.log 2>&1 &
