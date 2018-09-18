import React from 'react';
import { mount } from 'enzyme';
import { CheckIn } from './CheckIn';

describe("CheckIn", () => {
  const mockCallback = jest.fn();

  it("renders mood selection as first page", () => {
    const wrapper = mount(<CheckIn onCheckIn={mockCallback}/>);
    expect(wrapper.exists(".mood-selection")).toBe(true);
  });

  it("renders feeling selection when next button is clicked", () => {
    const wrapper = mount(<CheckIn onCheckIn={mockCallback}/>);
    wrapper.find(".check-in_button").simulate("click");
    expect(wrapper.exists(".feelings-list")).toBe(true);
  });
});
