import { Form, useForm } from '@nstseek/react-forms';
import { FormBuilder } from '@nstseek/react-forms/hooks/form';
import usePaciente from 'hooks/paciente-hook';
import _ from 'lodash';
import React from 'react';
import CardPaciente from './CardPaciente/CardPaciente';
import './Lista.scss';

/**
 * Objeto que contém as configurações do formulário de pesquisa
 */
const formSearchConfig: FormBuilder<{ query: string }> = {
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
};

/**
 * Componente que lista todos os pacientes disponíveis, gerenciando a filtragem por nome
 */
const Lista: React.FC = () => {
  const { pacientes } = usePaciente();
  const formSearch = useForm(formSearchConfig);
  const resultados = pacientes.filter(
    (paciente) =>
      _.deburr(paciente.nome.toLowerCase()).indexOf(
        _.deburr(formSearch.value.query.toLowerCase())
      ) > -1
  );
  return (
    <div className='Lista'>
      <Form form={formSearch} />
      <div className='lista-content'>
        {resultados.length ? (
          resultados.map((paciente) => (
            <CardPaciente key={paciente.id} paciente={paciente} />
          ))
        ) : (
          <h3 id='no-results-found'>Nenhum resultado encontrado.</h3>
        )}
      </div>
    </div>
  );
};

export default Lista;
