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
    timestamp:true,
    OrderID:true
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
            simplifiedview:[],
            startDate: new Date().setDate(new Date().getDate() - 365),
            endDate:new Date(),
            url:Cookies.get('url'),
            username:Cookies.get("username"),
            simplified:true




        };
        this.handlestartdateChange= this.handlestartdateChange.bind(this);
        this.handleenddateChange= this.handleenddateChange.bind(this);
    }
    componentDidMount()
    {
        if(Cookies.get("username")==='')
        {
            window.location.href = "http://localhost:3000/";
        }
        axios.get(this.state.url+`/order/getorder/`+this.state.username).then(res => {
            this.setState(
                {
                    orders: res.data,
                }, this.handledateChange);
        });


    }
    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };
    handleLogout()
    {
        Cookies.set('username','');
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
        if(this.state.simplified===true)
        {
            let tempbooks = [];
            tempbooks = this.state.orders;
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
                simplifiedview:res,
                }
            )
        }
        else
        {
            let tempbooks = [];
            tempbooks = this.state.orders;
            let res = [];
            let start = new Date(this.state.startDate).getTime();
            let end = new Date(this.state.endDate).getTime();
            for (let i = 0; i < tempbooks.length; i++) {
                if (tempbooks[i].timestamp >= start && tempbooks[i].timestamp <= end) {
                    res.push(tempbooks[i]);
                }
            }
            this.setState({
                    books: res,
                    booksCp: res
                }
            )
        }

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
    handleDate(number)
    {
        if(number===1)
        {
            this.setState({
                startDate: new Date().setDate(new Date().getDate() - 365),
                endDate: new Date(),
            }, this.handledateChange);
        }
        if(number===2)
        {
            this.setState({
                startDate: new Date().setDate(new Date().getDate() - 30),
                endDate: new Date(),
            }, this.handledateChange);
        }
        if(number===3)
        {
            this.setState({
                startDate: new Date().setDate(new Date().getDate() - 7),
                endDate: new Date(),
            }, this.handledateChange);
        }
        if(number===4)
        {
            this.setState({
                startDate: new Date().setDate(new Date().getDate() - 1),
                endDate: new Date(),
            }, this.handledateChange);
        }
    }
    handleUnsubscribe()
    {
        let key = prompt("Are you sure you want to delete your account and all your infomation? Type your username", "Your Username");
        if(key===this.state.username)
        {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", this.state.url+"/userprofile/unsubscribe/username/"+this.state.username, false);
            xhr.send();
            if (xhr.responseText === "true")
            {
                alert("Your account has been unsubscribed!");
                window.location.href = "http://localhost:3000/";
                return;
            }
            else
            {
                alert("Failed to unsubscribe your account");
                window.location.href = "http://localhost:3000/";
                return;
            }
        }
    }
    handlewhole()
    {
        this.setState({
            simplified:false,
        },this.handledateChange)
    }
    handlesimplied()
    {
        this.setState({
            simplified:true,
        },this.handledateChange)
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
                                        <MDBDropdownItem onClick={()=>this.handleNavLink("UserProfile")}>UserProfile</MDBDropdownItem>
                                        <MDBDropdownItem onClick={()=>{this.handleLogout()}}>Logout</MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBDropdown>
                                    <MDBDropdownToggle nav caret>
                                        <MDBIcon icon="heart-broken" />
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu className="dropdown-default" right>
                                        <MDBDropdownItem onClick={()=>this.handleUnsubscribe()}>Unsubscribe</MDBDropdownItem>
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
                    {this.state.simplified?
                        <MDBTableHead>
                            <tr>
                                <th><a >BookID</a></th>
                                <th><a >BookName</a></th>
                                <th><a >Number</a></th>
                            </tr>
                        </MDBTableHead>
                        :
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
                    }
                    {this.state.simplified ?
                        <MDBTableBody>
                            {this.state.simplifiedview.map((item, index) => {
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
                            {this.state.books.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            {item.OrderID}
                                        </td>
                                        <td>
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
                    }
                </MDBTable>

                <MDBDropdown dropup className="fixed-bottom">
                    <MDBDropdownToggle caret color="primary">
                        Change
                    </MDBDropdownToggle>
                    <MDBDropdownMenu basic>
                        <MDBDropdownItem onClick={this.handlewhole.bind(this)}>Complicated view</MDBDropdownItem>
                        <MDBDropdownItem onClick={this.handlesimplied.bind(this)}>Simplified view</MDBDropdownItem>
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

export default Userstatistics;
