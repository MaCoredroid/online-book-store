import React from 'react';
import ReactDOM from 'react-dom';
import HomepageBook from './User/HomepageBook'
import CartpageBook from './User/CartpageBook'
import OrderpageBook from './User/OrderpageBook'
import Login from "./Login";
import Register from "./Register"
import Homepage from "./User/Homepage"
import Cart from "./User/Cart"
import Order from "./User/Order"
import Userstatistics from "./User/Userstatistics"
import UserProfile from "./user/UserProfile"
import UserManage from "./Admin/UserManage"
import BookManage from "./Admin/BookManage"
import CartManage from "./Admin/CartManage"
import OrderManage from "./Admin/OrderManage"
import Statistics from "./Admin/Statistics"
import * as serviceWorker from './serviceWorker';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Cookies from "js-cookie";



ReactDOM.render(

        <Router>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/Cart" component={Cart} />
                <Route exact path="/Order" component={Order} />
                <Route exact path="/Homepage" component={Homepage} />
                <Route exact path="/Register" component={Register} />
                <Route exact path="/Userstatistics" component={Userstatistics} />
                <Route exact path="/UserManage" component={UserManage} />
                <Route exact path="/BookManage" component={BookManage} />
                <Route exact path="/CartManage" component={CartManage} />
                <Route exact path="/OrderManage" component={OrderManage} />
                <Route exact path="/Statistics" component={Statistics} />
                <Route path="/homepage/detail/:id" component={HomepageBook} />
                <Route path="/orderpage/detail/:id" component={OrderpageBook} />
                <Route path="/cartpage/detail/:id" component={CartpageBook} />
                <Route path="/UserProfile" component={UserProfile} />
            </Switch>
        </Router>, document.getElementById('create-article-form'));
Cookies.set('url', 'http://localhost:8080');

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
