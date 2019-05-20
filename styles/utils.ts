interface Breakpoints {
  [key: string]: string;
}
export const breakpoints: Breakpoints = {
  xsmall: '480px',
  small: '768px',
  medium: '1024px',
  large: '1220px',
  xlarge: '1480px',
  xxlarge: '1680px'
};

export const breakpoint = (size: keyof typeof breakpoints): string => {
  return `@media (min-width: ${breakpoints[size]})`;
};
