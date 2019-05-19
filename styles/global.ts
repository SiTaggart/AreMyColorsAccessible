import { css } from '@emotion/core';
import normalize from 'normalize.css/normalize.css';

const globalStyles = css`
  ${normalize}

  *,
  *::before,
  *:after {
    box-sizing: border-box;
  }

  html,
  body {
    height: 100%;
  }

  html {
    -moz-osx-font-smoothing: greyscale;
    -webkit-font-smoothing: antialiased;
    font-size: 16px;
  }

  body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans,
      Ubuntu, Cantarell, 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.4;
  }

  strong {
    font-weight: 700;
  }

  :focus {
    outline: currentColor dashed 2px;
    outline-offset: 3px;
  }
`;

export default globalStyles;
