import leaguemap from "../assets/rift-map.webp";
import { LANES } from "../lib/lanes";
import LaneButton from "./LaneButton";

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
