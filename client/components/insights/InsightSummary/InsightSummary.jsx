import React from 'react';

import './InsightSummary.scss';
import { MOOD_ICONS } from '../../mood/MoodIcons';
import asleep from '../../../assets/svg/asleep.svg';

const roundedPercentage = (entries) => {
  let count = entries.length;
  if (count === 0 ) return {percentage:0, count:0, average:0};

  // Assumes MOOD_ICONS are incremented sequentially
  let highestMoodScorePossible = Object.keys(MOOD_ICONS).length;
  let sum = entries.reduce((prev, current) => {return prev + current}, 0);
  let average = Math.round(sum/count);

  let percentage = Math.round(sum/(highestMoodScorePossible*count)*100);

  return {percentage, count, average};
}

const InsightSummary = (props) => {
  let {percentage, count, average} = roundedPercentage(props.entries);

  return(<div className="insight-summary">

    {count > 0 ?
    <img className="insights-summary_icon" src={MOOD_ICONS[average]} alt="your average mood" /> :
    <img className="insights-summary_icon insight-summary_icon-placeholder"
         src={asleep}
         alt="check in for insights" />}

    <div className="insight-summary_percentage">
      <div className="insight-summary_percentage-inner">
        {percentage}%
      </div>
      <p>
      Based on {count} entries
      </p>
    </div>
  </div>);
}

export {InsightSummary};
