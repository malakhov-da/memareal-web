import '@babel/polyfill';
import 'whatwg-fetch';
import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Catch from './catch';
import Main from './pages/main';
import {store} from './redux';



window.onload = function() {
    ReactDOM.render(
        <Provider store={store}>
            <Catch>
                <Router>
                  <Switch>
                        <Route
                          path="/"
                          component={Main}
                          exact />
                  </Switch>
                </Router>
            </Catch>
        </Provider>,
        document.getElementById('app')
    );
}
