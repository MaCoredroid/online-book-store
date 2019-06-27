import React, { Component } from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse, MDBFormInline,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBRow, MDBContainer, MDBCol, MDBBtn
} from "mdbreact";
import { Link } from 'react-router-dom'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import axios from 'axios/index';
import Cookies from "js-cookie";
import "../css/Homepage.css";
import DatePicker from "react-datepicker/es";



class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            orders: [],
            username: Cookies.get("username"),
            sales: [],
            user:[],
            startDate: new Date().setDate(new Date().getDate() - 7),
            endDate: new Date(),
            salesisshowing: false
        };
        this.handlestartdateChange = this.handlestartdateChange.bind(this);
        this.handleenddateChange = this.handleenddateChange.bind(this);
    }

    componentDidMount() {
        if (Cookies.get("username") === '') {
            window.location.href = "http://localhost:3000/";
        }
        let url = Cookies.get('url');
        axios.get(url + '/admin/seeAllOrder',)
            .then(res => {
                this.setState(
                    {
                        orders: res.data,
                        sales: []
                    }, this.handledateChange);
            });
    }

    toggleCollapse = () => {
        this.setState({isOpen: !this.state.isOpen});
    };

    handleLogout() {
        Cookies.set('username', '');
        window.location.href = "http://localhost:3000/"
    }

    handleNavLink(where) {
        window.location.href = "http://localhost:3000/UserManage#/" + where;
    }

    handledateChange() {
        if(this.state.salesisshowing===true) {
            let tempbooks = this.state.orders;
            let res = [];
            let start = new Date(this.state.startDate).getTime();
            let end = new Date(this.state.endDate).getTime();
            for (let i = 0; i < tempbooks.length; i++) {
                let flag = false;
                if (tempbooks[i].timestamp >= start && tempbooks[i].timestamp <= end) {
                    for (let j = 0; j < res.length; j++) {
                        if (res[j].bookid === tempbooks[i].bookid) {
                            res[j].sales += tempbooks[i].number;
                            flag = true;
                            break;
                        }
                    }
                    if (flag === false) {
                        let book = {
                            "bookid": tempbooks[i].bookid,
                            "name": tempbooks[i].name,
                            "sales": tempbooks[i].number
                        }
                        res.push(book);
                    }
                }
            }
            this.setState({
                    sales: res
                }
            )
        }
        else
        {
            let tempbooks = this.state.orders;
            let res = [];
            let start = new Date(this.state.startDate).getTime();
            let end = new Date(this.state.endDate).getTime();
            for (let i = 0; i < tempbooks.length; i++) {
                let flag = false;
                if (tempbooks[i].timestamp >= start && tempbooks[i].timestamp <= end) {
                    for (let j = 0; j < res.length; j++) {
                        if (res[j].userid === tempbooks[i].userid) {
                            res[j].money += tempbooks[i].number * tempbooks[i].price/100;
                            flag = true;
                            break;
                        }
                    }
                    if (flag === false) {
                        let book = {
                            "userid": tempbooks[i].userid,
                            "name": tempbooks[i].username,
                            "money": tempbooks[i].number * tempbooks[i].price/100,
                        }
                        res.push(book);
                    }
                }
            }
            this.setState({
                    user: res
                }
            )
        }

    }

    handlestartdateChange(date) {
        this.setState({
            startDate: date
        }, this.handledateChange);
    }

    handleenddateChange(date) {
        this.setState({
            endDate: date
        }, this.handledateChange);
    }

    handleDate(number) {
        if (number === 1) {
            this.setState({
                startDate: new Date().setDate(new Date().getDate() - 365),
                endDate: new Date(),
            }, this.handledateChange);
        }
        if (number === 2) {
            this.setState({
                startDate: new Date().setDate(new Date().getDate() - 30),
                endDate: new Date(),
            }, this.handledateChange);
        }
        if (number === 3) {
            this.setState({
                startDate: new Date().setDate(new Date().getDate() - 7),
                endDate: new Date(),
            }, this.handledateChange);
        }
        if (number === 4) {
            this.setState({
                startDate: new Date().setDate(new Date().getDate() - 1),
                endDate: new Date(),
            }, this.handledateChange);
        }
    }

    handleUser()
    {
        this.setState({
            salesisshowing: false,
        },this.handledateChange)

    }
    handleSales()
    {
        this.setState({
            salesisshowing: true,
        },this.handledateChange)
    }
    render() {
        return (
            <div>
                <MDBNavbar color="default-color" dark expand="md" className="nav-justified" >
                    <MDBNavbarBrand>
                        <strong className="dark-text">Statistics</strong>
                    </MDBNavbarBrand>

                    <MDBNavbarBrand>
                        <strong className="dark-text">Weclome,  Admin {this.state.username}           </strong>
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
                                        <MDBDropdownItem onClick={()=>this.handleNavLink("OrderManage")}>OrderManage</MDBDropdownItem>
                                        <MDBDropdownItem onClick={()=>this.handleNavLink("CartManage")}>CartManage</MDBDropdownItem>
                                        <MDBDropdownItem onClick={()=>this.handleNavLink("BookManage")}>BookManage</MDBDropdownItem>
                                        <MDBDropdownItem onClick={()=>this.handleNavLink("UserManage")}>UserManage</MDBDropdownItem>
                                        <MDBDropdownItem onClick={()=>this.handleNavLink("Statistics")}>Statistics</MDBDropdownItem>
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
                                        <MDBDropdownItem onClick={()=>this.handleNavLink("AdminProfile")}>AdminProfile</MDBDropdownItem>
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
                <p> </p>
                <p> </p>
                <MDBTable>
                    <MDBTableHead>
                        {this.state.salesisshowing?
                        <tr>
                            <th><a>BookID</a></th>
                            <th><a>BookName</a></th>
                            <th><a>Sales</a></th>
                        </tr>
                            :
                        <tr>
                            <th><a>UserID</a></th>
                            <th><a>UserName</a></th>
                            <th><a>Total Amount</a></th>
                        </tr>
                        }
                    </MDBTableHead>
                    {this.state.salesisshowing?
                    <MDBTableBody>
                        {this.state.sales.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td >
                                        {item.bookid}
                                    </td>
                                    <td >
                                        {item.name}
                                    </td>
                                    <td >
                                        {item.sales}
                                    </td>
                                </tr>
                            )
                        })}
                    </MDBTableBody>
                        :
                    <MDBTableBody>
                        {this.state.user.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td >
                                        {item.userid}
                                    </td>
                                    <td >
                                        {item.name}
                                    </td>
                                    <td >
                                        {item.money}
                                    </td>
                                </tr>
                            )
                        })}
                    </MDBTableBody>
                    }
                </MDBTable>
                <MDBDropdown dropup className="fixed-bottom">
                    <MDBDropdownToggle caret color="primary">
                        Change
                    </MDBDropdownToggle>
                    <MDBDropdownMenu basic>
                        <MDBDropdownItem onClick={this.handleUser.bind(this)}>Users</MDBDropdownItem>
                        <MDBDropdownItem onClick={this.handleSales.bind(this)}>Sales</MDBDropdownItem>
                        <MDBDropdownItem onClick={()=>this.handleDate(1)}>In one year</MDBDropdownItem>
                        <MDBDropdownItem onClick={()=>this.handleDate(2)}>In one month</MDBDropdownItem>
                        <MDBDropdownItem onClick={()=>this.handleDate(3)}>In one week</MDBDropdownItem>
                        <MDBDropdownItem onClick={()=>this.handleDate(4)}>In one day</MDBDropdownItem>
                    </MDBDropdownMenu>
                </MDBDropdown>
            </div>







        );
    }
}

export default Statistics;
