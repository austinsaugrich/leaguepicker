export const LANES = ["Top", "Jungle", "Mid", "Bot", "Support"];

export const FILTER_GROUPS = [
  {
    id: "damage",
    label: "Damage type",
    values: ["AD", "AP"],
    options: [
      { value: "AD", label: "AD" },
      { value: "AP", label: "AP" },
    ],
  },
  {
    id: "range",
    label: "Attack range",
    values: ["Melee", "Ranged"],
    options: [
      { value: "Melee", label: "Melee" },
      { value: "Ranged", label: "Ranged" },
    ],
  },
  {
    id: "resource",
    label: "Resource",
    values: ["Mana", "manaless"],
    options: [
      { value: "Mana", label: "Mana" },
      { value: "manaless", label: "No mana" },
    ],
  },
];

/**
 * Mirrors ChampionQuery.matches on the server so the UI can show a live pool
 * count without a round trip. An empty group means "no preference".
 */
export function matchesFilters(champ, filters, lane = "") {
  if (lane && !champ.lane.includes(lane)) return false;

  const selected = new Set(filters);

  for (const group of FILTER_GROUPS) {
    const picked = group.values.filter((value) => selected.has(value));
    if (picked.length === 0) continue;

    if (group.id === "damage") {
      if (!picked.some((type) => champ.damagetype.includes(type))) return false;
    } else if (group.id === "range") {
      if (!picked.includes(champ.attack)) return false;
    } else if (group.id === "resource") {
      if (!picked.includes(champ.mana ? "Mana" : "manaless")) return false;
    }
  }

  return true;
}
