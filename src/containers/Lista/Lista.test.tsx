import React from 'react';
import { shallow } from 'enzyme';
import Lista from './Lista';
import PacienteContext from 'contexts/pacientes/paciente-context';

describe('<Lista />', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <PacienteContext.Provider
        value={{ pacientes: [], setPacientes: () => null }}>
        <Lista />
      </PacienteContext.Provider>
    );
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
