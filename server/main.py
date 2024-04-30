from server.champion import Champion
import json
import sys
import random
from pydantic import BaseModel
from fastapi import FastAPI
app = FastAPI()


class Champmodel(BaseModel):
    Lane: str
    Attacktype: str | None = 'Melee'
    Damagetype: str

# champ = Champion()
# print(champ.name)


champions = []

# functions to randomize champ selection


def get_lane(lanes, lane_choice):
    if lane_choice in lanes:
        return True
    return False


def get_attack(at, attack_type):
    if attack_type in at:
        return True
    return False


def get_damage_type(dt, damage_type):
    if damage_type in dt:
        return True
    return False


def random_champ():
    champ_count = len(champions)
    return random.randint(1, champ_count) - 1

# function to load json file


def load_champ(req):
    with open('./leaguelist.json') as champs_file:
        data = json.load(champs_file)
        for champs in data:
            if get_lane(champs["lane"], req.Lane):
                if get_attack(champs["attack"], req.Attacktype):
                    if get_damage_type(champs["damagetype"], req.Damagetype):
                        champions.append(champs)


@app.get("/")
def handler(req: Champmodel):
    load_champ(req)
    id = random_champ()
    return champions[id]
