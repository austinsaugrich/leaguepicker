"""Random League of Legends champion picker API."""

import json
import random
from functools import lru_cache
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from champion import Champion, ChampionQuery

# The client owns the roster now that the site is static; the API reads the
# same file so the two can never drift apart.
CHAMPION_DATA = (
    Path(__file__).resolve().parents[1] / "client" / "src" / "data" / "champions.json"
)

app = FastAPI(
    title="League Champ Picker",
    description="Rolls a random champion from a filtered pool.",
    version="2.0.0",
)

# The Vite dev server and the nginx container that serves the production build.
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:8008",
    "http://127.0.0.1:8008",
    "http://localhost",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@lru_cache(maxsize=1)
def all_champions() -> list[Champion]:
    """Read and validate the roster once, then serve it from memory."""
    with CHAMPION_DATA.open(encoding="utf-8") as champs_file:
        return [Champion(**champ) for champ in json.load(champs_file)]


@app.get("/champs", response_model=list[Champion])
def get_champs() -> list[Champion]:
    return sorted(all_champions(), key=lambda champ: champ.name)


@app.get("/champ/{name}", response_model=Champion)
def get_champ(name: str) -> Champion:
    for champ in all_champions():
        if champ.name.lower() == name.lower():
            return champ
    raise HTTPException(status_code=404, detail=f"No champion named {name!r}")


@app.post("/", response_model=Champion)
def roll_champion(query: ChampionQuery) -> Champion:
    pool = [champ for champ in all_champions() if query.matches(champ)]
    if not pool:
        raise HTTPException(
            status_code=404,
            detail="No champion matches those filters. Try loosening them.",
        )
    return random.choice(pool)


@app.get("/health")
def health() -> dict[str, object]:
    return {"status": "ok", "champions": len(all_champions())}
