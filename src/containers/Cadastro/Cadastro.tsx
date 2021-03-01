import { Form, useForm } from '@nstseek/react-forms';
import { FormBuilder } from '@nstseek/react-forms/hooks/form';
import { checkValidity, cpf, required } from '@nstseek/react-forms/validators';
import { ReactUIContext } from '@nstseek/react-ui/context';
import usePaciente from 'hooks/paciente-hook';
import moment from 'moment';
import React, { useContext, useEffect } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { PacienteForm, Sexo, Status } from 'typings/paciente';
import './Cadastro.scss';

/**
 * Objeto que define as configurações do formulário a ser criado
 */
const formPacienteConfig: FormBuilder<PacienteForm> = {
  status: {
    initialValue: '',
    validators: [required('Ativo')],
    selectOptions: {
      label: 'Status',
      includeStyles: false,
      options: [
        {
          key: 'Selecione um valor',
          value: null,
          hidden: true
        },
        {
          key: 'Ativo',
          value: Status.Ativo
        },
        {
          key: 'Inativo',
          value: Status.Inativo
        }
      ]
    }
  },
  cpf: {
    initialValue: '',
    validators: [cpf],
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
    getter: function (this) {
      return moment(new Date(this._value));
    },
    validators: [required('data de nascimento')],
    inputOptions: {
      label: 'Data de nascimento',
      type: 'date',
      hideRequired: true,
      includeStyles: false
    }
  },
  sexo: {
    initialValue: '',
    validators: [required('sexo')],
    selectOptions: {
      label: 'Sexo',
      includeStyles: false,
      options: [
        {
          key: 'Selecione um valor',
          value: null,
          hidden: true
        },
        {
          key: 'Masculino',
          value: Sexo.Masculino
        },
        {
          key: 'Feminino',
          value: Sexo.Feminino
        }
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
    validators: [required('nome')],
    inputOptions: {
      label: 'Nome',
      hideRequired: true,
      placeholder: 'Digite seu nome',
      type: 'text',
      includeStyles: false
    }
  }
};

/**
 * Componente de formulário para alterar e criar novos pacientes
 */
const Cadastro: React.FC = () => {
  const formPaciente = useForm(formPacienteConfig);
  const uiCtx = useContext(ReactUIContext);
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const {
    pacientes,
    addPaciente,
    editPaciente,
    getPacienteById,
    clearStorage
  } = usePaciente(true);

  useEffect(() => {
    const paciente = getPacienteById(Number(id));
    if (paciente) {
      formPaciente.patchValue({
        ...pacientes[paciente.index],
        dataNascimento: (pacientes[paciente.index]
          .dataNascimento as string).split('T')[0]
      });
    } else {
      formPaciente.reset();
    }
  }, [id]);

  const saveForm = () => {
    if (!checkValidity(formPaciente, uiCtx.addModal)) {
      return;
    }
    if (moment(formPaciente.value.dataNascimento).isAfter(moment())) {
      uiCtx.addModal({
        desc: 'A data de nascimento não pode ser depois de hoje',
        title: 'Erro de validação',
        type: 'error'
      });
      return;
    }

    const editing = !!getPacienteById(Number(id));

    if (
      (!editing &&
        pacientes.findIndex(
          (paciente) => paciente.cpf === formPaciente.value.cpf
        ) > -1) ||
      (editing &&
        pacientes.findIndex(
          (paciente) => paciente.cpf === formPaciente.value.cpf
        ) > -1 &&
        formPaciente.value.cpf !== getPacienteById(Number(id)).data.cpf)
    ) {
      uiCtx.addModal({
        desc: 'Esse CPF já foi cadastrado',
        title: 'Erro de validação',
        type: 'error'
      });
      return;
    }

    if (editing) {
      editPaciente(Number(id), formPaciente.value);
    } else {
      addPaciente(formPaciente.value);
    }
    formPaciente.reset();
    history.push('/');
  };

  return (
    <div className='Cadastro'>
      {id && !getPacienteById(Number(id)) ? <Redirect to='/' /> : null}
      <h3>Dados</h3>
      <Form form={formPaciente} />
      <div className='buttons'>
        <button onClick={saveForm}>
          <i className='fas fa-save' />
          Salvar
        </button>
        <button onClick={formPaciente.reset}>
          <i className='fas fa-eraser' />
          Limpar
        </button>
        {getPacienteById(Number(id)) ? (
          <button
            onClick={() => {
              formPaciente.reset();
              history.push('/');
            }}>
            <i className='fas fa-times' />
            Cancelar edição
          </button>
        ) : null}

        <button onClick={clearStorage}>
          <i className='fas fa-eraser' />
          Apagar todos os dados
        </button>
      </div>
    </div>
  );
};

export default Cadastro;
