/**
 * Design Tokens - Cores Cogna
 * Extraído do Figma: Ds Template - Arquitetura de Tokens
 */

export const colors = {
  // Primary Palette (Azul/Roxo)
  primary: {
    0: '#000000',
    5: '#0A0F2B',
    10: '#001F50',
    15: '#002871',
    20: '#003491', // Cor do brandbook
    30: '#0041AF',
    40: '#004ECC',
    50: '#3969EB',
    60: '#7A8BF0',
    70: '#9FA7F4',
    80: '#C1C3F6',
    85: '#D1D2F7',
    90: '#E1E1F8',
    95: '#F0F0FA',
    99: '#FCFCFE',
    100: '#FFFFFF',
  },

  // Secondary Palette (usar os valores definidos pelo design)
  secondary: {
    0: '#000000',
    5: '#0D1117',
    10: '#161B22',
    15: '#16375C', // Cor do brandbook
    20: '#16375C',
    30: '#1E4976',
    40: '#265B90',
    50: '#2E6DAA',
    60: '#5A8DC0',
    70: '#86ADD6',
    80: '#B2CDEC',
    85: '#C8DCF2',
    90: '#DEEBF8',
    95: '#EEF5FC',
    99: '#FAFCFE',
    100: '#FFFFFF',
  },

  // Neutral/Gray Palette
  neutral: {
    0: '#000000',
    5: '#111111',
    10: '#1B1B1B',
    15: '#262626',
    20: '#303030',
    30: '#474747',
    40: '#5E5E5E',
    50: '#707070',
    60: '#8B8B8B',
    70: '#ABABAB',
    80: '#C6C6C6',
    85: '#D4D4D4',
    90: '#E2E2E2',
    95: '#F1F1F1',
    99: '#FCFCFC',
    100: '#FFFFFF',
  },

  // Semantic Colors
  semantic: {
    success: {
      light: '#E6F4EA',
      main: '#34A853',
      dark: '#1E7E34',
    },
    warning: {
      light: '#FFF3E0',
      main: '#FBBC05',
      dark: '#F57C00',
    },
    error: {
      light: '#FFEBEE',
      main: '#EA4335',
      dark: '#C62828',
    },
    info: {
      light: '#E3F2FD',
      main: '#4285F4',
      dark: '#1565C0',
    },
  },

  // Background Colors
  background: {
    default: '#FFFFFF',
    paper: '#F5F5F5',
    dark: '#1B1B1B',
  },

  // Text Colors
  text: {
    primary: '#1B1B1B',
    secondary: '#5E5E5E',
    disabled: '#ABABAB',
    inverse: '#FFFFFF',
  },
} as const;

// CSS Variables para uso direto
export const colorsCSSVariables = `
:root {
  /* Primary */
  --color-primary-0: ${colors.primary[0]};
  --color-primary-5: ${colors.primary[5]};
  --color-primary-10: ${colors.primary[10]};
  --color-primary-15: ${colors.primary[15]};
  --color-primary-20: ${colors.primary[20]};
  --color-primary-30: ${colors.primary[30]};
  --color-primary-40: ${colors.primary[40]};
  --color-primary-50: ${colors.primary[50]};
  --color-primary-60: ${colors.primary[60]};
  --color-primary-70: ${colors.primary[70]};
  --color-primary-80: ${colors.primary[80]};
  --color-primary-85: ${colors.primary[85]};
  --color-primary-90: ${colors.primary[90]};
  --color-primary-95: ${colors.primary[95]};
  --color-primary-99: ${colors.primary[99]};
  --color-primary-100: ${colors.primary[100]};

  /* Secondary */
  --color-secondary-0: ${colors.secondary[0]};
  --color-secondary-5: ${colors.secondary[5]};
  --color-secondary-10: ${colors.secondary[10]};
  --color-secondary-15: ${colors.secondary[15]};
  --color-secondary-20: ${colors.secondary[20]};
  --color-secondary-30: ${colors.secondary[30]};
  --color-secondary-40: ${colors.secondary[40]};
  --color-secondary-50: ${colors.secondary[50]};
  --color-secondary-60: ${colors.secondary[60]};
  --color-secondary-70: ${colors.secondary[70]};
  --color-secondary-80: ${colors.secondary[80]};
  --color-secondary-85: ${colors.secondary[85]};
  --color-secondary-90: ${colors.secondary[90]};
  --color-secondary-95: ${colors.secondary[95]};
  --color-secondary-99: ${colors.secondary[99]};
  --color-secondary-100: ${colors.secondary[100]};

  /* Neutral */
  --color-neutral-0: ${colors.neutral[0]};
  --color-neutral-5: ${colors.neutral[5]};
  --color-neutral-10: ${colors.neutral[10]};
  --color-neutral-15: ${colors.neutral[15]};
  --color-neutral-20: ${colors.neutral[20]};
  --color-neutral-30: ${colors.neutral[30]};
  --color-neutral-40: ${colors.neutral[40]};
  --color-neutral-50: ${colors.neutral[50]};
  --color-neutral-60: ${colors.neutral[60]};
  --color-neutral-70: ${colors.neutral[70]};
  --color-neutral-80: ${colors.neutral[80]};
  --color-neutral-85: ${colors.neutral[85]};
  --color-neutral-90: ${colors.neutral[90]};
  --color-neutral-95: ${colors.neutral[95]};
  --color-neutral-99: ${colors.neutral[99]};
  --color-neutral-100: ${colors.neutral[100]};

  /* Semantic */
  --color-success-light: ${colors.semantic.success.light};
  --color-success-main: ${colors.semantic.success.main};
  --color-success-dark: ${colors.semantic.success.dark};
  --color-warning-light: ${colors.semantic.warning.light};
  --color-warning-main: ${colors.semantic.warning.main};
  --color-warning-dark: ${colors.semantic.warning.dark};
  --color-error-light: ${colors.semantic.error.light};
  --color-error-main: ${colors.semantic.error.main};
  --color-error-dark: ${colors.semantic.error.dark};
  --color-info-light: ${colors.semantic.info.light};
  --color-info-main: ${colors.semantic.info.main};
  --color-info-dark: ${colors.semantic.info.dark};

  /* Background */
  --color-bg-default: ${colors.background.default};
  --color-bg-paper: ${colors.background.paper};
  --color-bg-dark: ${colors.background.dark};

  /* Text */
  --color-text-primary: ${colors.text.primary};
  --color-text-secondary: ${colors.text.secondary};
  --color-text-disabled: ${colors.text.disabled};
  --color-text-inverse: ${colors.text.inverse};
}
`;

export type ColorToken = typeof colors;
