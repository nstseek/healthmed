import React from 'react';
import { mount } from 'enzyme';
import Cadastro from './Cadastro';
import { BrowserRouter } from 'react-router-dom';
import PacienteContext from 'contexts/pacientes/paciente-context';
import MockPacientes from 'mocks/models/pacientes';

describe('<Cadastro />', () => {
  let component;

  beforeEach(() => {
    component = mount(
      <PacienteContext.Provider
        value={{ pacientes: MockPacientes, setPacientes: () => null }}>
        <BrowserRouter>
          <Cadastro />
        </BrowserRouter>
      </PacienteContext.Provider>
    );
  });

  describe('Basic', () => {
    it('Should mount', () => {
      expect(component.length).toBe(1);
    });
  });
});
