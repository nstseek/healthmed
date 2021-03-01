import { Sexo, Status } from 'typings/paciente';

const MockPacientes = [
  {
    cpf: '071.069.530-67',
    dataNascimento: '2021-02-28T00:00:00.000Z',
    endereco: 'Av. Cavalhada, 255, Ipanema, Porto Alegre - RS',
    id: 8,
    nome: 'João Carlos da Silva',
    sexo: Sexo.Masculino,
    status: Status.Ativo
  },
  {
    cpf: '169.233.050-04',
    dataNascimento: '2021-02-28T00:00:00.000Z',
    endereco: 'Av. Eduardo Prado, 478, Ipanema, Porto Alegre - RS',
    id: 9,
    nome: 'Mateus Cardoso',
    sexo: Sexo.Masculino,
    status: Status.Ativo
  }
];

export default MockPacientes;
