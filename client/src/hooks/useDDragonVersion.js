import { useEffect, useState } from "react";
import { latestVersion } from "../lib/championAssets";

/** Resolves to the current Data Dragon patch, falling back gracefully. */
export function useDDragonVersion() {
  const [version, setVersion] = useState(null);

  useEffect(() => {
    let active = true;
    latestVersion().then((v) => {
      if (active) setVersion(v);
    });
    return () => {
      active = false;
    };
  }, []);

  return version;
}
