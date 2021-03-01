import React from 'react';
import { shallow } from 'enzyme';
import CardPaciente from './CardPaciente';
import PacienteContext from 'contexts/pacientes/paciente-context';
import { Sexo, Status } from 'typings/paciente';

describe('<CardPaciente />', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <PacienteContext.Provider
        value={{ pacientes: [], setPacientes: () => null }}>
        <CardPaciente
          paciente={{
            cpf: '071.069.530-67',
            dataNascimento: '2021-02-28T00:00:00.000Z',
            endereco: 'Av. Caralhada, 255, Ipanema, Porto Alegre - RS',
            id: 8,
            nome: 'João Carlos da Silva',
            sexo: Sexo.Masculino,
            status: Status.Ativo
          }}
        />
      </PacienteContext.Provider>
    );
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
