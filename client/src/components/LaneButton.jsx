export default function LaneButton({ laneimg, lanename }) {
  return (
    <div className={`lanebutton ${lanename}`}>
      <button>
        <img src={laneimg} alt='img' />
      </button>
    </div>
  );
}
