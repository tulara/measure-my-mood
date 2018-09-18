import React, { Component } from 'react';
import {MoodSummary} from './MoodSummary';

import './MoodEntry.scss';

class MoodEntry extends Component {
  state = {
    expandDetails: false
  }

  handleClick = () => {
    this.setState((prevState) => (
      {expandDetails: !prevState.expandDetails}
    ));
  }

  render() {
    return (
      <li className="mood-entry">
          <MoodSummary
            timestamp={this.props.entry.timestampUtc}
            mood={this.props.entry.mood}
            onClick={this.handleClick}/>

          {this.state.expandDetails &&
            <div className="mood-entry_details">
              <div className="mood-entry_feelings">
              {this.props.entry.feelings.map(
                (item, i) => <span
                            key={i}
                            className="mood-entry_feeling">{item}</span>)}
              </div>
              <div className="mood-entry_comments">
              {this.props.entry.comments}
              </div>
            </div>}
      </li>
    );
  }
}

export {MoodEntry};
