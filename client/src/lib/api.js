import rawChampions from "../data/champions.json";
import { matchesFilters } from "./filters";

// The roster ships with the app. The whole "API" was a filter and a random
// pick over 20 KB of static data, so there is no server to talk to and the
// app works offline.
//
// `damagetype` is stored as a comma-separated string for hybrids ("AD, AP")
// and is normalised to a list here, exactly as the FastAPI layer used to.
const champions = rawChampions.map((champ) => ({
  ...champ,
  damagetype: String(champ.damagetype)
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean),
}));

// Both functions stay async so callers keep the same contract they had when
// this was a network round trip.
export async function fetchChampions() {
  return [...champions].sort((a, b) => a.name.localeCompare(b.name));
}

export async function rollChampion({
  lane = "",
  attributes = [],
  blacklist = [],
}) {
  const banned = new Set(blacklist);
  const pool = champions.filter(
    (champ) =>
      !banned.has(champ.name) && matchesFilters(champ, attributes, lane)
  );

  if (pool.length === 0) {
    throw new Error("No champion matches those filters. Try loosening them.");
  }

  return pool[Math.floor(Math.random() * pool.length)];
}
