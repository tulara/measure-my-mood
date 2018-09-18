import React from 'react';
import moment from 'moment';
import { Logger } from '../../../logging/Logger';
import { MOOD_ICONS } from '../../mood/MoodIcons';

import './MoodSummary.scss'

const extractDate = (dateTime) => {
  return {
    time: dateTime.format(moment.HTML5_FMT.TIME),
    month: dateTime.format("MMM").toUpperCase(),
    dayOfMonth: dateTime.format("D")
  }
}

const MoodSummary = (props) => {
  let localDateTime = moment.utc(props.timestamp).local();
  if(!localDateTime.isValid()) {
    Logger.error("A MoodEntry failed to render due to an invalid date");
    return null;
  }

  let {time, dayOfMonth, month} = extractDate(localDateTime);
  let iconSource = MOOD_ICONS[props.mood];

  return(<div className="mood-entry_summary">
            <div>
              <div className="mood-entry_date">
              {dayOfMonth}
              </div>
              <div className="mood-entry_month">{month}</div>
            </div>
            <div className="mood-entry_time">
              {time}
            </div>
            <img src={iconSource} className="mood-entry_icon" alt="mood icon"/>
            <div className="mood-entry_carot" onClick={props.onClick}>
              <div className="mood-entry_carot-inner" />
            </div>
          </div>)
}

export {MoodSummary};
