import {render, screen} from '@testing-library/react';
import {Login} from './index';
import {Provider} from 'react-redux';
import {Store} from '../../store'

test('Properly renders sign-in-screen', () => {
  render(<Login/>);
  expect(screen.getByText('Sign in')).to
})

