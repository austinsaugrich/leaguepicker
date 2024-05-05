import { useEffect } from "react";
export default function LaneButton({ laneimg, lanename, onClickFunc }) {
  // useEffect(() => {
  //   console.log(onClickFunc);
  // });
  return (
    <div className={`lanebutton ${lanename}`}>
      <button onClick={() => onClickFunc(lanename)}>
        <img src={laneimg} alt='img' />
      </button>
    </div>
  );
}
