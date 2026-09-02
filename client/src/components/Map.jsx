import top from "../assets/top.webp";
import bot from "../assets/bot.webp";
import mid from "../assets/mid.webp";
import jg from "../assets/jng.webp";
import sup from "../assets/support.webp";
import leaguemap from "../assets/rift-map.webp";
import LaneButton from "./LaneButton";

const LANES = [
  { name: "Top", icon: top },
  { name: "Jungle", icon: jg },
  { name: "Mid", icon: mid },
  { name: "Bot", icon: bot },
  { name: "Support", icon: sup },
];

export default function LeagueMap({ onClickFunc, disabled }) {
  return (
    <div className="map-frame">
      <img className="map-frame__image" src={leaguemap} alt="Summoner's Rift" />
      {LANES.map(({ name, icon }) => (
        <LaneButton
          key={name}
          onClickFunc={onClickFunc}
          laneimg={icon}
          lanename={name}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
