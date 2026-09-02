import { useEffect, useRef, useState } from "react";
import { buildGuideUrl, loadingUrl, splashUrl } from "../lib/championAssets";
import ChampionAvatar from "./ChampionAvatar";

export default function ChampionModal({
  champion,
  lanePref,
  onClose,
  onReroll,
  rolling,
  version,
}) {
  const closeRef = useRef(null);
  const [artFailed, setArtFailed] = useState(false);

  useEffect(() => setArtFailed(false), [champion.name]);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    closeRef.current?.focus();

    function onKeyDown(event) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      // Send focus back to whatever opened the dialog.
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [onClose]);

  const { name, lane, attack, damagetype, mana } = champion;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-champ-name"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal__art">
          {!artFailed && (
            <img
              src={splashUrl(name)}
              alt=""
              onError={(event) => {
                // Splash missing for very new champions — try loading art.
                if (event.currentTarget.dataset.retried) {
                  setArtFailed(true);
                } else {
                  event.currentTarget.dataset.retried = "true";
                  event.currentTarget.src = loadingUrl(name);
                }
              }}
            />
          )}
          <div className="modal__art-scrim" />

          <button
            ref={closeRef}
            type="button"
            className="modal__close"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>

          <div className="modal__heading">
            <span className="modal__eyebrow">Your champion is</span>
            <h2 id="modal-champ-name">{name}</h2>
          </div>
        </div>

        <div className="modal__body">
          <div className="stat-grid">
            <div className="stat">
              <span className="stat__label">Lane</span>
              <span className="stat__value">{lane.join(" / ")}</span>
            </div>
            <div className="stat">
              <span className="stat__label">Damage</span>
              <span className="stat__value">{damagetype.join(" / ")}</span>
            </div>
            <div className="stat">
              <span className="stat__label">Range</span>
              <span className="stat__value">{attack}</span>
            </div>
            <div className="stat">
              <span className="stat__label">Resource</span>
              <span className="stat__value">{mana ? "Mana" : "No mana"}</span>
            </div>
          </div>

          <div className="modal__actions">
            <button
              type="button"
              className="button button--primary"
              onClick={() => onReroll(lanePref)}
              disabled={rolling}
            >
              {rolling ? "Rolling…" : "Re-roll"}
            </button>
            <a
              className="button button--ghost"
              href={buildGuideUrl(name)}
              target="_blank"
              rel="noreferrer"
            >
              View build
            </a>
          </div>
        </div>

        {artFailed && (
          <div className="modal__art-fallback">
            <ChampionAvatar name={name} version={version} size={72} />
          </div>
        )}
      </div>
    </div>
  );
}
