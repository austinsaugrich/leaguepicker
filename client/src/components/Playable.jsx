/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";

export default function Playable({ blacklist }) {
  const [playableChampions, setPlayableChampions] = useState([]);

  useEffect(() => {
    async function grabAllChampions() {
      const data = await axios.get("http://127.0.0.1:8000/champs", {});
      const sortedChampions = data.data.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setPlayableChampions(sortedChampions);
    }
    grabAllChampions();
  }, []);

  const generateImageUrl = (championName) => {
    if (championName !== "Wukong") {
      return `https://cdn.mobalytics.gg/assets/lol/images/dd/champions/icons/${championName
        .toLowerCase()
        .replace(/ /g, "")
        .replace(/'/g, "")
        .replace(/&/g, "")
        .replace(/\./g, "")}.png?V3`;
    } else {
      return `https://cdn.mobalytics.gg/assets/lol/images/dd/champions/icons/monkeyking.png?V3`;
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
              <button onClick={() => blacklist(champ.name)}>X</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
