import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

/*this is an unofficial version of enzyme for react 17 and to work with it you need to follow the steps
here https://www.npmjs.com/package/@wojtekmaj/enzyme-adapter-react-17 */