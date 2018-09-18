import React from 'react';
import tick from '../../assets/svg/checked.svg';

import './Done.scss';

const Done = (props) => {
  return(
    <div className="check-in_done">
      <img src={tick} className="check-in_done-icon" alt="thanks for checking in"/>
      <p className="check-in_done-text"> Thanks for checking in! </p>
    </div>
    );
}

export {Done};
