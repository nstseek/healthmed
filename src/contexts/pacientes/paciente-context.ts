import React from 'react';
import { Paciente } from 'typings/paciente';

/**
 * Context que contém todos os pacientes disponíveis como objeto, já convertidos de um JSON do local storage para um objeto válido no JavaScript
 */
const PacienteContext = React.createContext<{
  pacientes: Paciente[];
  setPacientes: React.Dispatch<React.SetStateAction<Paciente[]>>;
}>(null);

export default PacienteContext;
