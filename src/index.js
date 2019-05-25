import React from 'react';
import ReactDOM from 'react-dom';
import Book from './Book'
import Edit from './Edit'
import Login from "./Login";
import Register from "./Register"
import Homepage from "./Homepage"
import Cart from "./Cart"
import Order from "./Order"
import Root from "./Root"
import Bookmanage from "./Bookmanage"
import Statistics from "./Statistics"
import Userstatistics from "./Userstatistics"

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
                <Route exact path="/Bookmanage" component={Bookmanage} />
                <Route exact path="/Order" component={Order} />
                <Route exact path="/Homepage" component={Homepage} />
                <Route exact path="/Register" component={Register} />
                <Route exact path="/Statistics" component={Statistics} />
                <Route exact path="/Userstatistics" component={Userstatistics} />
                <Route path="/detail/:id" component={Book} />
                <Route path="/edit/:id" component={Edit} />
            </Switch>
        </Router>, document.getElementById('create-article-form'));
export const UrlContext = React.createContext(
    "http://localhost:8080" // default value
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
