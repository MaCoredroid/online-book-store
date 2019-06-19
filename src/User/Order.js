import React, { Component } from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse, MDBFormInline,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBRow, MDBContainer, MDBCol, MDBBtn
} from "mdbreact";
import { Link } from 'react-router-dom'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import axios from "axios/index";
import Cookies from "js-cookie";




let order = {
    name: true,
    author: true,
    price: true,
    isbn: true,
    stock: true,
    OrderID:true,
    timestamp:true,
};
let orderBy = 'name';
class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            orders:[],
            books: [



            ],
            booksCp: [



            ],
            url:Cookies.get('url'),
            username:Cookies.get("username"),
            images: [

            ],
            searchOption:"Name"
        };
    }
    componentDidMount()
    {

        axios.get(this.state.url+`/order/getorder/`+this.state.username).then(res => {
                this.setState(
                    {
                        books: res.data,
                        booksCp: res.data
                    });
            });
        axios.get(this.state.url+`/isbnlist`,
        )
            .then(res => {
                this.setState(
                    {
                        images: res.data,

                    });
            });


    }
    handleSearchOption(what){
        this.setState({
            searchOption:what
        })
    }

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };
    handleLink(isbn,number,id) {
        Cookies.set('ordernumber',number);
        Cookies.set('orderid',id);
        let res = isbn.substring(isbn.length - 17,isbn.length);
        window.location.href = "http://localhost:3000"+"/Homepage#/orderpage/detail/" + res

    }
    handleLogout()
    {
        window.location.href = "http://localhost:3000/"
    }
    handleSort(index) {
        orderBy = index;
        order[index] = !order[index];
        let list = [];
        for (let i = 0; i < this.state.books.length; i++) {
            list.push(this.state.books[i])
        }
        list.sort(this.sort)
        this.setState({
            books: list
        })
    }
    sort(a, b) {
        let res = 0;
        if (a[orderBy] < b[orderBy]) {
            res = -1
        } else if (a[orderBy] > b[orderBy]) {
            res = 1
        } else {
            res = 0
        }
        if (!order[orderBy]) {
            res = 0 - res
        }
        return res
    }
    handleChange() {
        if(this.state.searchOption==="Name") {
            let pattern = document.getElementById('filter').value
            let list = this.state.booksCp.filter((item) => {
                return item.name.indexOf(pattern) !== -1
            })
            this.setState({
                books: list
            })
            return;
        }
        if(this.state.searchOption==="Author") {
            let pattern = document.getElementById('filter').value
            let list = this.state.booksCp.filter((item) => {
                return item.author.indexOf(pattern) !== -1
            })
            this.setState({
                books: list
            })
            return;
        }
        if(this.state.searchOption==="isbn") {
            let pattern = document.getElementById('filter').value
            let list = this.state.booksCp.filter((item) => {
                return item.isbn.indexOf(pattern) !== -1
            })
            this.setState({
                books: list
            })
            return;
        }

    }
    handleClearAll()
    {
        let xhr = new XMLHttpRequest();
        let key = prompt("Are you sure? Type your username to confirm", "Your username");
        if(key===this.state.username)
        {

        }
        else
        {
            alert("Please input correct username!");
            return;
        }
        xhr.open("GET", this.state.url+"/order/clearall/username/"+this.state.username+"/username/"+this.state.username, false);
        xhr.send();
        if (xhr.responseText === "true")
        {
            alert("All orders record has been removed ");
        }
        else
        {
            alert("Failed to remove all the orders");
        }
        window.location.reload();
    }
    handleNavLink(where){
        window.location.href = "http://localhost:3000/Homepage#/"+ where;
    }
    render() {
        return (
            <div>
                <MDBNavbar color="indigo" dark expand="md" className="nav-justified">
                    <MDBNavbarBrand>
                        <strong className="dark-text">Orders</strong>
                    </MDBNavbarBrand>

                    <MDBNavbarBrand>
                        <strong className="dark-text">Weclome,  User {this.state.username}           </strong>
                    </MDBNavbarBrand>

                    <MDBNavbarToggler onClick={this.toggleCollapse} />
                    <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                        <MDBNavbarNav left>
                            <MDBNavItem>
                                <MDBDropdown>
                                    <MDBDropdownToggle nav caret>
                                        <span className="mr-2">Dropdown</span>
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu>
                                        <MDBDropdownItem onClick={()=>this.handleNavLink("Order")}>Order</MDBDropdownItem>
                                        <MDBDropdownItem onClick={()=>this.handleNavLink("Cart")}>Cart</MDBDropdownItem>
                                        <MDBDropdownItem onClick={()=>this.handleNavLink("Homepage")}>Homepage</MDBDropdownItem>
                                        <MDBDropdownItem onClick={()=>this.handleNavLink("Userstatistics")}>Statistics</MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavItem>

                        </MDBNavbarNav>

                        <MDBNavbarNav right>
                            <MDBNavItem>
                                <MDBDropdown >
                                    <MDBDropdownToggle nav caret>
                                        <span className="mr-2">Search by {this.state.searchOption}</span>
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu>
                                        <MDBDropdownItem onClick={()=>this.handleSearchOption("Name")}>Name</MDBDropdownItem>
                                        <MDBDropdownItem onClick={()=>this.handleSearchOption("Author")}>Author</MDBDropdownItem>
                                        <MDBDropdownItem onClick={()=>this.handleSearchOption("isbn")}>isbn</MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBFormInline waves>
                                    <div className="md-form my-0">
                                        <input id={'filter'} className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" onChange={() => this.handleChange()} />
                                    </div>
                                </MDBFormInline>
                            </MDBNavItem>

                            <MDBNavItem>
                                <MDBDropdown>
                                    <MDBDropdownToggle nav caret>
                                        <MDBIcon icon="user" />
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu className="dropdown-default" right>
                                        <MDBDropdownItem onClick={()=>this.handleNavLink("UserProfile")}>UserProfile</MDBDropdownItem>
                                        <MDBDropdownItem onClick={()=>{this.handleLogout()}}>Logout</MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>

                </MDBNavbar>

                <MDBTable>
                    <MDBTableHead>
                        <tr>
                            <th><a onClick={() => { this.handleSort("OrderID") }}>OrderID</a></th>
                            <th><a onClick={() => { this.handleSort("name") }}>Name</a></th>
                            <th><a onClick={() => { this.handleSort("author") }}>Author</a></th>
                            <th><a onClick={() => { this.handleSort("price") }}>Price</a></th>
                            <th><a onClick={() => { this.handleSort("isbn") }}>Isbn</a></th>
                            <th><a onClick={() => { this.handleSort("number") }}>Number</a></th>
                            <th><a onClick={() => { this.handleSort("timestamp") }}>Time</a></th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {this.state.books.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td >
                                        {item.OrderID}
                                    </td>
                                    <td >
                                        {item.name}
                                    </td>
                                    <td>
                                        {item.author}
                                    </td>
                                    <td>
                                        {item.price / 100}
                                    </td>
                                    <td>
                                        {item.isbn}
                                    </td>
                                    <td>
                                        {item.number}
                                    </td>
                                    <td>
                                        {(new Date(parseInt(item.timestamp))).toString()}
                                    </td>
                                    <td onClick={() => {this.handleLink(item.isbn,item.number,item.OrderID)}}>
                                        Details
                                    </td>
                                </tr>
                            )
                        })}
                    </MDBTableBody>
                </MDBTable>
                <MDBBtn className="fixed-bottom" color="danger" onClick={()=>this.handleClearAll()}>Clear all</MDBBtn>
            </div>







        );
    }
}

export default Order;