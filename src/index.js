import React from 'react';

import ReactDOM from 'react-dom';
import {createStore,applyMiddleware,compose} from 'redux';
 import reducers from './reducers';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import './config';
import Register from './container/register/register';
import Login from './container/login/login';
import AuthRoute from './component/AutoRoute/autoroute';
import BossInfo from './container/bossinfo/bossinfo';
import Genius from './container/genius/genius';
import Dashboard from './component/dashboard/dashboard';
import './index.css'
import Chat from './component/chat/chat';
const store=createStore(reducers,compose(applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
));
function render(){
    ReactDOM.render(
        (<Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                <Route path="/bossinfo" component={BossInfo}></Route>
                <Route path="/geniusinfo" component={Genius}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/register" component={Register}></Route>
                <Route path="/chat/:userid" component={Chat}></Route>
                <Route component={Dashboard}></Route>
                </Switch>
            </div>
        </BrowserRouter>
        </Provider>),
        document.getElementById('root')
    )
}
render()
store.subscribe(render);