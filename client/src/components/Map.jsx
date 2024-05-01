import top from "../assets/top.png";
import bot from "../assets/bot.png";
import mid from "../assets/mid.png";
import jg from "../assets/jng.png";
import sup from "../assets/support.png";
import leaguemap from "../assets/player-guide-map-1440-188809182d83442d64221ad0bdd7435a.png";
import LaneButton from "./LaneButton";
export default function LeagueMap() {
  return (
    <div className='mapcontainer'>
      <img width='800' src={leaguemap} alt='leaguemap' />
      <LaneButton laneimg={top} lanename={"Top"} />
      <LaneButton laneimg={mid} lanename={"Mid"} />
      <LaneButton laneimg={jg} lanename={"Jungle"} />
      <LaneButton laneimg={bot} lanename={"Bot"} />
      <LaneButton laneimg={sup} lanename={"Support"} />
    </div>
  );
}
