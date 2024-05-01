import Blacklist from "../components/Blacklist";
import Button from "../components/Button";
import ChampInfo from "../components/ChampInfo";
import LeagueMap from "../components/Map";
import Playable from "../components/Playable";

export default function Home() {
  return (
    <>
      <div className='header'>
        <h1>League of Legends randomized champ selector</h1>
      </div>
      <div className='Container'>
        <div className='leftside'>
          <Blacklist />
        </div>
        <div className='main'>
          <LeagueMap />
          <Button text='Completely Random' buttonname={"random"} />
          <Button text='Need League? Download here!' buttonname={"download"} />
          <ChampInfo champname='Aatrox' lanename='top' attacktype='AD' />
        </div>
        <div className='rightside'>
          <Playable />
        </div>
      </div>
    </>
  );
}
