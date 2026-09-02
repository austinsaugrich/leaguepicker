import { useCallback, useEffect, useMemo, useState } from "react";
import BlacklistPanel from "../components/BlacklistPanel";
import ChampionList from "../components/ChampionList";
import ChampionModal from "../components/ChampionModal";
import FilterPanel from "../components/FilterPanel";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LaneSelector from "../components/LaneSelector";
import LeagueMap from "../components/Map";
import { useDDragonVersion } from "../hooks/useDDragonVersion";
import { fetchChampions, rollChampion } from "../lib/api";
import { matchesFilters } from "../lib/filters";

export default function Home() {
  const [champions, setChampions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [filters, setFilters] = useState([]);
  const [blacklist, setBlacklist] = useState([]);

  const [rolled, setRolled] = useState(null);
  const [lanePref, setLanePref] = useState("");
  const [rolling, setRolling] = useState(false);
  const [rollError, setRollError] = useState("");

  const version = useDDragonVersion();

  useEffect(() => {
    let active = true;

    fetchChampions()
      .then((data) => {
        if (active) setChampions(data);
      })
      .catch((error) => {
        if (active) setLoadError(error.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  // The roster and the blacklist are derived from one source of truth, so a
  // champion can never end up in both lists or neither.
  const banned = useMemo(() => new Set(blacklist), [blacklist]);
  const available = useMemo(
    () => champions.filter((champ) => !banned.has(champ.name)),
    [champions, banned]
  );

  // Pool the next roll would draw from, ignoring lane (lane is chosen per click).
  const pool = useMemo(
    () => available.filter((champ) => matchesFilters(champ, filters)),
    [available, filters]
  );

  const toggleFilter = useCallback((value) => {
    setFilters((current) =>
      current.includes(value)
        ? current.filter((f) => f !== value)
        : [...current, value]
    );
  }, []);

  const addToBlacklist = useCallback((name) => {
    setBlacklist((current) =>
      current.includes(name) ? current : [...current, name]
    );
  }, []);

  const removeFromBlacklist = useCallback((name) => {
    setBlacklist((current) => current.filter((n) => n !== name));
  }, []);

  const roll = useCallback(
    async (lane = "") => {
      setRolling(true);
      setRollError("");
      try {
        const champ = await rollChampion({
          lane,
          attributes: filters,
          blacklist,
        });
        setRolled(champ);
        setLanePref(lane);
      } catch (error) {
        setRollError(error.message);
        setRolled(null);
      } finally {
        setRolling(false);
      }
    },
    [filters, blacklist]
  );

  const poolEmpty = pool.length === 0 && !loading && !loadError;

  return (
    <>
      <Header poolSize={pool.length} totalSize={champions.length} />

      {loadError && (
        <div className="banner banner--error" role="alert">
          Couldn&rsquo;t load the champion roster: {loadError}
        </div>
      )}

      <main className="layout">
        <div className="layout__col layout__col--left">
          <FilterPanel
            filters={filters}
            onToggle={toggleFilter}
            onReset={() => setFilters([])}
          />
          <BlacklistPanel
            blacklist={blacklist}
            onRestore={removeFromBlacklist}
            onClear={() => setBlacklist([])}
            version={version}
          />
        </div>

        <div className="layout__col layout__col--center">
          <p className="map-caption">
            Pick a lane, or roll across every role.
          </p>

          <LeagueMap onClickFunc={roll} disabled={rolling || poolEmpty} />

          <LaneSelector onSelect={roll} disabled={rolling || poolEmpty} />

          <button
            type="button"
            className="button button--primary button--wide"
            onClick={() => roll("")}
            disabled={rolling || poolEmpty}
          >
            {rolling ? "Rolling…" : "Completely random"}
          </button>

          {poolEmpty && (
            <p className="banner banner--warn" role="status">
              No champion matches these filters. Loosen them or restore someone
              from the blacklist.
            </p>
          )}

          {rollError && !poolEmpty && (
            <p className="banner banner--error" role="alert">
              {rollError}
            </p>
          )}
        </div>

        <div className="layout__col layout__col--right">
          <ChampionList
            champions={available}
            onBlacklist={addToBlacklist}
            loading={loading}
            version={version}
          />
        </div>
      </main>

      <Footer />

      {rolled && (
        <ChampionModal
          champion={rolled}
          lanePref={lanePref}
          onClose={() => setRolled(null)}
          onReroll={roll}
          rolling={rolling}
          version={version}
        />
      )}
    </>
  );
}
