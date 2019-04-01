import React from 'react';
import ReactDOM from 'react-dom';
import Book from './Book'
import Login from "./Login";
import Register from "./Register"
import Homepage from "./Homepage"
import Cart from "./Cart"
import Order from "./Order"
import Root from "./Root"

import * as serviceWorker from './serviceWorker';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';


ReactDOM.render(

        <Router>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/Cart" component={Cart} />
                <Route exact path="/Root" component={Root} />

                <Route exact path="/Order" component={Order} />
                <Route exact path="/Homepage" component={Homepage} />
                <Route exact path="/Register" component={Register} />
                <Route path="/detail/:id" component={Book} />
            </Switch>
        </Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
