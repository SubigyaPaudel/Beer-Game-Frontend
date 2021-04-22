import React from 'react';
import { shallow } from 'enzyme';
import EditGames from '../components/edit_games'
import {Button} from 'react-bootstrap';

describe("Edit games component", () => {
  it("should render correctly", () => {
    const wrapper = shallow(<EditGames/>);
    expect(wrapper.containsMatchingElement(<Button type="submit">Submit form</Button>)).toEqual(true);
  });
});