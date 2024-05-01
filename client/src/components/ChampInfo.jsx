import placeholder from "../assets/mid.png";

export default function ChampInfo({ champname, lanename, attacktype }) {
  return (
    <div className='chosencontainer'>
      <img src={placeholder} alt='' />
      <p>
        The champion chosen is {champname}. They are played in the {lanename}
        lane. Their attack type is {attacktype}. You can find their build here.
      </p>
    </div>
  );
}
