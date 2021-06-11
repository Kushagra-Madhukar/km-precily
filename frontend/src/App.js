import { GlobalStyles, lightTheme, darkTheme } from './themes'
import {ThemeProvider} from 'styled-components'
import { useState } from 'react';
import Resizable from './ResizablePage';

function App() {
  const [theme, setTheme] = useState(false)
  return (
    <ThemeProvider theme={theme === false ? lightTheme : darkTheme}>
    <GlobalStyles/>
      <Resizable/>
    </ThemeProvider>
  );
}

export default App;
