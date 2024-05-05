import { useState } from "react";
import Blacklist from "../components/Blacklist";
import Button from "../components/Button";
import ChampInfo from "../components/ChampInfo";
import LeagueMap from "../components/Map";
import Playable from "../components/Playable";
import axios from "axios";
export default function Home() {
  const [SelectedChampion, setSelectedChampion] = useState("");
  const [SelectedFilters, setSelectedFilters] = useState({});
  async function grabChampion(
    lane = "",
    AD = true,
    AP = true,
    Melee = true,
    Ranged = true,
    Mana = true
  ) {
    let filter = {
      lane: lane,
      AD: AD,
      AP: AP,
      Melee: Melee,
      Ranged: Ranged,
      Mana: Mana,
    };
    const data = await axios.post("http://127.0.0.1:8000", filter);
    console.log(data.data);
    setSelectedChampion(data.data);

    setSelectedFilters(filter);
  }

  function clearChamp() {
    setSelectedChampion("");
  }
  function reroll() {
    grabChampion(
      SelectedFilters.lane,
      SelectedFilters.AD,
      SelectedFilters.AP,
      SelectedFilters.Ranged,
      SelectedFilters.Melee,
      SelectedFilters.Mana
    );
  }
  function updateFilters(e) {
    const checked = e.target.checked;
    const temp = SelectedFilters;
    const poop = e.target.value;
    if (poop == "AD") {
      temp.ad = checked;
    }
    if (poop == "AP") {
      temp.ad = checked;
    }
    if (poop == "Ranged") {
      temp.ad = checked;
    }
    if (poop == "Melee") {
      temp.ad = checked;
    }
    if (poop == "Mana") {
      temp.ad = checked;
    }
    setSelectedFilters(temp);
  }

  return (
    <>
      <div className='header'>
        <h1>League of Legends randomized champ selector</h1>
      </div>
      <div className='Container'>
        <div className='leftside'>
          <Blacklist
            filterfunc={reroll}
            attacktype={SelectedChampion.Attacktype}
            attackdamage={SelectedChampion.attackdamage}
            handleChecked={updateFilters}
          />
        </div>
        <div className='main'>
          <LeagueMap onClickFunc={grabChampion} />
          <Button
            onClickFunc={grabChampion}
            text='Completely Random'
            buttonname={"random"}
          />
          {/* <Button text='Need League? Download here!' buttonname={"download"} /> */}
          {SelectedChampion ? (
            <>
              <div className='popup'></div>
              <ChampInfo
                closefunc={clearChamp}
                champname={SelectedChampion.name}
                lanename={SelectedChampion.lane}
                attacktype={SelectedChampion.damagetype}
                attack={SelectedChampion.attacktype}
                rerollfunc={reroll}
              />
            </>
          ) : (
            ""
          )}
        </div>
        <div className='rightside'>
          <Playable />
        </div>
      </div>
    </>
  );
}
