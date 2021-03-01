import usePaciente from 'hooks/paciente-hook';
import moment from 'moment';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Paciente, Sexo, Status } from 'typings/paciente';
import './CardPaciente.scss';

interface Props {
  paciente: Paciente;
}

/**
 * Componente que gerencia a visualização de um paciente,
 * permitindo que o usuário realize ações básicas na entidade passada a ele e formatando os dados crus para informações legíveis na tela
 * @param paciente - O paciente que deve ser exibido através desse componente
 */
const CardPaciente: React.FC<Props> = ({ paciente }) => {
  const history = useHistory();
  const { removePaciente, editPaciente } = usePaciente();

  const toggleStatus = () => {
    editPaciente(paciente.id, {
      ...paciente,
      status: paciente.status === Status.Ativo ? Status.Inativo : Status.Ativo
    });
    history.push('/');
  };

  const getIdade = () => {
    let diff = moment().diff(moment(paciente.dataNascimento), 'years');
    if (diff) {
      return `${diff} ano${diff > 1 ? 's' : ''}`;
    }
    diff = moment().diff(moment(paciente.dataNascimento), 'months');
    if (diff) {
      return `${diff} m${diff > 1 ? 'eses' : 'ês'}`;
    }
    diff = moment().diff(moment(paciente.dataNascimento), 'days');
    if (diff) {
      return `${diff} dia${diff > 1 ? 's' : ''}`;
    }
  };

  return (
    <div className='CardPaciente'>
      <div className='data'>
        <h3>{paciente.nome}</h3>
        <p>
          <b>CPF:</b> {paciente.cpf}
        </p>
        <p>
          <b>Data de nascimento:</b>{' '}
          {moment(paciente.dataNascimento).format('LL')} - {getIdade()} de idade
        </p>
        {paciente.endereco ? (
          <p>
            <b>Endereço:</b> {paciente.endereco}
          </p>
        ) : null}
        <p>
          <b>Sexo:</b> {Sexo[paciente.sexo]}
        </p>
        <p>
          <b>Status:</b> {Status[paciente.status]}
        </p>
      </div>
      <div className='buttons'>
        <button id='toggle' onClick={toggleStatus}>
          <i
            className={`fas fa-toggle-${
              paciente.status === Status.Ativo ? 'on' : 'off'
            }`}></i>
          Alterar status
        </button>
        <button id='edit' onClick={() => history.push('/' + paciente.id)}>
          <i className='fas fa-edit'></i>
          Editar
        </button>
        <button id='delete' onClick={() => removePaciente(paciente.id)}>
          <i className='fas fa-trash'></i>
          Excluir
        </button>
      </div>
    </div>
  );
};

export default CardPaciente;
