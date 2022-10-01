/** @format */

import { RouterWrapper, StoreProviderWrapper,ThemeProviderWrappers } from './wrapper';
import routes from './configs/routes';


function App() {
  return (
    <StoreProviderWrapper>
      <ThemeProviderWrappers>
          <RouterWrapper default='/' routes={routes} />
      </ThemeProviderWrappers>
    </StoreProviderWrapper>
  );
}

export default App;
