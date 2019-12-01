import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { PocketsList } from './PocketsList';
import PocketItem from '../../components/PocketItem/PocketItem';

configure({ adapter: new Adapter() });

describe('<PocketsList />', () => {
  it('Should render 3 <PocketItem /> elements', () => {
    const wrapper = shallow(<PocketsList />);
    wrapper.setProps({ pockets: {
      'GBP': {
        currency: 'GBP',
        sign: '£',
        amount: 50.00
      },
      'EUR': {
        currency: 'EUR',
        sign: '€',
        amount: 50.00
      },
      'USD': {
        currency: 'USD',
        sign: '$',
        amount: 50.00
      }
    } });
    expect(wrapper.find(PocketItem)).toHaveLength(3);
  });
});
