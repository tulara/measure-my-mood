import React, { Component } from 'react';
import { MoodTimeline } from './components/insights/MoodTimeline/MoodTimeline';
import { CheckIn } from './components/checkin/CheckIn/CheckIn';
import { InsightSummary } from './components/insights/InsightSummary/InsightSummary';
import { Logger } from './logging/Logger';
import './App.scss';

class App extends Component {
  state = {
    data: []
  }

  componentDidMount(){
      this.updateMoods();
  }

  updateMoods = () => {
    this.getDatas()
      .then(response => this.setState({data: response}))
      .catch(err => {
        Logger.error(err);
        this.setState({data: null});
      });
  }

  getDatas = async () => {
    const response = await fetch('/mood');
    const body = await response.json();
    return body;
  }

  getMoods = (data) => {
    if (data === null) return [];
    return data.map((entry) => entry.mood);
  }

  render() {
    return (
      <div className="app">
        <CheckIn onCheckIn={this.updateMoods} />
        <div className="insights">
          <InsightSummary entries={this.getMoods(this.state.data)}/>
          <MoodTimeline entries={this.state.data}/>
        </div>
      </div>
    );
  }
}

export default App;
