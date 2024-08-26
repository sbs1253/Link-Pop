import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
  ${reset}

  :root {
    --font-size-h1: 32px;
    --line-height-h1: 48px;
    --font-weight-h1: 700;

    --font-size-h2: 24px;
    --line-height-h2: 36px;
    --font-weight-h2: 700;

    --font-size-h3: 20px;
    --line-height-h3: 30px;
    --font-weight-h3: 700;

    --font-size-h4: 16px;
    --line-height-h4: 24px;
    --font-weight-h4: 700;

    --font-size-body-bold: 14px;
    --line-height-body-bold: 21px;
    --font-weight-body-bold: 700;

    --font-size-body-regular: 14px;
    --line-height-body-regular: 21px;
    --font-weight-body-regular: 400;

    --font-size-caption: 12px;
    --line-height-caption: 18px;
    --font-weight-caption: 400;
  }

  body {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: ${(props) => props.theme.colors.background[2]};
    color: ${(props) => props.theme.colors.text.body};
    font-family: 'Pretendard-Regular', sans-serif;
    overflow: hidden;
  }

  #root {
    width: 100%;
    height: 100%;
    max-width: 500px;
    margin: auto;
    background-color: ${(props) => props.theme.colors.background[1]};
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
    font-family: 'Pretendard-Regular', sans-serif;
    color: inherit;
  }

  h1 {
    font-size: var(--font-size-h1);
    line-height: var(--line-height-h1);
    font-weight: var(--font-weight-h1);
  }

  h2 {
    font-size: var(--font-size-h2);
    line-height: var(--line-height-h2);
    font-weight: var(--font-weight-h2);
  }

  h3 {
    font-size: var(--font-size-h3);
    line-height: var(--line-height-h3);
    font-weight: var(--font-weight-h3);
  }

  h4 {
    font-size: var(--font-size-h4);
    line-height: var(--line-height-h4);
    font-weight: var(--font-weight-h4);
  }

  .body-bold {
    font-size: var(--font-size-body-bold);
    line-height: var(--line-height-body-bold);
    font-weight: var(--font-weight-body-bold);
  }

  .body-regular {
    font-size: var(--font-size-body-regular);
    line-height: var(--line-height-body-regular);
    font-weight: var(--font-weight-body-regular);
  }

  .caption {
    font-size: var(--font-size-caption);
    line-height: var(--line-height-caption);
    font-weight: var(--font-weight-caption);
  }

  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }
`;
