/* eslint-disable react/prop-types */
export default function LaneButton({ laneimg, lanename, onClickFunc }) {
  return (
    <div className={`lanebutton ${lanename}`}>
      <button onClick={() => onClickFunc(lanename)}>
        <img src={laneimg} alt='img' />
      </button>
    </div>
  );
}
