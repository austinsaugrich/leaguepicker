# Client

React 19 + Vite 7, no UI framework — plain CSS with design tokens in
`src/index.css` and component styles in `src/App.css`. No backend: the roster
ships in `src/data/champions.json`.

```bash
npm install
npm run dev      # http://localhost:8008
npm run lint
npm run build    # -> dist/, ~561 KB
```

## Layout

```
src/
  components/    presentational pieces (panels, map, modal)
  data/          champions.json — the roster
  hooks/         useDDragonVersion
  lib/           api.js, filters.js, championAssets.js
  pages/Home.jsx state lives here
```

`Home.jsx` holds the full roster plus a blacklist array and derives everything
else, so a champion can never appear in both the roster and the blacklist.

`lib/filters.js` owns the matching rules. `lib/api.js` applies them to the
bundled JSON and still exposes async functions, which is why removing the
FastAPI backend needed no changes in `Home.jsx`.

`lib/championAssets.js` maps champion names to Data Dragon IDs. Most are the
name with punctuation stripped, but around nine are irregular (Wukong is
`MonkeyKing`, Kai'Sa is `Kaisa`, and so on) and are listed explicitly.

## Assets

`src/assets/` is WebP. The Rift map is 202 KB — it was a 1.8 MB PNG, which was
82% of the old bundle. If you replace it, convert to WebP first.
