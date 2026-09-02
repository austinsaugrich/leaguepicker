import ChampionAvatar from "./ChampionAvatar";

export default function BlacklistPanel({
  blacklist,
  onRestore,
  onClear,
  version,
}) {
  const sorted = [...blacklist].sort((a, b) => a.localeCompare(b));

  return (
    <section className="panel panel--grow">
      <div className="panel__head">
        <h2>Blacklist</h2>
        {sorted.length > 0 && (
          <button type="button" className="link-button" onClick={onClear}>
            Clear all
          </button>
        )}
      </div>

      {sorted.length === 0 ? (
        <p className="empty-state">
          Nothing banned yet. Use the &times; in the roster to exclude champions
          you never want rolled.
        </p>
      ) : (
        <ul className="champ-list scroll-area">
          {sorted.map((name) => (
            <li key={name} className="champ-row champ-row--banned">
              <ChampionAvatar name={name} version={version} size={34} />
              <span className="champ-row__name">{name}</span>
              <button
                type="button"
                className="icon-button icon-button--restore"
                onClick={() => onRestore(name)}
                aria-label={`Remove ${name} from the blacklist`}
                title={`Remove ${name} from the blacklist`}
              >
                &#8635;
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
