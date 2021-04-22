import React from 'react';
import { shallow } from 'enzyme';
import MyStudents from '../components/my_students';
import {Button} from 'react-bootstrap';

describe("Index Page", () => {
  it("should render my component", () => {
    const wrapper = shallow(<MyStudents />);
    expect(wrapper.containsMatchingElement(<h1 style={{ marginLeft: "20px" }}>My Students</h1>)).toEqual(true);
  });
});