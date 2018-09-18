import React from 'react';
import {MoodEntry} from '../MoodEntry/MoodEntry';
import {Error} from '../../Error/Error';

import './MoodTimeline.scss';

const MoodTimeline = (props) => {
  if(props.entries=== null){
    return (
      <div className="mood-timeline_error">
        <Error
          message="There was an error retrieving your mood insights.
                  Please try refreshing the page."
          />
      </div>);
  }

  return (
    <ul>
      {props.entries.map((item, i) => <MoodEntry entry={item} key={i} />)}
    </ul>
  );
}

export {MoodTimeline};
