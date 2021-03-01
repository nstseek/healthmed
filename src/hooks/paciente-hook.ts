import PacienteContext from 'contexts/pacientes/paciente-context';
import { useContext, useEffect, useState } from 'react';
import { Paciente, PacienteForm } from 'typings/paciente';

declare const localStorage: Storage & { pacientes: string };

/**
 * Hook que controla a manipulação de dados entre o storage e os componentes
 * @param fetchDataOnInit - Define se o hook irá atualizar seus dados puxando do local storage na sua inicialização
 */
const usePaciente = (fetchDataOnInit = false) => {
  const { pacientes, setPacientes } = useContext(PacienteContext);
  const fetchNextId = () => {
    let tmpId = 0;
    try {
      JSON.parse(localStorage.pacientes)?.forEach((paciente) => {
        if (paciente.id > tmpId) {
          tmpId = paciente.id;
        }
      });
    } catch (err) {
      return ++tmpId;
    }
    return ++tmpId;
  };
  const [nextId, setNextId] = useState(fetchNextId());

  const refreshData = (refreshId = false) => {
    if (refreshId) {
      setNextId(fetchNextId());
    }
    try {
      setPacientes(
        localStorage.pacientes ? JSON.parse(localStorage.pacientes) : []
      );
    } catch (err) {
      localStorage.clear();
      setPacientes([]);
    }
  };

  useEffect(() => {
    if (fetchDataOnInit) {
      try {
        setPacientes(
          localStorage.pacientes ? JSON.parse(localStorage.pacientes) : []
        );
      } catch (err) {
        localStorage.clear();
        setPacientes([]);
      }
    }
  }, []);

  const clearStorage = () => {
    localStorage.clear();
    refreshData(true);
  };

  const addPaciente = (paciente: PacienteForm) => {
    localStorage.pacientes = JSON.stringify([
      ...pacientes,
      { ...paciente, id: nextId }
    ]);
    refreshData(true);
  };

  const getPacienteById = (id: number): { index: number; data: Paciente } => {
    const pacienteIndex = pacientes.findIndex((paciente) => paciente.id === id);
    return pacienteIndex > -1
      ? { index: pacienteIndex, data: pacientes[pacienteIndex] }
      : null;
  };

  const removePaciente = (id: number) => {
    const pacientesTmp = [...pacientes];
    const paciente = getPacienteById(id);
    if (paciente.index > -1) {
      pacientesTmp.splice(paciente.index, 1);
      localStorage.pacientes = JSON.stringify(pacientesTmp);
      refreshData();
    }
  };

  const editPaciente = (id: number, newPaciente: PacienteForm) => {
    const pacientesTmp = [...pacientes];
    const paciente = getPacienteById(id);
    if (paciente.index > -1) {
      pacientesTmp[paciente.index] = {
        ...pacientesTmp[paciente.index],
        ...newPaciente
      };
      localStorage.pacientes = JSON.stringify(pacientesTmp);
      refreshData();
    }
  };

  return {
    pacientes,
    addPaciente,
    removePaciente,
    editPaciente,
    getPacienteById,
    clearStorage
  };
};

export default usePaciente;
