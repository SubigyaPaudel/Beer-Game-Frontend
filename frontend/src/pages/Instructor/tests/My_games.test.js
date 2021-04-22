import React from 'react';
import { shallow } from 'enzyme';
import My_Games from '../components/my_games'

describe("My Games component", () => {
  it("should render correctly", () => {
    const wrapper = shallow(<My_Games />);
    expect(wrapper.containsMatchingElement(<h1>My Games</h1>)).toEqual(true);
  });
});