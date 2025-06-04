import React, { useEffect } from 'react';
import './ChangeMode.css';
import sun from '../assets/sun.svg'
import moon from '../assets/moon.svg'


const ChangeMode = ({ isDark, setIsDark }) => {
  useEffect(() => {
    document.body.classList.toggle('dark', isDark);
  }, [isDark]);

  const makeDark = () => {
    setIsDark(true);
  };

  const makeLight = () => {
    setIsDark(false);
  };

  return (
    <div className="mode-btn-box">

      {isDark ? (<div className="nav-btn" onClick={makeLight}>
        <button>
          <span class="box">
            <img className='icon' src={sun} alt="" />
            <p className="mode-btn-txt">Light</p>
          </span>
        </button>
      </div>) :
        (<div className="container" onClick={makeDark}>
          <button>
            <span class="box">
              <img className='icon' src={moon} alt="" />
              <p className="mode-btn-txt">Dark</p>
            </span>
          </button>
        </div>)}
    </div>
  );
};

export default ChangeMode;
