export default function Blacklist() {
  return (
    <div className='BlacklistContainer'>
      <h1>Blacklist Champions</h1>
      <h3>Remove types from list</h3>
      <div className='radioButtons'>
        <div className='radiorow'>
          <label>AD</label>
          <input type='radio' name='options' id='ad' value='AD' />
        </div>
        <div className='radiorow'>
          <label>AP</label>
          <input type='radio' name='options' id='ap' value='AP' />
        </div>
        <div className='radiorow'>
          <label>Manna</label>
          <input type='radio' name='options' id='Manna' value='Manna' />
        </div>
        <div className='radiorow'>
          <label>No Manna</label>
          <input type='radio' name='options' id='nomanna' value='No Manna' />
        </div>
        <div className='radiorow'>
          <label>Ranged</label>
          <input type='radio' name='options' id='ranged' value='Ranged' />
        </div>
        <div className='radiorow'>
          <label>Melee</label>
          <input type='radio' name='options' id='melee' value='Melee' />
        </div>
      </div>
      <div className='champsearch'>
        <form action='#' className='champform'>
          <input type='text' placeholder='Search for champion' name='search' />
          <button>Add to blacklist</button>
        </form>
      </div>
      <div className='blacklistedchampions'>
        <h3>Champions Currently Blacklisted</h3>
        <div className='listofblacklisted'>
          <h5>Aatrox</h5>
          <h5>Ahri</h5>
        </div>
      </div>
    </div>
  );
}
