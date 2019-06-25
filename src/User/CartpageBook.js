import React, { Component } from 'react';
import '../css/Center.css'
import axios from 'axios/index';
import {
    MDBCollapse,
    MDBContainer,
    MDBDropdown,
    MDBDropdownItem,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBFormInline,
    MDBIcon,
    MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarToggler,
    MDBNavItem,
    MDBTable,
    MDBTableBody,
    MDBTableHead
} from "mdbreact";
import { MDBBtn } from "mdbreact";
import {Link} from "react-router-dom";

import Cookies from 'js-cookie'

class CartpageBook extends Component {
    constructor(props) {
        super(props);
        this.state = {


            books:[],
            username:Cookies.get("username"),
            url:Cookies.get('url'),
            value: 0,
            modal: false




        }

    }
    componentDidMount() {
        if(Cookies.get("username")==='')
        {
            window.location.href = "http://localhost:3000/";
        }
        axios.get(this.state.url+`/cart/cartid/`+this.props.match.params.id).then(res => {
            this.setState({ books: res.data,
            });
        });


    }
    decrease = () => {
        if(this.state.value<=1)
        {
            this.setState({ value: 1 });
        }
        else {
            this.setState({value: this.state.value - 1});
        }
    }

    increase = () => {
        if(this.state.value<0)
        {
            this.setState({ value: 0 });
        }
        if(this.state.value>=this.state.books.stock)
        {
            this.setState({ value: this.state.books.stock });
        }
        else {
            this.setState({value: this.state.value + 1});
        }
    }

    toggle = () => {
        this.setState({
            value:this.state.books.number,
            modal: !this.state.modal

        });
    }
    handleback()
    {

            window.location.href = "http://localhost:3000/Homepage#/Cart";

    }

    handleremovefromcart(CartID)
    {


            let xhr = new XMLHttpRequest();
            xhr.open("GET", this.state.url+"/cart/remove/"+CartID, false);
            xhr.send();
            if (xhr.responseText === "true") {+
                alert("Books have removed from your cart");
            } else {
                alert("Failed to remove books from your cart");
            }
            window.location.href = "http://localhost:3000/Homepage#/Cart";

    }
    handleChangecart()
    {
        let number= this.state.value;

        if(number===this.state.books.number)
        {

        }
        else
        {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", this.state.url + "/cart/change/" + this.state.books.CartID+"/number/"+this.state.value, false);
            xhr.send();
            if (xhr.responseText === "true")
            {
                    alert("The number has changed");
                window.location.href = "http://localhost:3000/Homepage#/Cart";
            }
            else
            {
                alert("Failed to change number");
            }

        }

    }
    handleLogout()
    {
        Cookies.set('username','');
        window.location.href = "http://localhost:3000/"
    }
    handlePurchase()
    {
        let time=new Date().getTime();
        let xhr = new XMLHttpRequest();
        xhr.open("GET", this.state.url+"/cart/purchase/"+this.state.books.CartID+"/time/"+time.toString(), false);
        xhr.send();
        if (xhr.responseText === "true")
        {
            alert("Books have been purchased");
            window.location.href = "http://localhost:3000/Homepage#/Order";
        }
        else
        {
            alert("Failed to purchase: Not enough books.");
        }
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

    render()
    {
        return(
            <a>
                <MDBNavbar color="indigo" dark expand="md" className="nav-justified" >
                    <MDBNavbarBrand>
                        <strong className="dark-text">Carts</strong>
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

                <MDBTable>
                    <MDBTableHead>
                        <tr>
                            <th><a >CartID</a></th>
                            <th><a >BookID</a></th>
                            <th><a >Name</a></th>
                            <th><a >Author</a></th>
                            <th><a >Price</a></th>
                            <th><a >Isbn</a></th>
                            <th><a >Number</a></th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>

                        <tr >
                            <td >
                                {this.state.books.CartID}
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
                <MDBDropdown dropup >
                    <MDBDropdownToggle caret color="primary">
                        Action
                    </MDBDropdownToggle>
                    <MDBDropdownMenu basic>
                        <MDBDropdownItem  onClick={()=>{this.handleremovefromcart(this.state.books.CartID)}}>Remove from cart</MDBDropdownItem>
                        <MDBDropdownItem onClick={this.handlePurchase.bind(this)}>Purchase</MDBDropdownItem>
                        <MDBDropdownItem onClick={this.toggle}>Change number</MDBDropdownItem>
                        <MDBDropdownItem onClick={this.handleback}>Back</MDBDropdownItem>
                    </MDBDropdownMenu>
                </MDBDropdown>
                <MDBContainer>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                        <MDBModalHeader toggle={this.toggle}>Please choose the number</MDBModalHeader>
                        <MDBModalBody>
                            <div className="def-number-input number-input">
                                <button onClick={this.decrease} className="minus"></button>
                                <input className="quantity" name="quantity" value={this.state.value} onChange={()=> console.log('change')}
                                       type="number" />
                                <button onClick={this.increase} className="plus"></button>
                            </div>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
                            <MDBBtn color="primary" onClick={()=>{this.handleChangecart()}}>Change</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                </MDBContainer>

            </a>

        )
    }
}

export default CartpageBook;
