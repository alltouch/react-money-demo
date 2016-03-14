import React from 'react';

import { Route, IndexRoute, Redirect } from 'react-router';

import AppContainer from './components/app/app-container.jsx';
import TabContent from './components/tab/content.jsx';
import AddDialog from './components/tab/account/add-dialog.jsx';

export default (
    <Route path="/" component={AppContainer}>
        <IndexRoute component={TabContent} />

        <Redirect from="/0" to="/" />

        <Route path=":tabId" component={TabContent}>
            <Route path="add" component={AddDialog} />
        </Route>
    </Route>
);
