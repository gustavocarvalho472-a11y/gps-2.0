# GPS 2.0

Sistema de Gestão de Processos e Dashboard

## Tecnologias

- **React 19** + **TypeScript**
- **Vite** - Build tool
- **Design System Cogna** - Tokens de cores e tipografia

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
- `npm run preview` - Preview da build de produção
- `npm run lint` - Executa o linter

## Estrutura do Projeto

```
gps-2.0/
├── src/
│   ├── assets/           # Imagens e assets estáticos
│   ├── styles/
│   │   ├── tokens/       # Design tokens (cores, tipografia, spacing)
│   │   │   ├── colors.ts
│   │   │   ├── typography.ts
│   │   │   └── index.ts
│   │   └── global.css    # Estilos globais
│   ├── App.tsx
│   └── main.tsx
├── docs/                 # Documentação
├── public/               # Arquivos públicos
└── index.html
```

## Design Tokens

O projeto utiliza os tokens de design da Cogna, incluindo:

### Cores (Primary)
| Token | Valor | Uso |
|-------|-------|-----|
| `--color-primary-20` | #003491 | Cor principal do brandbook |
| `--color-primary-40` | #004ECC | Links e ações |
| `--color-primary-50` | #3969EB | Hover states |

### Tipografia
- **Font Family:** Poppins (principal), Roboto Slab (secundária)
- **Tamanho base:** 16px (`--font-size-xs3`)
- **Pesos:** Light (300), Regular (400), Medium (500), Semibold (600), Bold (700)

### Uso dos Tokens

```tsx
// Via CSS Variables
.button {
  background-color: var(--color-primary-40);
  font-family: var(--font-family-primary);
  font-weight: var(--font-weight-medium);
}

// Via TypeScript
import { colors, typography } from './styles/tokens';

const primaryColor = colors.primary[40]; // #004ECC
const fontFamily = typography.fontFamily.primary; // 'Poppins', sans-serif
```

## Contribuição

1. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
2. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
3. Push para a branch (`git push origin feature/nova-feature`)
4. Abra um Pull Request
