# GPS 2.0

Sistema de Gestão de Processos e Dashboard

## Descrição

GPS 2.0 é uma aplicação web para gerenciamento de processos e visualização de dados através de dashboards interativos.

## Stack Tecnológica

- **Frontend:** React + TypeScript
- **Estilização:** (a definir)
- **Gerenciamento de Estado:** (a definir)
- **Testes:** (a definir)

## Estrutura do Projeto

```
gps-2.0/
├── src/
│   ├── components/       # Componentes React
│   │   ├── common/       # Componentes reutilizáveis
│   │   ├── dashboard/    # Componentes do dashboard
│   │   ├── processes/    # Componentes de gestão de processos
│   │   └── layout/       # Componentes de layout (Header, Sidebar, etc)
│   ├── pages/            # Páginas da aplicação
│   ├── hooks/            # Custom hooks
│   ├── services/         # Serviços e chamadas de API
│   ├── utils/            # Funções utilitárias
│   ├── types/            # Tipos TypeScript
│   ├── styles/           # Estilos globais
│   ├── assets/           # Imagens, ícones e outros assets
│   └── context/          # Contextos React
├── docs/                 # Documentação do projeto
├── public/               # Arquivos públicos estáticos
└── README.md
```

## Instalação

```bash
# Clonar o repositório
git clone https://github.com/gustavocarvalho472-a11y/gps-2.0.git

# Entrar na pasta do projeto
cd gps-2.0

# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev
```

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera a build de produção
- `npm run test` - Executa os testes
- `npm run lint` - Executa o linter

## Contribuição

1. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
2. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
3. Push para a branch (`git push origin feature/nova-feature`)
4. Abra um Pull Request

## Licença

Este projeto é privado e de uso interno.
