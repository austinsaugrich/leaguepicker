/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";

export default function Playable({
  blacklist,
  playableChampions,
  grabAllChampions,
  setPlayableChampions,
}) {
  useEffect(() => {
    grabAllChampions();
  }, []);
  function blacklistChampion(name) {
    let champs = [...playableChampions];
    for (let i = 0; i < champs.length; i++) {
      if (champs[i].name == name) {
        champs.splice(i, 1);
        console.log(name, champs);
        blacklist(name);
        setPlayableChampions(champs);
      }
    }
  }

  const generateImageUrl = (championName) => {
    if (championName == undefined) {
      return;
    }
    if (championName == "Wukong") {
      return `https://cdn.mobalytics.gg/assets/lol/images/dd/champions/icons/monkeyking.png?V3`;
    } else if (championName == "Nunu & Willump") {
      return `https://cdn.mobalytics.gg/assets/lol/images/dd/champions/icons/nunu.png?V3`;
    } else {
      return `https://cdn.mobalytics.gg/assets/lol/images/dd/champions/icons/${championName
        .toLowerCase()
        .replace(/ /g, "")
        .replace(/'/g, "")
        .replace(/&/g, "")
        .replace(/\./g, "")}.png?V3`;
    }
  };
  return (
    <div className='playcontainer'>
      <h1>Playable Champions</h1>
      <ul className='list'>
        {playableChampions.map((champ, i) => (
          <li key={i}>
            <div className='champion-info'>
              <span>
                <img src={generateImageUrl(champ.name)} alt='champimg' />
              </span>
              <span>{champ.name}</span>
            </div>
            <span>
              <button onClick={() => blacklistChampion(champ.name)}>X</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
