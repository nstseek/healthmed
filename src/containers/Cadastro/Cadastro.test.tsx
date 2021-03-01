/* eslint-disable react/display-name */
import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import Cadastro from './Cadastro';
import PacienteContext from 'contexts/pacientes/paciente-context';
import MockPacientes from 'mocks/models/pacientes';
import moment from 'moment';
import { ReactUIContext, useRootContext } from '@nstseek/react-ui/context';

const originalForm = {
  state: {
    status: { value: '1', _value: '1', errors: [] },
    cpf: { value: '874.673.050-87', _value: '874.673.050-87', errors: [] },
    dataNascimento: {
      value: '1981-10-06T00:00:00.000Z',
      _value: '1981-10-06',
      errors: []
    },
    sexo: { value: '1', _value: '1', errors: [] },
    endereco: { value: 'Av. Cavalhada', _value: 'Av. Cavalhada', errors: [] },
    nome: { value: 'Mateus Marques', _value: 'Mateus Marques', errors: [] }
  },
  invalid: false,
  patchValue: () => null,
  reset: jest.fn(),
  value: {
    status: '1',
    cpf: '874.673.050-87',
    dataNascimento: '1981-10-06T00:00:00.000Z',
    sexo: '1',
    endereco: 'Av. Cavalhada',
    nome: 'Mateus Marques'
  },
  builder: {
    status: {
      initialValue: '',
      validators: [{ id: 'required' }],
      selectOptions: {
        label: 'Status',
        includeStyles: false,
        options: [
          { key: 'Selecione um valor', value: null, hidden: true },
          { key: 'Ativo', value: 1 },
          { key: 'Inativo', value: 2 }
        ]
      }
    },
    cpf: {
      initialValue: '',
      validators: [{ id: 'cpf' }],
      inputOptions: {
        label: 'CPF',
        type: 'text',
        mask: '999.999.999-99',
        placeholder: 'Insira seu CPF',
        includeStyles: false
      }
    },
    dataNascimento: {
      initialValue: '',
      validators: [{ id: 'required' }],
      inputOptions: {
        label: 'Data de nascimento',
        type: 'date',
        hideRequired: true,
        includeStyles: false
      }
    },
    sexo: {
      initialValue: '',
      validators: [{ id: 'required' }],
      selectOptions: {
        label: 'Sexo',
        includeStyles: false,
        options: [
          { key: 'Selecione um valor', value: null, hidden: true },
          { key: 'Masculino', value: 1 },
          { key: 'Feminino', value: 2 }
        ]
      }
    },
    endereco: {
      initialValue: '',
      inputOptions: {
        label: 'Endereço',
        placeholder: 'Digite seu endereço',
        type: 'text',
        includeStyles: false
      }
    },
    nome: {
      initialValue: '',
      validators: [{ id: 'required' }],
      inputOptions: {
        label: 'Nome',
        hideRequired: true,
        placeholder: 'Digite seu nome',
        type: 'text',
        includeStyles: false
      }
    }
  }
};
let mockFormData: typeof originalForm = Object.create(originalForm);
jest.mock('@nstseek/react-forms', () => ({
  useForm: () => mockFormData,
  Form: () => <form id='form-test'>testing form</form>
}));

const mockValidity = { value: true };
jest.mock('@nstseek/react-forms/validators', () => ({
  checkValidity: () => mockValidity.value,
  required: () => null,
  cpf: () => null
}));

const mockPush = jest.fn();
const mockId = { id: null };
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockPush
  }),
  useParams: () => mockId,
  Redirect: () => <a id='redirect'></a>
}));

const mockGetPacienteById = jest.fn();
const mockEditPaciente = jest.fn();
const mockAddPaciente = jest.fn();
const mockClearStorage = jest.fn();
jest.mock('hooks/paciente-hook', () => () => ({
  getPacienteById: mockGetPacienteById,
  editPaciente: mockEditPaciente,
  addPaciente: mockAddPaciente,
  clearStorage: mockClearStorage,
  pacientes: MockPacientes
}));

describe('<Cadastro />', () => {
  let component: ReactWrapper<typeof Cadastro>;

  const refreshComponent = () => {
    component = mount(
      <ReactUIContext.Provider value={{ addModal: () => null } as any}>
        <PacienteContext.Provider
          value={{ pacientes: MockPacientes, setPacientes: () => null }}>
          <Cadastro />
        </PacienteContext.Provider>
      </ReactUIContext.Provider>
    );
  };

  beforeEach(() => {
    refreshComponent();
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

    it('deve instanciar dois botões quando não existe um id válido na rota nem pacientes no sistema', () => {
      refreshComponent();
      expect(component.find('#save')).toBeTruthy();
      expect(component.find('#clear')).toBeTruthy();
    });

    it('deve instanciar três botões quando não existe um id válido na rota', () => {
      expect(component.find('#save')).toBeTruthy();
      expect(component.find('#clear')).toBeTruthy();
      expect(component.find('#erase')).toBeTruthy();
    });

    it('deve instanciar quatro botões quando existe um id válido na rota', () => {
      mockId.id = MockPacientes[0].id;
      refreshComponent();
      expect(component.find('#save')).toBeTruthy();
      expect(component.find('#clear')).toBeTruthy();
      expect(component.find('#erase')).toBeTruthy();
      expect(component.find('#cancel')).toBeTruthy();
    });
  });

  describe('Ações', () => {
    beforeEach(() => {
      mockFormData = Object.create(originalForm);
      mockValidity.value = true;
      mockGetPacienteById.mockClear();
      mockAddPaciente.mockClear();
    });
    it('deve chamar a função de save, salvando o formulário e adicionando um novo paciente', () => {
      refreshComponent();
      mockGetPacienteById.mockClear();
      component.find('#save').simulate('click');
      expect(mockGetPacienteById).toHaveBeenCalledWith(MockPacientes[0].id);
      expect(mockAddPaciente).toHaveBeenCalledWith(mockFormData.value);
    });
    it('deve chamar a função de save, salvando o formulário e editando um paciente existente', () => {
      mockGetPacienteById.mockReturnValue({
        index: 1,
        paciente: MockPacientes[1]
      });
      mockId.id = MockPacientes[1].id;
      refreshComponent();
      mockGetPacienteById.mockClear();
      component.find('#save').simulate('click');
      expect(mockGetPacienteById).toHaveBeenCalled();
      expect(mockAddPaciente).not.toHaveBeenCalled();
      expect(mockEditPaciente).toHaveBeenCalledWith(
        MockPacientes[1].id,
        mockFormData.value
      );
    });
    it('deve chamar a função de save, validando o estado do formulário', () => {
      mockValidity.value = false;
      refreshComponent();
      mockGetPacienteById.mockClear();
      component.find('#save').simulate('click');
      expect(mockGetPacienteById).not.toHaveBeenCalled();
    });
    it('deve chamar a função de save, validando a data de nascimento', () => {
      mockFormData.value.dataNascimento = moment().add(1, 'days') as any;
      refreshComponent();
      mockGetPacienteById.mockClear();
      component.find('#save').simulate('click');
      expect(mockGetPacienteById).not.toHaveBeenCalled();
    });
    it('deve chamar a função de save, reprovando o CPF por invalidez na fórmula de validação', () => {
      mockFormData.value.cpf = '000.000.000-00';
      refreshComponent();
      mockGetPacienteById.mockClear();
      component.find('#save').simulate('click');
      expect(mockGetPacienteById).not.toHaveBeenCalled();
    });
    it('deve chamar a função de save, reprovando o CPF por já existir esse CPF na base', () => {
      mockFormData.value.cpf = '169.233.050-04';
      refreshComponent();
      mockGetPacienteById.mockClear();
      component.find('#save').simulate('click');
      expect(mockGetPacienteById).not.toHaveBeenCalled();
    });
    it('deve resetar o form ao clicar no botão', () => {
      component.find('#clear').simulate('click');
      expect(mockFormData.reset).toHaveBeenCalled();
    });
    it('deve limpar todos os registros do armazenamento', () => {
      component.find('#erase').simulate('click');
      expect(mockClearStorage).toHaveBeenCalled();
    });
    it('deve limpar todos os registros do armazenamento', () => {
      mockFormData.reset.mockClear();
      mockPush.mockClear();
      mockGetPacienteById.mockReturnValue({
        index: 1,
        paciente: MockPacientes[1]
      });
      refreshComponent();
      component.find('#cancel').simulate('click');
      expect(mockFormData.reset).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith('/');
    });
    it('deve redirecionar a página quando o id acessado não existe no armazenamento', () => {
      mockId.id = -50;
      mockGetPacienteById.mockReturnValue(null);
      refreshComponent();
      expect(component.find('#redirect').length).toEqual(1);
    });
  });
});
