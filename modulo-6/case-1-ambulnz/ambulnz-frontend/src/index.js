import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

@font-face{font-family: Roboto; src: local(Roboto-Regular),
    url(/path/to/Roboto-Regular.woff2) format("woff2"),
    url(/path/to/Roboto-Regular.woff) format("woff"),
    url(/path/to/Roboto-Regular.ttf) format("truetype");}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
`
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    < GlobalStyle />
    <App />
  </React.StrictMode>
);
