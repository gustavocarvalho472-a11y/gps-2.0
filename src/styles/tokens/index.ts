/**
 * Design Tokens - Cogna
 * Exportação centralizada de todos os tokens de design
 */

export { colors, colorsCSSVariables, type ColorToken } from './colors';
export {
  typography,
  textStyles,
  typographyCSSVariables,
  type TypographyToken,
  type TextStyle,
} from './typography';

// Spacing tokens
export const spacing = {
  0: '0',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  12: '48px',
  14: '56px',
  16: '64px',
  20: '80px',
  24: '96px',
} as const;

// Border radius tokens
export const borderRadius = {
  none: '0',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '24px',
  full: '9999px',
} as const;

// Shadow tokens
export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
} as const;

// Breakpoints
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Z-index
export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const;

// Transitions
export const transitions = {
  fast: '150ms ease-in-out',
  normal: '250ms ease-in-out',
  slow: '350ms ease-in-out',
} as const;

// CSS Variables combinadas
export const spacingCSSVariables = `
:root {
  /* Spacing */
  --spacing-0: ${spacing[0]};
  --spacing-1: ${spacing[1]};
  --spacing-2: ${spacing[2]};
  --spacing-3: ${spacing[3]};
  --spacing-4: ${spacing[4]};
  --spacing-5: ${spacing[5]};
  --spacing-6: ${spacing[6]};
  --spacing-7: ${spacing[7]};
  --spacing-8: ${spacing[8]};
  --spacing-9: ${spacing[9]};
  --spacing-10: ${spacing[10]};
  --spacing-12: ${spacing[12]};
  --spacing-14: ${spacing[14]};
  --spacing-16: ${spacing[16]};
  --spacing-20: ${spacing[20]};
  --spacing-24: ${spacing[24]};

  /* Border Radius */
  --radius-none: ${borderRadius.none};
  --radius-sm: ${borderRadius.sm};
  --radius-md: ${borderRadius.md};
  --radius-lg: ${borderRadius.lg};
  --radius-xl: ${borderRadius.xl};
  --radius-2xl: ${borderRadius['2xl']};
  --radius-full: ${borderRadius.full};

  /* Shadows */
  --shadow-none: ${shadows.none};
  --shadow-sm: ${shadows.sm};
  --shadow-md: ${shadows.md};
  --shadow-lg: ${shadows.lg};
  --shadow-xl: ${shadows.xl};
  --shadow-2xl: ${shadows['2xl']};

  /* Transitions */
  --transition-fast: ${transitions.fast};
  --transition-normal: ${transitions.normal};
  --transition-slow: ${transitions.slow};
}
`;

export type SpacingToken = typeof spacing;
export type BorderRadiusToken = typeof borderRadius;
export type ShadowToken = typeof shadows;
export type BreakpointToken = typeof breakpoints;
