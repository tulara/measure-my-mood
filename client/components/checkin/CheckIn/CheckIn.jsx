import React, { Component } from 'react';
import moment from 'moment';
import {Logger} from '../../../logging/Logger';
import {Error} from '../../Error/Error';
import {MoodSelection} from './../MoodSelection';
import {FeelingSelection} from './../FeelingSelection';
import {Done} from './../Done';

import {save} from './../CheckInService';

import './CheckIn.scss';

const SAVE_PROGRESS = {IDLE: "idle", SAVING: "saving:", FAILED: "failed"}
const SECTION = {
  MOOD_SELECT: 0,
  FEELING_SELECT: 1,
  DONE: 2
}

class CheckIn extends Component {
  state = {
    mood: "4",
    feelings: [],
    comments: "",
    validationError: false,
    progess: SAVE_PROGRESS.IDLE,
    section: SECTION.MOOD_SELECT
  }

  checkin = (event) => {
    event.preventDefault();

    if(!this.validateState()) return;
    this.setState({progress: SAVE_PROGRESS.SAVING});

    let {mood, feelings, comments} = this.state;
    let timestampUtc = moment.utc().toDate();
    let moodEntry = {mood, timestampUtc, feelings, comments};

    save(moodEntry, this.onSuccessfulSave, this.handleError);
  }

  onSuccessfulSave = () => {
    this.props.onCheckIn();
    this.setState({
      progress: SAVE_PROGRESS.IDLE,
      section: SECTION.DONE});
  }

  handleError = (error) => {
    Logger.error(error);
    this.setState({progress: SAVE_PROGRESS.FAILED});
  }

  nextSection = () => {
    this.setState({section: SECTION.FEELING_SELECT});
  }

  setFeeling = (feeling) => {
    if(this.state.validationError){
      this.setState({validationError:false});
    }

    if(this.state.feelings.includes(feeling)) {
      this.setState((prevState) => (
        {feelings: prevState.feelings.filter((value) => value !== feeling)})
      );
    } else {
      this.setState((prevState) => (
        {feelings: [...prevState.feelings, feeling]}));
    }
  }

  validateState = () => {
    if(this.state.feelings.length > 0) {
      return true;
    }
    this.setState({validationError: true});
    return false;
  }

  render() {
    let sections = {
      0: <MoodSelection
                  mood={this.state.mood}
                  setMood={(mood) => {this.setState({mood:mood});}}
                  onNext={this.nextSection}/>,
      1: <FeelingSelection
          error={this.state.validationError}
          feelings={this.state.feelings}
          progress={this.state.progress}
          setFeeling={this.setFeeling}
          setComments={(comments) => {this.setState({comments:comments});}}
          />,
      2:  <Done />
    }

    return (
      <div>
        <form className="check-in" onSubmit={this.checkin}>
          {sections[this.state.section]}
        </form>
      {this.state.progress === SAVE_PROGRESS.FAILED &&
        <Error message="There was a problem saving, please try again" /> }
      </div>
    )
  }
}

export {CheckIn, SAVE_PROGRESS};
