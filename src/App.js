import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import Routes from './routes';

// Import Scss
import "./assets/scss/themes.scss";

// Modals
import { ModalSignIn } from './components/Auth/Modal';

function App() {
  const selectLayoutProperties = createSelector(
    (state) => state.Layout,
    (layout) => ({
      layoutMode: layout.get('layoutMode'),
    })
  );

  const { layoutMode } = useSelector(selectLayoutProperties);

  useEffect(() => {
    layoutMode && localStorage.setItem("layoutMode", layoutMode);
  }, [layoutMode])

  return <React.Fragment>
    <Routes />
    <ModalSignIn defaultStep={'login'} />
  </React.Fragment>;
};

export default App;
