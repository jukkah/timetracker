import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from 'src/routes';

function Router() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default Router;
