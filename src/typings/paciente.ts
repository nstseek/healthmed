import { Moment } from 'moment';

/**
 * Enum que contém as possíveis opções para definir o sexo do paciente
 */
export enum Sexo {
  Masculino = 1,
  Feminino
}

/**
 * Enum que contém as possíveis opções para definir o status do paciente
 */
export enum Status {
  Ativo = 1,
  Inativo
}

/**
 * Interface que define os dados contidos em um formulário do paciente
 */
export interface PacienteForm {
  nome: string;
  dataNascimento: Moment | string;
  cpf: string;
  sexo: Sexo;
  endereco: string;
  status: Status;
}

/**
 * Interface que define os dados contidos em um objeto paciente salvo no local storage
 */
export interface Paciente extends PacienteForm {
  id: number;
}
