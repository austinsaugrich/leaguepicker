from champion import Champion
import json
import sys
import random
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
# for uvicorn
origins = [
    "http://localhost:5173",
    "http://localhost"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# champ model
class Champmodel(BaseModel):
    Lane: str | None = ''
    Attributes: list | None = []
    Blacklist: list | None = []

# functions to randomize champ selection


def get_lane(lanes, lane_choice):
    if lane_choice in lanes:
        return True
    if not lane_choice:
        return True
    return False


def get_attack(at, attributes):
    for attr in attributes:
        if attr in at:
            return True
    return False


def get_damage_type(dt, attributes):
    for attr in attributes:
        if attr in dt:
            return True
    return False


def get_mana(mana, attributes):
    for attr in attributes:
        if mana and "Mana" in attr:
            return True
        elif not mana and "manaless" in attr:
            return True
    return False


def random_champ(champs):
    if champs:
        champ_count = len(champs)
        return random.randint(1, champ_count) - 1
    else:
        print('ERROR')
        return {}

# function to load json file


def load_champ(req):
    with open('./leaguelist.json') as champs_file:
        champs = json.load(champs_file)
        print(req)
        filterchamps = []
        for champ in champs:
            if not get_lane(champ['lane'], req.Lane):
                continue
            if not get_attack(champ['attack'], req.Attributes):
                continue
            if not get_damage_type(champ['damagetype'], req.Attributes):
                continue
            if not get_mana(champ['mana'], req.Attributes):
                continue
            if champ["name"] in req.Blacklist:
                continue
            filterchamps.append(champ)
        return filterchamps


@app.post("/")
def handler(req: Champmodel):
    champs = load_champ(req)
    id = random_champ(champs)
    return champs[id]


@app.get('/champs')
def getchamps():
    with open('./leaguelist.json') as champs_file:
        champs = json.load(champs_file)
    return champs
