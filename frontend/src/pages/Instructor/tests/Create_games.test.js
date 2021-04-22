import React from 'react';
import { shallow } from 'enzyme';
import CreateNewGames from '../components/create_new_game';
import {Form} from 'react-bootstrap';

describe("Create new games component", () => {
  it("should render correctly", () => {
    const wrapper = shallow(<CreateNewGames />);
    expect(wrapper.containsMatchingElement(<Form.Text>
      Game name cannot contain the following characters:
      !,@,#,",^,%,*,(,),_,-,:,;,?
    </Form.Text>)).toEqual(true);
  });
});