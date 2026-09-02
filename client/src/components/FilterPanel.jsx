import { FILTER_GROUPS } from "../lib/filters";

export default function FilterPanel({ filters, onToggle, onReset }) {
  const active = new Set(filters);

  return (
    <section className="panel">
      <div className="panel__head">
        <h2>Filters</h2>
        {filters.length > 0 && (
          <button type="button" className="link-button" onClick={onReset}>
            Reset
          </button>
        )}
      </div>

      <p className="panel__hint">
        Pick the attributes you want. Leaving a group untouched means
        &ldquo;anything goes&rdquo;.
      </p>

      <div className="filter-groups">
        {FILTER_GROUPS.map((group) => (
          <fieldset key={group.id} className="filter-group">
            <legend>{group.label}</legend>
            <div className="chip-row">
              {group.options.map(({ value, label }) => {
                const isOn = active.has(value);
                return (
                  <button
                    key={value}
                    type="button"
                    className={`chip${isOn ? " chip--on" : ""}`}
                    aria-pressed={isOn}
                    onClick={() => onToggle(value)}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>
    </section>
  );
}
