import React from 'react';
import { shallow } from 'enzyme';
import MyInstructors from '../components/my_instructors'

describe("Index Page", () => {
  it("should render my component", () => {
    const wrapper = shallow(<MyInstructors/>);
  });
});