import 'bootstrap.css';

import React from 'react';
import { Router, Route, Redirect, IndexRoute, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';

import App from './components/app/app.jsx';
import TabContent from './components/tab/content.jsx';
import AddDialog from './components/tab/account/add-dialog.jsx';

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={TabContent} />

            <Redirect from="/0" to="/" />

            <Route path=":tabId" component={TabContent}>
                <Route path="add" component={AddDialog} />
            </Route>
        </Route>
    </Router>
    ),
    document.getElementById('app')
);
