import React from 'react';
import {MOOD_ICONS} from '../mood/MoodIcons';

import './MoodSelection.scss';
import './MoodSlider.scss';


const MoodSelection = (props) => {
  return (
  <div className="mood-selection">
    <img src={MOOD_ICONS[props.mood]} alt="mood selection" />
    <input
      className="mood-selection_slider"
      type="range"
      name="mood"
      min="1"
      max="7"
      value={props.mood}
      onChange={(event) => { props.setMood(event.target.value)}} />
    <br />
    <button
      className="check-in_button"
      onClick={props.onNext}
      type="button"
      >
        Next
    </button>
  </div>)
}

export {MoodSelection};
