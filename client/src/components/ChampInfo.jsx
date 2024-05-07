import placeholder from "../assets/mid.png";

export default function ChampInfo({
  champname,
  lanename,
  attacktype,
  attack,
  closefunc,
  rerollfunc,
  lanepref,
}) {
  console.log(lanepref);
  return (
    <div className='chosencontainer'>
      <div className='imgdiv'>
        <img src={placeholder} alt='' />
      </div>
      <div className='middlediv'>
        <p>
          The champion chosen is {champname}. They are played in the{" "}
          {lanename + " "}
          lane. Their attack type is {attacktype} and they are {attack}. You can
          find their build here.
        </p>
        <button onClick={() => rerollfunc(lanepref)}>Re-Roll</button>
      </div>
      <div className='rightdiv'>
        <button onClick={() => closefunc()}>X</button>
      </div>
    </div>
  );
}
