# Know Your Fan - Desafio Técnico FURIA

Uma Single Page Application (SPA) desenvolvida em React com TypeScript para coletar dados de fãs de esports, validar documentos com IA simulada, vincular perfis sociais e de esports, e exibir um resumo detalhado, atendendo ao desafio técnico "Know Your Fan" da FURIA.

## Visão Geral

O projeto implementa uma interface de cadastro em várias etapas, permitindo que fãs da FURIA forneçam informações pessoais, interesses, documentos, e vinculem perfis sociais e de esports. A validação de documentos e perfis é simulada no frontend, com feedback visual em tempo real. O objetivo é coletar dados para personalizar a experiência do fã, conforme a estratégia "Know Your Fan".

## Funcionalidades

- **Coleta de Dados Pessoais**: Formulário para nome, CPF, e-mail, telefone, endereço e data de nascimento.
- **Seleção de Interesses**: Escolha de interesses predefinidos (ex.: Counter-Strike, Valorant) e adição de interesses personalizados.
- **Upload de Documentos**: Suporte para JPEG, PNG e PDF (até 5MB), com validação simulada por IA e status (Verificado, Pendente, Rejeitado).
- **Vinculação de Redes Sociais**: Conexão de perfis (ex.: Twitter/X) com validação de URL e métricas de engajamento simuladas.
- **Vinculação de Perfis Esports**: Vinculação de plataformas (ex.: GamersClub) com pontuação de relevância simulada.
- **Resumo Completo**: Exibição consolidada de todas as informações, com status de verificação (Verificado, Pendente, Incompleto).

## Tecnologias Utilizadas

- **React**: Biblioteca principal para construção da SPA.
- **TypeScript**: Tipagem estática para maior robustez.
- **Tailwind CSS**: Estilização responsiva e moderna.
- **Lucide-React**: Ícones para feedback visual (ex.: CheckCircle, Clock).
- **Node.js/NPM**: Gerenciamento de dependências.

SPA React com TypeScript para coletar dados de fãs, validar documentos e vincular perfis sociais/esports.

## Instalação
```bash
git clone <https://github.com/AntonioFabricio7/furia-challenge.git>
cd project
npm install
npm run dev
