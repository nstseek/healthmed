# Healthmed - Controle de pacientes

[![CI/CD](https://github.com/nstseek/healthmed/actions/workflows/firebase-hosting-merge.yml/badge.svg?branch=master)](https://github.com/nstseek/healthmed/actions/workflows/firebase-hosting-merge.yml)

Essa aplicação foi desenvolvida para completar o teste técnico proposto para a vaga de desenvolvedor front-end. Você pode visualizar a aplicação funcionando em [https://healthmed-client.web.app/](https://healthmed-client.web.app/). Você também pode visualizar o estado das builds e deploys de cada commit visualizando o histórico de commits [aqui](https://github.com/nstseek/healthmed/commits/master) ou vendo o estado dos workflows do repositório [aqui](hhttps://github.com/nstseek/healthmed/actions).

## Tecnologias

Esse projeto foi desenvolvido utilizando algumas das mais recentes tecnologias como React (com Hooks e Context API), TypeScript, Jest, Enzyme, SCSS e algumas outras bibliotecas de minha autoria, como [@nstseek/react-forms](https://www.npmjs.com/package/@nstseek/react-forms) e [@nstseek/react-ui](https://www.npmjs.com/package/@nstseek/react-ui).

## Documentação

O projeto possui uma cobertura de documentação razoável utilizando [JSDOC](https://jsdoc.app/) em cada componente e interface relevante da aplicação. Caso a sua IDE suporte, basta você passar o mouse sobre um componente e verá uma descrição a respeito do mesmo, explicando qual o propósito daquele componente/variável/interface. Segue um exemplo no link abaixo para demonstrar a funcionalidade funcionando no Visual Studio Code

![JSDOC example](src/assets/Screenshot_1.png?raw=true 'JSDOC example')

Caso a sua IDE não suporte a notação [JSDOC](https://jsdoc.app/), basta ler o comentário sobre a declaração do componente/váriavel/interface. A documentação foi escrita em inglês por costume próprio e porque a aplicação está disponível no meu perfil do GitHub, o qual é voltado mais pra área internacional(inglês) do que nacional(português).

## Continuous Integration and Continuous Deployment (CI/CD)

Um [processo de CI/CD simples](https://github.com/nstseek/healthmed/actions/workflows/firebase-hosting-merge.yml) foi implementado nesse projeto utilizando as Actions do GitHub. Toda vez que algum commit é adicionado a master, o projeto passa por sua bateria de testes, é buildado e deployado no GitHub Pages, podendo ser visualizado no [endereço mencionado acima](https://github.com/nstseek/healthmed/actions).

## Testes

A cobertura de testes unitários está razoável, me faltou tempo para desenvolver testes melhores. Como é um projeto que servirá apenas como teste técnico, não vejo necessidade de cobrir o projeto inteiro com testes unitários de qualidade pois demandaria tempo que não tenho disponível e o benefício não valeria a pena.
O resultado dos testes de cada commit é publicado utilizando o GitHub Actions logo após rodarem, como você pode ver [aqui](https://github.com/nstseek/healthmed/runs/2003339433?check_suite_focus=true).

## Flow de trabalho

O projeto possui uma série de filtros para garantir a qualidade do código criado, como [linters](https://eslint.org/), [formatters](https://prettier.io/) e [testes unitários](https://jestjs.io/en/) com [framework específico](https://enzymejs.github.io/enzyme/) que rodam toda vez que o desenvolvedor tenta realizar o push para o repositório através dos git hooks. Esse projeto utiliza o pacote [husky](https://www.npmjs.com/package/husky) que torna muito simples a configuração de git hooks em qualquer repositório Git. Toda vez que o desenvolvedor tenta realizar o push, o script [npm run check](https://github.com/nstseek/healthmed/blob/8962279f2a57b3b93217a91c272f035834f387c0/package.json#L50) [roda antes que o push seja efetuado](https://github.com/nstseek/healthmed/blob/8962279f2a57b3b93217a91c272f035834f387c0/package.json#L74), garantindo que o código que está sendo enviado passa em todos os testes e builda corretamente.

## Scripts disponíveis

### npm start

Inicia o projeto na sua máquina local.

### npm run build

Cria um build do projeto para ser servido.

### npm run eject

Ejeta toda a articulação do create-react-app que não é totalmente visível/manipulável para o desenvolvedor final.

### npm test

Executa todos os testes unitários do projeto.

### npm run test:watch

Executa todos os testes unitários do projeto em modo de observação.

### npm run test:report

Executa todos os testes unitários do projeto e gera um report para ser publicado com o GitHub Actions.

### npm run prettier

Executa o [formatter](https://prettier.io/) instalado no projeto para verificar os arquivos existentes.

### npm run prettier:fix

Executa o [formatter](https://prettier.io/) instalado no projeto para corrigir os erros nos arquivos existentes.

### npm run lint

Executa o [linter](https://eslint.org/) instalado no projeto para verificar os arquivos existentes.

### npm run lint:fix

Executa o [linter](https://eslint.org/) instalado no projeto para corrigir os erros nos arquivos existentes.

### npm run check

Executa uma verificação completa no projeto, incluindo o linter, formatter, os testes unitários e o build.

### npm run check:ci

Executa uma verificação completa no projeto destinada para um ambiente CI, incluindo o linter, formatter, os testes unitários (gerando um report para publicação) e o build.

### npm run check:fix

Executa uma verificação completa no projeto, incluindo o linter, formatter, os testes unitários e o build, corrigindo os erros passíveis de correção automática com o linter e o formatter.
