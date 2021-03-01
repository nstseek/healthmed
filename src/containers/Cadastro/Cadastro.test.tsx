import React from 'react';
import { shallow } from 'enzyme';
import Cadastro from './Cadastro';
import { BrowserRouter } from 'react-router-dom';

describe('<Cadastro />', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <BrowserRouter>
        <Cadastro />
      </BrowserRouter>
    );
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
