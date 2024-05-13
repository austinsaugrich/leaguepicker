import { useEffect, useState } from "react";
import Blacklist from "../components/Blacklist";
import Button from "../components/Button";
import ChampInfo from "../components/ChampInfo";
import LeagueMap from "../components/Map";
import Playable from "../components/Playable";
import axios from "axios";
export default function Home() {
  const [SelectedChampion, setSelectedChampion] = useState("");
  const [SelectedFilters, setSelectedFilters] = useState([]);
  const [BlacklistedChampions, setBlacklistedChampions] = useState([]);
  const [prefLane, setPrefLane] = useState("");
  const [playableChampions, setPlayableChampions] = useState([]);

  async function grabAllChampions() {
    const data = await axios.get("http://127.0.0.1:8000/champs", {});

    setPlayableChampions(sortChamps(data.data));
  }

  function sortChamps(data) {
    return data.sort((a, b) => a.name.localeCompare(b.name));
  }

  async function grabChampion(lane) {
    const data = await axios.post("http://127.0.0.1:8000", {
      Lane: lane,
      Attributes: SelectedFilters,
      Blacklist: BlacklistedChampions,
    });
    setSelectedChampion(data.data);
    if (lane) {
      setPrefLane(lane);
    } else {
      setPrefLane("");
    }
  }

  async function grabOneChampion(name) {
    const data = await axios.get(`http://127.0.0.1:8000/champ/${name}`);
    return data.data;
  }

  function clearChamp() {
    setSelectedChampion("");
  }

  function blacklistedChampions(name) {
    let blacklist = [...BlacklistedChampions];
    if (!blacklist.includes(name)) {
      blacklist.push(name);
      setBlacklistedChampions(blacklist);
    }
  }

  async function unBlacklistedChampions(name) {
    let blacklist = [...BlacklistedChampions];
    let playable = [...playableChampions];
    if (blacklist.includes(name)) {
      blacklist = blacklist.filter((f) => f !== name);
      setBlacklistedChampions(blacklist);
      const champ = await grabOneChampion(name);
      playable.push(champ);
      setPlayableChampions(sortChamps(playable));
    }
  }

  function updateFilters(e) {
    const value = e.target.value;

    let filters = [...SelectedFilters];
    if (filters.includes(value)) {
      filters = filters.filter((f) => f !== value);
    } else {
      filters.push(value);
    }

    setSelectedFilters(filters);
  }

  return (
    <>
      <div className='header'>
        <h1>League of Legends randomized champ selector</h1>
      </div>
      <div className='Container'>
        <div className='leftside'>
          <Blacklist
            handleChecked={updateFilters}
            blacklistedChampions={BlacklistedChampions}
            blacklist={unBlacklistedChampions}
          />
        </div>
        <div className='main'>
          <LeagueMap onClickFunc={grabChampion} />
          <Button
            onClickFunc={grabChampion}
            text='Completely Random'
            buttonname={"random"}
          />
          {SelectedChampion ? (
            <>
              <div className='popup'></div>
              <ChampInfo
                closefunc={clearChamp}
                champname={SelectedChampion.name}
                lanename={SelectedChampion.lane}
                attacktype={SelectedChampion.damagetype}
                attack={SelectedChampion.attack}
                rerollfunc={grabChampion}
                lanepref={prefLane}
              />
            </>
          ) : null}
        </div>
        <div className='rightside'>
          <Playable
            blacklist={blacklistedChampions}
            playableChampions={playableChampions}
            grabAllChampions={grabAllChampions}
            setPlayableChampions={setPlayableChampions}
          />
        </div>
      </div>
    </>
  );
}
