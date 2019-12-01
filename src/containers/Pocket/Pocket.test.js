import React from 'react';
import { MemoryRouter, Route, Redirect, Link } from 'react-router-dom';

import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Pocket } from './Pocket';
import History from '../../components/History/History';
import ExchangeUI from '../../components/ExchangeUI/ExchangeUI';
import OtherPockets from '../../components/OtherPockets/OtherPockets';
import PocketCard from '../../components/PocketCard/PocketCard';
import PocketItem from '../../components/PocketItem/PocketItem';

configure({ adapter: new Adapter() });

const pockets = {
  pockets: {
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
  }
};

describe('<Pocket /> at /GBP', () => {
  it('Should redirect to / if no such pocket', () => {
    const wrapper = shallow(
      <Pocket
        match={{ params: { currencyFrom: 'GBP' }}}
        pockets={{ pockets: {} }}
        onGetExchangeRates={() => {}}
      />
    );
    expect(wrapper.find(Redirect)).toHaveLength(1);
  });

  it('Should render <PocketCard />', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/GBP"]}>
        <Pocket
          match={{ params: { currencyFrom: 'GBP' }}}
          pockets={pockets}
          onGetExchangeRates={() => {}}
          rates={{}}
        />
      </MemoryRouter>
    );

    expect(wrapper.find(PocketCard)).toHaveLength(1);
  });

  it('Should render link to exchange', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/GBP"]}>
        <Pocket
          match={{ params: { currencyFrom: 'GBP' }}}
          pockets={pockets}
          onGetExchangeRates={() => {}}
          rates={{}}
        />
      </MemoryRouter>
    );

    expect(wrapper.contains(<Link to="/GBP/exchange">Exchange</Link>)).toEqual(true);
  });

  it('Should render <History />', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/GBP"]}>
        <Pocket
          match={{ params: { currencyFrom: 'GBP' }}}
          pockets={pockets}
          onGetExchangeRates={() => {}}
          rates={{}}
        />
      </MemoryRouter>
    );

    expect(wrapper.find(History)).toHaveLength(1);
  });
});

describe('<Pocket /> at /GBP/exchange', () => {
  it('Should render <PocketCard />', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/GBP/exchange"]}>
        <Pocket
          match={{ params: { currencyFrom: 'GBP' }}}
          pockets={pockets}
          onGetExchangeRates={() => {}}
          rates={{ rates: {
            'GBP': 1,
            'EUR': 1,
            'USD': 1
          } }}
        />
      </MemoryRouter>
    );

    expect(wrapper.find(PocketCard)).toHaveLength(1);
  });

  it('Should render <OtherPockets />', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/GBP/exchange"]}>
        <Pocket
          match={{ params: { currencyFrom: 'GBP' }}}
          pockets={pockets}
          onGetExchangeRates={() => {}}
          rates={{ rates: {
            'GBP': 1,
            'EUR': 1,
            'USD': 1
          } }}
        />
      </MemoryRouter>
    );

    expect(wrapper.find(OtherPockets)).toHaveLength(1);
  });
});

describe('<Pocket /> at /GBP/exchange/EUR', () => {
  it('Should render 2 <PocketCard />', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/GBP/exchange/EUR"]}>
        <Pocket
          match={{ params: { currencyFrom: 'GBP', currencyTo: 'EUR' }}}
          pockets={pockets}
          onGetExchangeRates={() => {}}
          rates={{ rates: {
            'GBP': 1,
            'EUR': 1,
            'USD': 1
          } }}
        />
      </MemoryRouter>
    );

    expect(wrapper.find(PocketCard)).toHaveLength(2);
  });

  it('Should render <ExchangeUI />', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/GBP/exchange/EUR"]}>
        <Pocket
          match={{ params: { currencyFrom: 'GBP', currencyTo: 'EUR' }}}
          pockets={pockets}
          onGetExchangeRates={() => {}}
          rates={{ rates: {
            'GBP': 1,
            'EUR': 1,
            'USD': 1
          } }}
        />
      </MemoryRouter>
    );

    expect(wrapper.find(ExchangeUI)).toHaveLength(1);
  });
});
