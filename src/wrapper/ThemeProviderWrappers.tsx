/** @format */
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { StyledEngineProvider, ThemeProvider as MuiThemeProvider } from '@mui/material';
import jssPreset from '@mui/styles/jssPreset';
import StylesProvider from '@mui/styles/StylesProvider';
import { create } from 'jss';
import { ThemeProvider } from 'styled-components';
import createTheme from 'theme';
import { THEMES } from 'utils/constants';
import CssBaseline from '@mui/material/CssBaseline';

interface StoreProviderProps {
  children: React.ReactNode;
}

const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById('jss-insertion-point')!,
});

function ThemeProviders(props: StoreProviderProps) {
  return (
    <StylesProvider jss={jss}>
      <CssBaseline/>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StyledEngineProvider injectFirst>
          <MuiThemeProvider theme={createTheme(THEMES.GREEN)}>
            <ThemeProvider theme={createTheme(THEMES.GREEN)}>{props.children}</ThemeProvider>
          </MuiThemeProvider>
        </StyledEngineProvider>
      </LocalizationProvider>
    </StylesProvider>
  );
}

export default ThemeProviders;
