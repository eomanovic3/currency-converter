/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import HomePage from '../../containers/HomePage/Loadable';
import Login from '../../containers/Login/Loadable';
import Register from '../../containers/Register/Loadable';
import NotFoundPage from '../../containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';
import Header from "../../components/Header";
import Logout from "../../components/Logout";
import history from '../../utils/history';
const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
`;

export default function App() {
  return (
    <AppWrapper className="d-flex">
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={Login}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/register" component={Register} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </AppWrapper>
  );
}
