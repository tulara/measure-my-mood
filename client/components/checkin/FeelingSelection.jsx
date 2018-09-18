import React, {Component} from 'react';
import {SAVE_PROGRESS} from './CheckIn/CheckIn';
import {Error} from '../Error/Error';

import './FeelingSelection.scss';

const FEELINGS = ["depressed", "optimistic", "bored", "happy", "excited", "proud"]

class FeelingSelection extends Component {

  setButtonText = (saveProgress) => {
    let buttonText = "Check in";

    if(saveProgress === SAVE_PROGRESS.FAILED){
      buttonText = "Try Again";
    } else if (saveProgress === SAVE_PROGRESS.SAVING) {
      buttonText = "Checking in...";
    }
    return buttonText;
  }

  setItemClass = (item) => {
    return this.props.feelings.includes(item) ?
       "feelings-item_selected" :
       "feelings-item_unselected"
  }

  setFeelingsListClass = () => {
    let listClass = "feelings-list";
    if (this.props.error){
      return `${listClass} feelings-list_error`;
    }
    return listClass;
  }

  handleClick = (item) => {
    this.props.setFeeling(item);
  }

  render() {
    let buttonText = this.setButtonText(this.props.progress);
    let feelingsListClass = this.setFeelingsListClass();

    return (
      <div>
        <ul className={feelingsListClass}>
          {FEELINGS.map((item, index) => {
            return (
              <li
                className={`feelings-item ${this.setItemClass(item)}`}
                key={index}
                onClick={() => {this.handleClick(item)}}>
                {item}
              </li>)
          })}
        </ul>
        <div>
        {
          this.props.error &&
            <Error message="Please select a feeling before checking in"/>
        }
        <textarea
          wrap="soft"
          className="feelings-comments"
          onChange={(event) => {this.props.setComments(event.target.value)}}
          placeholder="Optionally record a few notes about how you feel" /></div>
        <button
        className="check-in_button"
        disabled={this.props.progress === SAVE_PROGRESS.SAVING}
        >
          {buttonText}
      </button>
      </div>)
    }
}

export {FeelingSelection};
