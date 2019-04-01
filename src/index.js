import React from 'react';
import ReactDOM from 'react-dom';
import BookList from './BookList'
import Book from './Book'
import Login from "./Login";
import Register from "./Register"
import Homepage from "./Homepage"
import * as serviceWorker from './serviceWorker';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/" exact component={Login} />
            <Route exact path="/Booklist" component={BookList} />
            <Route exact path="/Homepage" component={Homepage} />
            <Route exact path="/Register" component={Register} />
            <Route path="/detail/:id" component={Book} />
        </Switch>
    </Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
