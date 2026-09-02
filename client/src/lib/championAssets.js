// Riot's Data Dragon uses its own champion IDs. Most are just the display
// name with spaces and punctuation stripped, but a handful are irregular
// enough that they need spelling out.
const DDRAGON_ID_OVERRIDES = {
  "Bel'Veth": "Belveth",
  "Cho'Gath": "Chogath",
  "Kai'Sa": "Kaisa",
  "Kha'Zix": "Khazix",
  LeBlanc: "Leblanc",
  "Nunu & Willump": "Nunu",
  "Renata Glasc": "Renata",
  "Vel'Koz": "Velkoz",
  Wukong: "MonkeyKing",
};

const FALLBACK_VERSION = "15.13.1";

export function ddragonId(name) {
  if (!name) return "";
  return (
    DDRAGON_ID_OVERRIDES[name] ??
    name.replace(/['.&\s]/g, "").replace(/^(.)/, (c) => c.toUpperCase())
  );
}

export function squareIconUrl(name, version = FALLBACK_VERSION) {
  return `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${ddragonId(
    name
  )}.png`;
}

// Splash and loading art are served without a version in the path, so these
// keep working even if the version lookup fails.
export function splashUrl(name) {
  return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${ddragonId(
    name
  )}_0.jpg`;
}

export function loadingUrl(name) {
  return `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${ddragonId(
    name
  )}_0.jpg`;
}

export function buildGuideUrl(name) {
  const slug = ddragonId(name).toLowerCase();
  return `https://mobalytics.gg/lol/champions/${slug}/build`;
}

let versionPromise;

/** Latest Data Dragon patch, fetched once and cached for the session. */
export function latestVersion() {
  versionPromise ??= fetch(
    "https://ddragon.leagueoflegends.com/api/versions.json"
  )
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error("bad status"))))
    .then((versions) => versions[0] ?? FALLBACK_VERSION)
    .catch(() => FALLBACK_VERSION);

  return versionPromise;
}
