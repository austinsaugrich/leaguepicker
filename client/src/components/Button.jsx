/* eslint-disable react/prop-types */
export default function Button({ text, buttonname, onClickFunc }) {
  return (
    <div className='bottombutt'>
      <button className={buttonname} onClick={() => onClickFunc("")}>
        {text}
      </button>
    </div>
  );
}
