import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import Lista from './Lista';
import PacienteContext from 'contexts/pacientes/paciente-context';
import MockPacientes from 'mocks/models/pacientes';

describe('<Lista />', () => {
  let component: ReactWrapper<typeof Lista, any>;

  beforeEach(() => {
    component = mount(
      <PacienteContext.Provider
        value={{ pacientes: [MockPacientes[0]], setPacientes: () => null }}>
        <Lista />
      </PacienteContext.Provider>
    );
  });

  describe('Basic', () => {
    it('should mount', () => {
      expect(component.length).toBe(1);
    });
  });

  describe('Layout', () => {
    it('deve ter uma barra de pesquisa', () => {
      expect(component.find('input[name="query"]').length).toEqual(1);
    });

    it('deve instanciar um CardPaciente para cada resultado com a barra de pesquisa limpa', () => {
      expect(component.find('div.CardPaciente').length).toEqual(1);
    });
  });
});
