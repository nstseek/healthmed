/* eslint-disable react/display-name */
import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import Lista from './Lista';
import PacienteContext from 'contexts/pacientes/paciente-context';
import MockPacientes from 'mocks/models/pacientes';

const mockFormData = {
  state: { query: { value: '', _value: '', errors: [] } },
  invalid: false,
  value: { query: '' },
  builder: {
    query: {
      initialValue: '',
      inputOptions: {
        label: '',
        hideLabel: true,
        type: 'text',
        placeholder: 'Pesquise o paciente por nome aqui',
        includeStyles: false
      }
    }
  }
};
const mockForm = jest.fn().mockReturnValue(null);
jest.mock('@nstseek/react-forms', () => ({
  useForm: function () {
    return mockFormData;
  },
  Form: (props) => {
    mockForm(props);
    return <form id='form-test'>testing form</form>;
  }
}));

describe('<Lista />', () => {
  let component: ReactWrapper<typeof Lista, any>;

  beforeEach(() => {
    component = mount(
      <PacienteContext.Provider
        value={{ pacientes: MockPacientes, setPacientes: () => null }}>
        <Lista />
      </PacienteContext.Provider>
    );
  });

  describe('Básico', () => {
    it('deve montar', () => {
      expect(component.length).toBe(1);
    });
  });

  describe('Layout', () => {
    it('deve instanciar o componente de Form', () => {
      expect(component.find('#form-test').length).toEqual(1);
    });

    it('deve instanciar um CardPaciente para cada resultado com a barra de pesquisa limpa', () => {
      expect(component.find('.CardPaciente').length).toEqual(
        MockPacientes.length
      );
    });
  });

  describe('Ações', () => {
    it('deve pesquisar pelo nome presente no formulário e retornar a mensagem de nenhum resultado encontrado', () => {
      mockFormData.value.query = 'Teste';
      component = mount(
        <PacienteContext.Provider
          value={{ pacientes: [MockPacientes[0]], setPacientes: () => null }}>
          <Lista />
        </PacienteContext.Provider>
      );
      expect(component.find('.CardPaciente').length).toEqual(0);
      expect(component.find('#no-results-found').length).toEqual(1);
    });

    it('deve pesquisar pelo nome presente no formulário e retornar um resultado', () => {
      mockFormData.value.query = 'João';
      component = mount(
        <PacienteContext.Provider
          value={{ pacientes: [MockPacientes[0]], setPacientes: () => null }}>
          <Lista />
        </PacienteContext.Provider>
      );
      expect(component.find('.CardPaciente').length).toEqual(1);
      expect(component.find('#no-results-found').length).toEqual(0);
    });
  });
});
