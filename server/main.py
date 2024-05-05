from champion import Champion
import json
import sys
import random
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

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


class Champmodel(BaseModel):
    Lane: str | None = 'Top'
    Attacktype: str | None = 'Melee'
    Damagetype: str | None = "AD"

# champ = Champion()
# print(champ.name)


# functions to randomize champ selection


def get_lane(lanes, lane_choice):
    if lane_choice in lanes:
        return True
    if not lane_choice:
        return True
    return False


def get_attack(at, attack_type):
    if not attack_type:
        return True
    if attack_type in at:
        return True
    return False


def get_damage_type(dt, damage_type):
    if not damage_type:
        return True
    if damage_type in dt:
        return True
    return False


def random_champ(champions):
    champ_count = len(champions)
    return random.randint(1, champ_count) - 1

# function to load json file


def load_champ(req):
    with open('./leaguelist.json') as champs_file:
        champions = []
        data = json.load(champs_file)
        print(req.Lane)
        for champs in data:
            lanecheck = get_lane(champs["lane"], req.Lane)
            if lanecheck:
                if req.AD:
                    ADcheck = get_attack(champs['damagetype'], 'AD')

                if ADcheck:
                    APcheck = get_attack(champs['attack'], req.AP)
                    if APcheck:
                        ADcheck = get_attack(champs['attack'], req.AD)


@app.post("/")
def handler(req: Champmodel):
    champions = load_champ(req)
    id = random_champ(champions)
    return champions[id]
