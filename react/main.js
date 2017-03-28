'use strict';

import React from 'react';
import { Router, Route, hashHistory, IndexRedirect, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import axios from 'axios';

import store from '../redux/store';

import AppContainer from './containers/AppContainer';
import HomeContainer from './containers/HomeContainer';
import AudioTestContainer from './containers/AudioTestContainer';
import PitchAnalyzer from '../modules/PitchAnalyzer';

export default function Routes(){
  return (
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path='/' component={AppContainer}>
          <IndexRedirect to='/audio-test'/>  
          <Route path='/home' component={HomeContainer} />
          <Route path='/audio-test' component={AudioTestContainer} />
        </Route>
      </Router>
    </Provider>
  );
}