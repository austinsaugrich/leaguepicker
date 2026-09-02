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

Deployed as a Cloudflare Worker serving static assets — there is no
server-side code, so `wrangler.jsonc` has no `main` entry point and simply
points at the Vite build.

From the repo root:

```bash
npm run build && npx wrangler deploy
```

Connected to Cloudflare's dashboard, the only setting that matters is:

| Setting | Value |
| ------- | ----- |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` (the default) |
| Root directory | leave at the repo root |

Both the build and the Wrangler config live at the root and reach into
`client/`, so the defaults work without touching Advanced settings. A correct
deploy logs `Read 11 files`; if it logs 46, the build command didn't run and
Wrangler is uploading source instead of the bundle.

`client/.node-version` pins Node 22 because Vite 7 needs Node 20.19+ and some
hosts still default to 18. The whole payload is ~561 KB, of which 202 KB is
the map.

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

`client/src/data/champions.json` is the source of truth — 173 champions:

```json
{
  "name": "Kayle",
  "attack": "Melee",
  "mana": true,
  "lane": ["Top"],
  "damagetype": "AD"
}
```

**Attributes** come from Riot's own data and shouldn't be hand-edited:

- `attack` — CommunityDragon `tacticalInfo.attackType`. This is Riot's
  classification, which occasionally surprises: Kayle is Melee (she gains
  range at 6) and Lillia is Melee despite her reach.
- `damagetype` — CommunityDragon `tacticalInfo.damageType`
  (`kPhysical`/`kMagic`/`kMixed`). Hybrids are written `"AD, AP"` and split
  into a list when loaded.
- `mana` — Data Dragon `partype == "Mana"`. `false` covers every other
  resource: energy, fury, rage, and the genuinely resourceless.

**Lanes** are a snapshot of the U.GG tier lists (patch 26.17, Emerald+): a
champion is listed in every lane where it ranks **B or higher**. Because tier
measures strength on the current patch rather than where a champion is
actually played, 30 champions had no B+ lane at all — Caitlyn, Ezreal and Lee
Sin among them. Those keep their single best-rated lane so that every champion
stays rollable. Ties are broken by class: a tied marksman goes Bot, a tied
enchanter goes Support.

This means lanes drift as the meta moves. Re-scrape the five U.GG tier lists
when it starts to feel stale; the attribute fields don't need touching.

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
