import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import CardPaciente from './CardPaciente';
import PacienteContext from 'contexts/pacientes/paciente-context';
import MockPacientes from 'mocks/models/pacientes';
import { Status } from 'typings/paciente';

const mockPush = jest.fn();
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockPush
  })
}));

const mockRemovePaciente = jest.fn();
const mockEditPaciente = jest.fn();
jest.mock('hooks/paciente-hook', () => () => ({
  removePaciente: mockRemovePaciente,
  editPaciente: mockEditPaciente
}));

describe('<CardPaciente />', () => {
  let component: ReactWrapper<typeof CardPaciente>;

  beforeEach(() => {
    component = mount(
      <PacienteContext.Provider
        value={{ pacientes: MockPacientes, setPacientes: () => null }}>
        <CardPaciente paciente={MockPacientes[0]} />
      </PacienteContext.Provider>
    );
    mockPush.mockClear();
  });

  describe('Básico', () => {
    it('deve montar corretamente', () => {
      expect(component.length).toBe(1);
    });
  });

  describe('Layout', () => {
    it('deve mostrar os dados do paciente', () => {
      expect(component.find('div.data').length).toEqual(1);
    });

    it('deve mostrar três botões de ação', () => {
      expect(component.find('div.buttons > button').length).toEqual(3);
    });
  });

  describe('Ações', () => {
    it('deve redirecionar a página ao clicar no botão de edição para o id do paciente', () => {
      component.find('button#edit').first().simulate('click');
      expect(mockPush).toHaveBeenCalledWith('/' + MockPacientes[0].id);
    });

    it('deve chamar o método de remoção do paciente com o id correto ao clicar no botão de deleção', () => {
      component.find('button#delete').first().simulate('click');
      expect(mockRemovePaciente).toHaveBeenCalledWith(MockPacientes[0].id);
    });

    it('deve chamar o método de edição do paciente com o id e os dados corretos ao clicar no botão que altera o status', () => {
      component.find('button#toggle').first().simulate('click');
      expect(mockEditPaciente).toHaveBeenCalledWith(MockPacientes[0].id, {
        ...MockPacientes[0],
        status:
          MockPacientes[0].status === Status.Ativo
            ? Status.Inativo
            : Status.Ativo
      });
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });
});
