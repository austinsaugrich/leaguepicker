import { useState } from "react";
import Blacklist from "../components/Blacklist";
import Button from "../components/Button";
import ChampInfo from "../components/ChampInfo";
import LeagueMap from "../components/Map";
import Playable from "../components/Playable";
import axios from "axios";
export default function Home() {
  const [SelectedChampion, setSelectedChampion] = useState("");
  const [SelectedFilters, setSelectedFilters] = useState([]);
  const [prefLane, setPrefLane] = useState("");
  async function grabChampion(lane) {
    const data = await axios.post("http://127.0.0.1:8000", {
      Lane: lane,
      Attributes: SelectedFilters,
    });
    setSelectedChampion(data.data);
    if (lane) {
      setPrefLane(lane);
    } else {
      setPrefLane("");
    }
  }

  function clearChamp() {
    setSelectedChampion("");
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
          <Blacklist handleChecked={updateFilters} />
        </div>
        <div className='main'>
          <LeagueMap onClickFunc={grabChampion} />
          <Button
            onClickFunc={grabChampion}
            text='Completely Random'
            buttonname={"random"}
          />
          {
            <Button
              text='Need League? Download here!'
              buttonname={"download"}
            />
          }
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
          <Playable />
        </div>
      </div>
    </>
  );
}
