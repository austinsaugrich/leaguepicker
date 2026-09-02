export default function LaneButton({
  laneimg,
  lanename,
  onClickFunc,
  disabled,
}) {
  return (
    <div className={`lane-button lane-button--${lanename.toLowerCase()}`}>
      <button
        type="button"
        onClick={() => onClickFunc(lanename)}
        disabled={disabled}
        aria-label={`Roll a random ${lanename} champion`}
      >
        <img src={laneimg} alt="" />
      </button>
      <span className="lane-button__label" aria-hidden="true">
        {lanename}
      </span>
    </div>
  );
}
