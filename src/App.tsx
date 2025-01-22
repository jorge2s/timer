import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';

import { GlobalStyle } from './theme/global';
import { defaultTheme } from './theme/default';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default App
