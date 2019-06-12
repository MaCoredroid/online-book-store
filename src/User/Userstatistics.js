import React, { Component } from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse, MDBFormInline,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBInput, MDBContainer, MDBModal
} from "mdbreact";
import { Link } from 'react-router-dom'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import axios from "axios/index";
import Cookies from "js-cookie";
import DatePicker from "react-datepicker/es";
import "react-datepicker/dist/react-datepicker.css";





let order = {
    name: true,
    author: true,
    price: true,
    isbn: true,
    stock: true,
    timestamp:true
};
let orderBy = 'name';
class Userstatistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            orders: [

            ],
            carts:[

            ],
            books:[

            ],
            booksCp: [

            ],
            startDate: new Date().setFullYear(new Date().getFullYear() - 1),
            endDate: new Date(),
            url:Cookies.get('url'),
            username:Cookies.get("username"),
            cartisshowing:true,




        };
        this.handlestartdateChange= this.handlestartdateChange.bind(this);
        this.handleenddateChange= this.handleenddateChange.bind(this);
    }
    componentDidMount()
    {
        axios.get(this.state.url+`/cart/`+this.state.username).then(res => {
            this.setState(
                {
                    carts: res.data,
                    books: res.data,
                    booksCp:res.data

                });
        });
        axios.get(this.state.url+`/order/getorder/`+this.state.username).then(res => {
            this.setState(
                {
                    orders: res.data,
                });
        });
        this.handledateChange.bind(this);


    }
    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };
    handleLogout()
    {
        window.location.href = "http://localhost:3000/"
    }
    handleSort(index) {
        orderBy = index
        order[index] = !order[index]
        let list = []
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
    handledateChange(){
        let tempbooks=[];
        if(this.state.cartisshowing===true) {
            tempbooks = this.state.carts;
        }
        else {
            tempbooks = this.state.orders;
        }
        let res=[];
        let start=new Date(this.state.startDate).getTime();
        let end=new Date(this.state.endDate).getTime();
        for(let i=0;i<tempbooks.length;i++)
        {
            if(tempbooks[i].timestamp>=start&&tempbooks[i].timestamp<=end)
            {
                res.push(tempbooks[i]);
            }
        }
        this.setState({
            books: res,
            booksCp:res
        }
        )

    }
    handleChange() {
        let pattern = document.getElementById('filter').value
        let list = this.state.booksCp.filter((item) => {
            return item.name.indexOf(pattern) !== -1
        })
        this.setState({
            books: list
        })
    }
    handleOrder(){
        this.setState({
            cartisshowing:false,
        }, this.handledateChange)
    }
    handleCart(){
        this.setState({
            cartisshowing:true,
        },this.handledateChange)
    }
    handleNavLink(where){
        window.location.href = "http://localhost:3000/Homepage#/"+ where;
    }
    handlestartdateChange(date){
        this.setState({
            startDate: date
        }, this.handledateChange);
    }
    handleenddateChange(date){
        this.setState({
            endDate: date
        }, this.handledateChange);
    }
    render() {
        return (
            <div>
                <MDBNavbar color="indigo" dark expand="md" className="nav-justified">
                    <MDBNavbarBrand>
                        <strong className="dark-text">Statistics</strong>
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
                                <MDBDropdown>
                                    <MDBDropdownToggle nav caret>
                                        <MDBIcon icon="user" />
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu className="dropdown-default" right>

                                        <MDBDropdownItem onClick={()=>{this.handleLogout()}}>Logout</MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>

                </MDBNavbar>

                <p>Start from:</p>


                <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handlestartdateChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    timeCaption="time"
                    popperClassName="some-custom-class"
                    popperPlacement="top-end"
                    popperModifiers={{
                        offset: {
                            enabled: true,
                            offset: '5px, 10px'
                        },
                        preventOverflow: {
                            enabled: true,
                            escapeWithReference: false, // force popper to stay in viewport (even when input is scrolled out of view)
                            boundariesElement: 'viewport'
                        }
                    }}
                />
                <p> </p>
                <p>To:</p>


                <DatePicker
                    selected={this.state.endDate}
                    onChange={this.handleenddateChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    timeCaption="time"
                    popperClassName="some-custom-class"
                    popperPlacement="top-end"
                    popperModifiers={{
                        offset: {
                            enabled: true,
                            offset: '5px, 10px'
                        },
                        preventOverflow: {
                            enabled: true,
                            escapeWithReference: false, // force popper to stay in viewport (even when input is scrolled out of view)
                            boundariesElement: 'viewport'
                        }
                    }}
                />
                <MDBTable>
                    <MDBTableHead>
                        <tr>
                            { this.state.cartisshowing ? <th><a onClick={() => { this.handleSort("CartID") }}>CartID</a></th> : <th><a onClick={() => { this.handleSort("OrderID") }}>OrderID</a></th> }
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
                                    { this.state.cartisshowing ?
                                    <td >
                                        {item.CartID}
                                    </td> :
                                    <td >
                                        {item.OrderID}
                                    </td>
                                    }
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
                                </tr>
                            )
                        })}
                    </MDBTableBody>
                </MDBTable>

                <MDBDropdown dropup className="fixed-bottom">
                    <MDBDropdownToggle caret color="primary">
                        Change
                    </MDBDropdownToggle>
                    <MDBDropdownMenu basic>
                        <MDBDropdownItem onClick={this.handleOrder.bind(this)}>Order</MDBDropdownItem>
                        <MDBDropdownItem onClick={this.handleCart.bind(this)}>Cart</MDBDropdownItem>
                    </MDBDropdownMenu>
                </MDBDropdown>


            </div>







        );
    }
}

export default Userstatistics;