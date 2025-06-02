import React, { useEffect } from 'react';
import './ChangeMode.css';

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

     {isDark ? (<div className="container" onClick={makeLight}>
        <div className="toggle">
          <input type="checkbox" checked={!isDark} readOnly />
          <span className="button"></span>
          <span className="label">☼</span>
        </div>
      </div>) : 
      (<div className="container" onClick={makeDark}>
        <div className="toggle">
          <input type="checkbox" checked={isDark} readOnly />
          <span className="button"></span>
          <span className="label">☾</span>
        </div>
      </div>)}
    </div>
  );
};

export default ChangeMode;
