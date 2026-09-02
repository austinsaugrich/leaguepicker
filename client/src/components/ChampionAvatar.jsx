import { useEffect, useState } from "react";
import { squareIconUrl } from "../lib/championAssets";

/** Champion portrait that degrades to a gold monogram if the CDN is unreachable. */
export default function ChampionAvatar({ name, version, size = 40 }) {
  const [failed, setFailed] = useState(false);

  // Retry once the real patch version arrives.
  useEffect(() => setFailed(false), [name, version]);

  const style = { width: size, height: size };

  if (failed) {
    return (
      <span className="avatar avatar--fallback" style={style} aria-hidden="true">
        {name?.[0] ?? "?"}
      </span>
    );
  }

  return (
    <img
      className="avatar"
      style={style}
      src={version ? squareIconUrl(name, version) : squareIconUrl(name)}
      alt=""
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
