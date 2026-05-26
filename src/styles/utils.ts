interface Breakpoints {
  [key: string]: string;
}
export const breakpoints: Breakpoints = {
  large: "1220px",
  medium: "1024px",
  small: "768px",
  xlarge: "1480px",
  xsmall: "480px",
  xxlarge: "1680px",
};

export const breakpoint = (size: keyof typeof breakpoints): string =>
  `@media (min-width: ${breakpoints[size]})`;
