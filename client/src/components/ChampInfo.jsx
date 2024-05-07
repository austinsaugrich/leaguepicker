import placeholder from "../assets/mid.png";

import { useEffect, useState } from "react";
export default function ChampInfo({
  champname,
  lanename,
  attacktype,
  attack,
  closefunc,
  rerollfunc,
  lanepref,
}) {
  const [imgurl, SetImgUrl] = useState("");
  const [lanes, Setlanes] = useState("");
  useEffect(() => {
    if (champname !== "Wukong") {
      SetImgUrl(
        `https://cdn.mobalytics.gg/assets/lol/images/dd/champions/icons/${champname
          .toLowerCase()
          .replace(/ /g, "")
          .replace(/'/g, "")
          .replace(/\./g, "")}.png?V3`
      );
    } else {
      SetImgUrl(
        `https://cdn.mobalytics.gg/assets/lol/images/dd/champions/icons/monkeyking.png?V3`
      );
    }

    let temp = "";
    for (let i = 0; i < lanename.length; i++) {
      if (i == 0) {
        temp = lanename[0];
      } else {
        temp += `/${lanename[i]}`;
      }
    }
    Setlanes(temp);
  }, [lanename, champname]);
  return (
    <div className='chosencontainer'>
      <div className='imgdiv'>
        <img src={imgurl} aria-label='champimg' role='img' />
      </div>
      <div className='middlediv'>
        <p>The chosen champion is {champname}</p>
        <p>They are played in the {lanes} lane.</p>
        <p>
          Their attack type is {attacktype} and they are {attack}
        </p>
        <button onClick={() => rerollfunc(lanepref)}>Re-roll</button>
      </div>
      <div className='rightdiv'>
        <button onClick={() => closefunc()}>X</button>
      </div>
    </div>
  );
}
