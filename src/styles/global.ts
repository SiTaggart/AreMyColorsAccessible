import { css } from '@emotion/react';

import normalize from 'normalize.css?inline';

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
    font-size: 16px;
  }

  body {
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      Oxygen-Sans,
      Ubuntu,
      Cantarell,
      'Helvetica Neue',
      Arial,
      sans-serif;
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

export { globalStyles };
