import React, { useState } from "react";

export default function Blacklist({
  filterfunc,
  attackdamage,
  attacktype,
  handleChecked: propHandleChecked,
}) {
  const [adChecked, setAdChecked] = useState(true);
  const [apChecked, setApChecked] = useState(false);
  const [rangedChecked, setRangedChecked] = useState(true);
  const [meleeChecked, setMeleeChecked] = useState(false);

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
      default:
        break;
    }
    if (propHandleChecked) {
      propHandleChecked(e);
    }
  };

  const isAnyTypeChecked = adChecked || apChecked;
  const isAnyRangeChecked = rangedChecked || meleeChecked;

  return (
    <div className='BlacklistContainer'>
      <h1>Blacklist Champions</h1>
      <h3>Remove types from list</h3>
      <div className='radioButtons'>
        <div className='radiorow'>
          <label>AD</label>
          <input
            type='checkbox'
            name='options'
            id='ad'
            value='AD'
            defaultChecked={adChecked}
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
            defaultChecked={apChecked}
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
            defaultChecked
            disabled
          />
        </div>
        <div className='radiorow'>
          <label>Ranged</label>
          <input
            type='checkbox'
            name='options'
            id='ranged'
            value='Ranged'
            defaultChecked={rangedChecked}
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
            defaultChecked={meleeChecked}
            onChange={(e) => handleLocalChecked(e)}
          />
        </div>
      </div>
      {!isAnyTypeChecked && <p>Please select either AD or AP.</p>}
      {!isAnyRangeChecked && <p>Please select either Ranged or Melee.</p>}
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
