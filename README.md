# League Champ Picker

Rolls a random League of Legends champion for you, filtered by lane, damage
type, attack range and resource — with a personal blacklist for the champions
you never want to see.

**The app is a static site.** The roster is 171 champions in a 20 KB JSON file
that ships with the bundle, and picking a champion is a filter plus a random
index — so there is no backend to run, nothing to keep awake, and the whole
thing works offline apart from champion art.

- **client/** — React 19 + Vite 7 single-page app (this is the app)
- **server/** — the original FastAPI service, kept for reference; optional

## Running it locally

Needs Node 20+.

```bash
cd client && npm install && npm run dev
```

Open <http://localhost:8008>. That's it — no second terminal, no Python.

## Deploying

It builds to plain static files, and there is only one route, so no SPA
rewrite rules are needed.

```bash
cd client && npm run build
```

Point any static host at `client/` with build command `npm run build` and
output directory `dist`. Cloudflare Pages and Netlify both work on their free
tiers; Cloudflare's bandwidth is unmetered, which is the reason to prefer it if
this ever gets linked somewhere busy.

The whole payload is ~561 KB, of which 202 KB is the map.

## How the picking works

`client/src/lib/filters.js` holds `matchesFilters`, the single source of truth
for the rules:

- **Lane** — empty means any lane.
- **Attributes** — three independent groups (damage type, attack range,
  resource). Leaving a group untouched means "no preference", so selecting
  nothing rolls across the whole roster.
- **Blacklist** — names to exclude.

`client/src/lib/api.js` applies those rules to the bundled roster. It keeps the
async signatures the network layer used to have, so `pages/Home.jsx` did not
change when the backend went away.

## Data

`client/src/data/champions.json` is the source of truth:

```json
{
  "name": "Kayle",
  "attack": "Ranged",
  "mana": true,
  "lane": ["Top", "Mid"],
  "damagetype": "AD, AP"
}
```

`mana: false` covers every non-mana resource (energy, fury, rage, and the
genuinely resourceless). `damagetype` may name both types for hybrids and is
normalised to a list when loaded.

To add a champion, add an entry and redeploy. Champion portraits and splash art
come from Riot's Data Dragon CDN; build links point at Mobalytics.

## The optional API

`server/` still runs the same rules over the same JSON file if you want an HTTP
interface:

```bash
cd server && pip install -r requirements.txt && python -m uvicorn main:app --port 8888
```

| Method | Path            | Description                                     |
| ------ | --------------- | ----------------------------------------------- |
| `GET`  | `/champs`       | Every champion, sorted by name                  |
| `GET`  | `/champ/{name}` | One champion by name, or 404                    |
| `POST` | `/`             | Roll a random champion from a filtered pool     |
| `GET`  | `/health`       | Liveness check plus the loaded champion count   |

The client does not use it.

---

This is an unofficial fan project. It isn't endorsed by Riot Games and doesn't
reflect the views or opinions of Riot Games or anyone officially involved in
producing or managing League of Legends. League of Legends and Riot Games are
trademarks or registered trademarks of Riot Games, Inc.
