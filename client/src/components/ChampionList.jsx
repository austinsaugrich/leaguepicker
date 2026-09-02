import { useMemo, useState } from "react";
import ChampionAvatar from "./ChampionAvatar";

export default function ChampionList({
  champions,
  onBlacklist,
  loading,
  version,
}) {
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return champions;
    return champions.filter((champ) =>
      champ.name.toLowerCase().includes(needle)
    );
  }, [champions, query]);

  return (
    <section className="panel panel--grow">
      <div className="panel__head">
        <h2>Roster</h2>
        <span className="count-pill">{champions.length}</span>
      </div>

      <input
        type="search"
        className="search-input"
        placeholder="Search champions…"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        aria-label="Search champions"
      />

      {loading ? (
        <p className="empty-state">Loading champions…</p>
      ) : visible.length === 0 ? (
        <p className="empty-state">
          {query ? `No champion matches “${query}”.` : "No champions available."}
        </p>
      ) : (
        <ul className="champ-list scroll-area">
          {visible.map((champ) => (
            <li key={champ.name} className="champ-row">
              <ChampionAvatar name={champ.name} version={version} size={34} />
              <span className="champ-row__name">{champ.name}</span>
              <span className="champ-row__tags">
                {champ.damagetype.join("/")}
              </span>
              <button
                type="button"
                className="icon-button"
                onClick={() => onBlacklist(champ.name)}
                aria-label={`Blacklist ${champ.name}`}
                title={`Blacklist ${champ.name}`}
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
