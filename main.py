from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.user_router import user_root
from routers.appointment_router import appointment_router
from routers.department_router import department_root
from routers.medical_record_router import medical_record_router

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_root)
app.include_router(appointment_router)
app.include_router(department_root)
app.include_router(medical_record_router)

#Lazaro


#Ale


#Mica