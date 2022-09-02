import Router from "./routes/Router";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import GlobalState from "./global/GlobalState";

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#5cb888',
      darker: '#000000',
    },
    secondary: {
      main: "#000000",
      contrastText: "#fff"
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

function App () {
  return (
    <ThemeProvider theme={theme}>
    <GlobalState>
      <Router />
    </GlobalState>
    </ThemeProvider>
  )
}

export default App;
