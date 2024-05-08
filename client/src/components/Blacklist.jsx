/* eslint-disable react/prop-types */
import { useState } from "react";

export default function Blacklist({ handleChecked: propHandleChecked }) {
  const [adChecked, setAdChecked] = useState(true);
  const [apChecked, setApChecked] = useState(false);
  const [rangedChecked, setRangedChecked] = useState(true);
  const [meleeChecked, setMeleeChecked] = useState(false);
  const [manaChecked, setManaChecked] = useState(true);
  const [nomanaChecked, setNoManaChecked] = useState(false);

  const handleLocalChecked = (e) => {
    const { id, checked } = e.target;
    switch (id) {
      case "ad":
        setAdChecked(checked);
        break;
      case "ap":
        setApChecked(checked);
        break;
      case "ranged":
        setRangedChecked(checked);
        break;
      case "melee":
        setMeleeChecked(checked);
        break;
      case "Mana":
        setManaChecked(checked);
        break;
      case "NoMana":
        setNoManaChecked(checked);
        break;
      default:
        break;
    }
    if (propHandleChecked) {
      propHandleChecked(e);
    }
  };

  const isAnyTypeChecked = adChecked || apChecked;
  const isAnyRangeChecked = rangedChecked || meleeChecked;
  const isAnyManaChecked = manaChecked || nomanaChecked;

  return (
    <div className='BlacklistContainer'>
      <h1>Blacklist Champions</h1>
      <h3>Include the following attributes</h3>
      <div className='radioButtons'>
        <div className='radiorow'>
          <label>AD</label>
          <input
            type='checkbox'
            name='options'
            id='ad'
            value='AD'
            onChange={(e) => handleLocalChecked(e)}
          />
        </div>
        <div className='radiorow'>
          <label>AP</label>
          <input
            type='checkbox'
            name='options'
            id='ap'
            value='AP'
            onChange={(e) => handleLocalChecked(e)}
          />
        </div>
        <div className='radiorow'>
          <label>Mana</label>
          <input
            type='checkbox'
            name='options'
            id='Mana'
            value='Mana'
            onChange={(e) => handleLocalChecked(e)}
          />
        </div>
        <div className='radiorow'>
          <label>No Mana</label>
          <input
            type='checkbox'
            name='options'
            id='NoMana'
            value='manaless'
            onChange={(e) => handleLocalChecked(e)}
          />
        </div>
        <div className='radiorow'>
          <label>Ranged</label>
          <input
            type='checkbox'
            name='options'
            id='ranged'
            value='Ranged'
            onChange={(e) => handleLocalChecked(e)}
          />
        </div>
        <div className='radiorow'>
          <label>Melee</label>
          <input
            type='checkbox'
            name='options'
            id='melee'
            value='Melee'
            onChange={(e) => handleLocalChecked(e)}
          />
        </div>
      </div>
      {!isAnyTypeChecked && <p>Please select either AD or AP or both.</p>}
      {!isAnyRangeChecked && (
        <p>Please select either Ranged or Melee or both.</p>
      )}
      {!isAnyManaChecked && (
        <p>Please select either Mana or No Mana or both.</p>
      )}
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
