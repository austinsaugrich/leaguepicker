FROM python:latest AS Production 

ENV NODE_ENV=production

WORKDIR /Desktop/backend

COPY . . 

RUN pip install fastapi

EXPOSE 8000

CMD ["sh", "-c", "python -m uvicorn main:app --reload --host 0.0.0.0"]