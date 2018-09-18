import React from 'react';
import { MoodTimeline } from './MoodTimeline';
import { MoodEntry } from '../MoodEntry/MoodEntry';
import { mount, shallow } from 'enzyme';

describe("MoodTimeline", () => {

  const entries = [
    {
      mood: 4,
      timestampUtc: "2018-09-17T08:05:41.634Z",
      feelings: ["happy"],
      comments: "exceptionally so"
    }, {
      mood: 1,
      timestampUtc: "2018-09-15T08:05:41.634Z",
      feelings: ["depressed"]
    }];

  it("renders error when null entries", () => {
    const wrapper = mount(
      <MoodTimeline entries={null} />
    )
    expect(wrapper.exists('.error')).toBe(true);
  });

  it("renders relevant number of mood entries", () => {
    const wrapper = mount(<MoodTimeline entries={entries}/>);

    expect(wrapper.find('ul').children().length)
      .toEqual(entries.length);
  });

  it("renders month from timestamp", () => {
    const wrapper = mount(<MoodTimeline entries={entries}/>);
    const moodEntry = wrapper.find(".mood-entry_month").first();
    expect(moodEntry.text()).toEqual("SEP");
  });

  it("renders date from timestamp", () => {
    const wrapper = mount(<MoodTimeline entries={entries}/>);
    const moodEntry = wrapper.find(".mood-entry_date").first();
    expect(moodEntry.text()).toEqual("17");
  });

  it("only renders summary by default", () => {
    const wrapper = mount(<MoodTimeline entries={entries}/>);

    expect(wrapper.exists(".mood-entry_summary")).toBe(true);
    expect(wrapper.exists(".mood-entry_details")).toBe(false);
  });

  it("renders detailed entry when carot clicked", () => {
    const wrapper = mount(<MoodTimeline entries={entries}/>);
    const moodEntryCarot = wrapper.find(".mood-entry_carot").first();
    moodEntryCarot.simulate("click");

    expect(wrapper.exists(".mood-entry_details")).toBe(true);
  });
});
