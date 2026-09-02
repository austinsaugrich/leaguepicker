import { LANES } from "../lib/lanes";

/**
 * Labelled lane buttons for touch screens. The map hotspots rely on hover to
 * reveal their labels, which never happens on a phone, so small screens get
 * this instead and the map becomes purely decorative.
 */
export default function LaneSelector({ onSelect, disabled }) {
  return (
    <nav className="lane-selector" aria-label="Roll by lane">
      {LANES.map(({ name, icon }) => (
        <button
          key={name}
          type="button"
          className="lane-selector__item"
          onClick={() => onSelect(name)}
          disabled={disabled}
        >
          <img src={icon} alt="" />
          <span>{name}</span>
        </button>
      ))}
    </nav>
  );
}
