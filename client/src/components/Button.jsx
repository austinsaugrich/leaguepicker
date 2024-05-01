export default function Button({ text, buttonname }) {
  return (
    <div className='bottombutt'>
      <button className={buttonname}>{text}</button>
    </div>
  );
}
