import { InsightSummary } from './InsightSummary';
import React from 'react';
import { mount, render } from 'enzyme';

describe("InsightSummary", () => {
  it("should render a placeholder summary when there are no mood entries", () => {
    const wrapper = mount(
      <InsightSummary entries={[]} />
    );

    expect(wrapper.exists('.insight-summary_icon-placeholder')).toBe(true);

    const percentage = wrapper.find('.insight-summary_percentage-inner');
    expect(percentage.text()).toEqual("0%");
  });

  it("should calculate average mood as a percentage rounded to nearest integer", () => {
    const moods = [1, 3, 7];

    const wrapper = mount(
      <InsightSummary entries={moods} />
    );

    const percentage = wrapper.find('.insight-summary_percentage-inner');
    expect(percentage.text()).toEqual("52%");

    const averageIcon = wrapper.find('.insights-summary_icon').getDOMNode();

    // average of 4 matches to neutral icon
    expect(averageIcon.attributes.getNamedItem('src').value).toEqual("neutral.svg");
  });
});
