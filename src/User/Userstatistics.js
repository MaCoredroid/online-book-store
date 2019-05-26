import React, { Component } from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse, MDBFormInline,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon,
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
};
let orderBy = 'name';
class Userstatistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            books: [



            ],
            booksCp: [



            ],
            startDate: new Date(),
            endDate: new Date()
        };
        this.handledateChange= this.handledateChange.bind(this);
        this.handledateChange1= this.handledateChange1.bind(this);
    }
    componentDidMount()
    {
        axios.get(`http://localhost:8080/Javaweb_war_exploded/Order`,
            {
                params: {
                    flag:"FALSE",
                    username:Cookies.get("username"),
                }
            }
        )
            .then(res => {
                this.setState(
                    {
                        books: res.data,
                        booksCp: res.data
                    });
            });
        this.setState({username:Cookies.get("username")});

    }
    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };
    handleLink(isbn) {
        Cookies.set('cart',0);
        Cookies.set('homepage',0);
        Cookies.set('order',1);
        return "/detail/" + isbn
    }
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
    handleChange() {
        let pattern = document.getElementById('filter').value
        let list = this.state.booksCp.filter((item) => {
            return item.name.indexOf(pattern) !== -1
        })
        this.setState({
            books: list
        })
    }
    handledateChange(date)
    {
        this.setState({
            startDate: date
        });
        let start = this.state.startDate.getTime();
        let end = this.state.endDate.getTime();
        axios.get(`http://localhost:8080/Javaweb_war_exploded/Order`,
            {
                params: {
                    start:start,
                    end:end,
                    flag:"TRUE",
                    username:Cookies.get("username"),
                }
            }
        )
            .then(res => {
                this.setState(
                    {
                        books: res.data,
                        booksCp: res.data
                    });
            });
    }
    handledateChange1(date)
    {
        this.setState({
            endDate: date
        });
        let start = this.state.startDate.getTime();
        let end = this.state.endDate.getTime();
        axios.get(`http://localhost:8080/Javaweb_war_exploded/Order`,
            {
                params: {
                    start:start,
                    end:end,
                    flag:"TRUE",
                    username:Cookies.get("username"),
                }
            }
        )
            .then(res => {
                this.setState(
                    {
                        books: res.data,
                        booksCp: res.data
                    });
            });
    }
    render() {
        return (
            <paper>
                <MDBNavbar color="indigo" dark expand="md" className="nav-justified">
                    <MDBNavbarBrand>
                        <strong className="white-text">Statistics</strong>
                    </MDBNavbarBrand>
                    <MDBNavbarBrand>
                        <strong className="white-text">Weclome,  User {this.state.username}           </strong>
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
                                        <MDBDropdownItem ><Link to="/Order" >Order</Link></MDBDropdownItem>
                                        <MDBDropdownItem ><Link to="/Userstatistics" >Statistics</Link></MDBDropdownItem>
                                        <MDBDropdownItem ><Link to="/Cart" >Cart</Link></MDBDropdownItem>
                                        <MDBDropdownItem ><Link to="/Homepage" >Homepage</Link></MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavItem>
                        </MDBNavbarNav>
                        <MDBNavbarNav right>
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
                            <th><a onClick={() => { this.handleSort("name") }}>书名</a></th>
                            <th><a onClick={() => { this.handleSort("author") }}>作者</a></th>
                            <th><a onClick={() => { this.handleSort("price") }}>价格</a></th>
                            <th><a onClick={() => { this.handleSort("isbn") }}>isbn</a></th>
                            <th><a onClick={() => { this.handleSort("stock") }}>数量</a></th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>

                        <tr >
                            <td >
                                {this.state.books.name}
                            </td>
                            <td>
                                {this.state.books.author}
                            </td>
                            <td>
                                {this.state.books.price / 100}
                            </td>
                            <td>
                                {this.state.books.isbn}
                            </td>
                            <td>
                                {this.state.books.stock}
                            </td>


                        </tr>

                    </MDBTableBody>
                </MDBTable>
                <p>
                    Start from:
                </p>

                <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handledateChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    timeCaption="time"
                />
                    <p>

                    </p>
                <p>
                    To:
                </p>

                <DatePicker
                    selected={this.state.endDate}
                    onChange={this.handledateChange1}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    timeCaption="time"
                />


            </paper>







        );
    }
}

export default Userstatistics;