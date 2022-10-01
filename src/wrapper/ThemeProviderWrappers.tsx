/** @format */
import { StyledEngineProvider, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { ThemeProvider } from 'styled-components';
import createTheme from '../theme';
import { THEMES } from '../utils/constants';

interface StoreProviderProps {
  children: React.ReactNode;
}

function ThemeProviders(props: StoreProviderProps) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={createTheme(THEMES.DEFAULT)}>
        <MuiThemeProvider theme={createTheme(THEMES.DEFAULT)}>{props.children}</MuiThemeProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default ThemeProviders;
