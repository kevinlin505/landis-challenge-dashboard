import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '@store/store';
import AppNavigation from '@components/navigation/AppNavigation';

const App = () => {
  return (
    <Provider store={configureStore()}>
      <AppNavigation />
    </Provider>
  );
};

export default App;
