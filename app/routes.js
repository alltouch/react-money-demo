import React from 'react';

import { Route, IndexRoute, Redirect } from 'react-router';

import AppContainer from './components/app/app-container.jsx';
import AccountsContainer from './components/accounts/accounts-container.jsx';
import AddDialog from './components/tab/account/add-dialog.jsx';

export default (
    <Route path="/" component={AppContainer}>
        <IndexRoute component={AccountsContainer} />

        <Redirect from="/0" to="/" />

        <Route path=":tabId" component={AccountsContainer}>
            <Route path="add" component={AddDialog} />
        </Route>
    </Route>
);
