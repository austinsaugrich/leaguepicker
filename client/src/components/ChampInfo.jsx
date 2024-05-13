/* eslint-disable react/prop-types */
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
  const [moba, setMoba] = useState("");
  function getUrl(name) {
    return `https://mobalytics.gg/lol/champions/${name}/build`;
  }
  useEffect(() => {
    if (champname == "Wukong") {
      SetImgUrl(
        `https://cdn.mobalytics.gg/assets/lol/images/dd/champions/icons/monkeyking.png?V3`
      );
      setMoba(getUrl("monkeyking"));
    } else if (champname == "Nunu & Willump") {
      SetImgUrl(
        `https://cdn.mobalytics.gg/assets/lol/images/dd/champions/icons/nunu.png?V3`
      );
      setMoba(getUrl("nunu"));
    } else {
      SetImgUrl(
        `https://cdn.mobalytics.gg/assets/lol/images/dd/champions/icons/${champname
          .toLowerCase()
          .replace(/ /g, "")
          .replace(/'/g, "")
          .replace(/\./g, "")}.png?V3`
      );
      setMoba(
        getUrl(
          champname
            .toLowerCase()
            .replace(/ /g, "")
            .replace(/'/g, "")
            .replace(/\./g, "")
        )
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
        <a href={moba} target='_blank'>
          View build here!
        </a>
        <button onClick={() => rerollfunc(lanepref)}>Re-roll</button>
      </div>
      <div className='rightdiv'>
        <button onClick={() => closefunc()}>X</button>
      </div>
    </div>
  );
}
