import React, { useState } from 'react';
import Particles, { IParticlesParams } from 'react-particles-js';
import { ReactUIContext, useRootContext } from '@nstseek/react-ui/context';
import { ModalWarning, Loading } from '@nstseek/react-ui/components';
import { Route } from 'react-router-dom';
import Cadastro from 'containers/Cadastro/Cadastro';
import Lista from 'containers/Lista/Lista';
import PacienteContext from 'contexts/pacientes/paciente-context';
import './App.scss';
import 'moment/locale/pt-br';
import { Paciente } from 'typings/paciente';

/**
 * Holds the configuration for the particle background that you can see in the application
 */
const particlesParam: IParticlesParams = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: false,
        value_area: 800
      }
    },
    opacity: {
      value: 0.5,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 1,
      random: true,
      anim: {
        enable: false,
        speed: 10,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: false
    },
    move: {
      enable: true,
      speed: 1,
      direction: 'none',
      random: true
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'repulse'
      },
      onclick: {
        enable: true,
        mode: 'push'
      },
      resize: true
    },
    modes: {
      repulse: {
        distance: 50,
        duration: 1
      },
      push: {
        particles_nb: 1,
        quantity: 5
      }
    }
  },
  retina_detect: true
};

const App: React.FC = () => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const uiCtx = useRootContext();

  return (
    <>
      <Particles className='particles' params={particlesParam} />
      <ReactUIContext.Provider value={uiCtx}>
        <ModalWarning />
        <Loading />
        <PacienteContext.Provider value={{ pacientes, setPacientes }}>
          <div className='App'>
            <div className='cadastro-container'>
              <Route path='/:id?'>
                <Cadastro />
              </Route>
            </div>
            <div className='lista-container'>
              <Lista />
            </div>
          </div>
        </PacienteContext.Provider>
      </ReactUIContext.Provider>
    </>
  );
};

export default App;
