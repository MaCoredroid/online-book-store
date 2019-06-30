import React, { Component } from 'react';
import '../css/Center.css'
import axios from 'axios/index';
import {
    MDBCollapse, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBFormInline, MDBIcon,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarToggler, MDBNavItem,
    MDBTable,
    MDBTableBody,
    MDBTableHead
} from "mdbreact";
import {Link} from "react-router-dom";

import Cookies from 'js-cookie'

class OrderpageBook extends Component {
    constructor(props) {
        super(props);
        this.state = {


            books:[],
            username:Cookies.get("username"),
            url:Cookies.get('url'),




        }

    }
    componentDidMount() {
        if(Cookies.get("username")==='')
        {
            window.location.href = "http://localhost:3000/";
        }
        axios.get(this.state.url+`/order/id/`+this.props.match.params.id).then(res => {
            this.setState({ books: res.data });
        });
    }

    handleback()
    {

            window.location.href = "http://localhost:3000/Homepage#/Order";

    }


    handleLogout()
    {
        Cookies.set('username','');
        window.location.href = "http://localhost:3000/Homepage#/"
    }
    handleNavLink(where){
        window.location.href = "http://localhost:3000/Homepage#/"+ where;
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
                Cookies.set('username','');
                window.location.href = "http://localhost:3000/";
                return;
            }
            else
            {
                alert("Failed to unsubscribe your account");
                return;
            }
        }
    }

    render()
    {
        return(
            <div>
                <MDBNavbar color="indigo" dark expand="md" className="nav-justified" >
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

                <MDBTable responsive small fixed bordered hover>
                    <MDBTableHead>
                        <tr>
                            <th><a >OrderID</a></th>
                            <th><a >BookID</a></th>
                            <th><a >Book Name</a></th>
                            <th><a >Author</a></th>
                            <th><a >Price</a></th>
                            <th><a >Isbn</a></th>
                            <th><a >Number</a></th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>

                        <tr >
                            <td >
                                {this.state.books.OrderID}
                            </td>
                            <td >
                                {this.state.books.bookid}
                            </td>
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
                                {this.state.books.number}
                            </td>


                        </tr>

                    </MDBTableBody>
                </MDBTable>
                <img class="center" src={this.state.url+"/image/"+ this.state.books.bookid} height={"289"} width={"200"}/>
                <MDBDropdown dropup className="fixed-bottom">
                    <MDBDropdownToggle caret color="primary">
                        Action
                    </MDBDropdownToggle>
                    <MDBDropdownMenu basic>
                        <MDBDropdownItem onClick={this.handleback}>Back</MDBDropdownItem>
                    </MDBDropdownMenu>
                </MDBDropdown>

            </div>

        )
    }
}

export default OrderpageBook;
