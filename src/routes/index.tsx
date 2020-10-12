import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainPage from './MainPage';
import NotFoundPage from './NotFoundPage';
import RecordDetailsPage from './RecordDetailsPage';
import RecordListPage from './RecordListPage';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={MainPage} />
    <Route exact path="/records" component={RecordListPage} />
    <Route exact path="/records/:id" component={RecordDetailsPage} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default Routes;
