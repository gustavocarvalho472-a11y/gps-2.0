/**
 * Design Tokens - Tipografia Cogna
 * Extraído do Figma: Ds Template - Arquitetura de Tokens
 */

export const typography = {
  // Font Families
  fontFamily: {
    primary: "'Poppins', sans-serif",
    secondary: "'Roboto Slab', serif",
    mono: "'Roboto Mono', monospace",
  },

  // Font Sizes (px)
  fontSize: {
    xs: '12px',    // Não recomendado para desktop
    xs2: '14px',
    xs3: '16px',   // Recomendado para corpo de texto
    sm: '20px',
    md: '24px',
    lg: '32px',
    xl: '40px',
    xl2: '48px',
    xl3: '64px',
    ul1: '72px',
    ul2: '80px',
    ul3: '96px',
    ul4: '112px',
  },

  // Font Weights
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    black: 900,
  },

  // Line Heights
  lineHeight: {
    xs: '115%',
    sm: '120%',
    md: '140%',
    lg: '148%',
    xl: '168%',
  },

  // Letter Spacing
  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.01em',
  },
} as const;

// Estilos de texto pré-definidos para aplicação global
export const textStyles = {
  // Headings
  h1: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.xl3,
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.xs,
  },
  h2: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.xl2,
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.xs,
  },
  h3: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.sm,
  },
  h4: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.sm,
  },
  h5: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.md,
  },
  h6: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.md,
  },

  // Body
  bodyLarge: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.lineHeight.lg,
  },
  body: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.xs3,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.lineHeight.md,
  },
  bodySmall: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.xs2,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.lineHeight.md,
  },

  // Labels
  label: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.xs2,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.sm,
  },
  labelSmall: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.sm,
  },

  // Caption
  caption: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.lineHeight.md,
  },
} as const;

// CSS Variables para uso direto
export const typographyCSSVariables = `
:root {
  /* Font Families */
  --font-family-primary: ${typography.fontFamily.primary};
  --font-family-secondary: ${typography.fontFamily.secondary};
  --font-family-mono: ${typography.fontFamily.mono};

  /* Font Sizes */
  --font-size-xs: ${typography.fontSize.xs};
  --font-size-xs2: ${typography.fontSize.xs2};
  --font-size-xs3: ${typography.fontSize.xs3};
  --font-size-sm: ${typography.fontSize.sm};
  --font-size-md: ${typography.fontSize.md};
  --font-size-lg: ${typography.fontSize.lg};
  --font-size-xl: ${typography.fontSize.xl};
  --font-size-xl2: ${typography.fontSize.xl2};
  --font-size-xl3: ${typography.fontSize.xl3};
  --font-size-ul1: ${typography.fontSize.ul1};
  --font-size-ul2: ${typography.fontSize.ul2};
  --font-size-ul3: ${typography.fontSize.ul3};
  --font-size-ul4: ${typography.fontSize.ul4};

  /* Font Weights */
  --font-weight-light: ${typography.fontWeight.light};
  --font-weight-regular: ${typography.fontWeight.regular};
  --font-weight-medium: ${typography.fontWeight.medium};
  --font-weight-semibold: ${typography.fontWeight.semibold};
  --font-weight-bold: ${typography.fontWeight.bold};
  --font-weight-black: ${typography.fontWeight.black};

  /* Line Heights */
  --line-height-xs: ${typography.lineHeight.xs};
  --line-height-sm: ${typography.lineHeight.sm};
  --line-height-md: ${typography.lineHeight.md};
  --line-height-lg: ${typography.lineHeight.lg};
  --line-height-xl: ${typography.lineHeight.xl};

  /* Letter Spacing */
  --letter-spacing-tight: ${typography.letterSpacing.tight};
  --letter-spacing-normal: ${typography.letterSpacing.normal};
  --letter-spacing-wide: ${typography.letterSpacing.wide};
}
`;

export type TypographyToken = typeof typography;
export type TextStyle = typeof textStyles;
