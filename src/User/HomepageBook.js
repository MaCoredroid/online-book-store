import React, { Component } from 'react';
import '../css/Center.css'
import axios from 'axios';
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
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { MDBBtn } from "mdbreact";
import {Link} from "react-router-dom";
import "../css/Modal.css"

import Cookies from 'js-cookie'

class HomepageBook extends Component {
    constructor(props) {
        super(props);
        this.state = {


            books:[],
            username:Cookies.get("username"),
            url:Cookies.get('url'),
            value: 0,
            value1:0,
            modal: false,
            model1:false

        }

    }
    componentDidMount() {
        if(Cookies.get("username")==='')
        {
            window.location.href = "http://localhost:3000/";
        }
        axios.get(this.state.url+`/Booklist/`+this.props.match.params.id).then(res => {
            this.setState({ books: res.data });
        });





    }

    handleback()
    {

            window.location.href = "http://localhost:3000/Homepage#/Homepage";

    }
    decrease = () => {
        if(this.state.value<=0)
        {
            this.setState({ value: 0 });
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
    decrease1 = () => {
        if(this.state.value1<=0)
        {
            this.setState({ value1: 0 });
        }
        else {
            this.setState({value1: this.state.value1 - 1});
        }
    }

    increase1 = () => {
        if(this.state.value1<0)
        {
            this.setState({ value1: 0 });
        }
        if(this.state.value1>=this.state.books.stock)
        {
            this.setState({ value1: this.state.books.stock });
        }
        else {
            this.setState({value1: this.state.value1 + 1});
        }
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    toggle1 = () => {
        this.setState({
            modal1: !this.state.modal1
        });
    }


    handlecart(username,isbn)
    {

        let number = this.state.value;

        if(number===0)
        {

        }
        else
        {
            let time=new Date().getTime();
            let xhr = new XMLHttpRequest();
            xhr.open("GET", this.state.url+"/cart/username/"+username+"/isbn/"+isbn+"/number/"+number.toString()+"/time/"+time.toString(), false);
            xhr.send();
            if (xhr.responseText === "true") {
                alert("Books have been added to your cart");
                this.setState({
                    modal: !this.state.modal
                });
                window.location.href = "http://localhost:3000/Homepage#/Cart";
            } else {
                alert("Failed to add books to your cart");
            }
        }



    }

    handleLogout()
    {
        Cookies.set('username','');
        window.location.href = "http://localhost:3000/"
    }
    handleNavLink(where){
        window.location.href = "http://localhost:3000/Homepage#/"+ where;
    }
    handlePurchase(username, isbn)
    {
        let number = this.state.value1;

        if(number===0)
        {

        }
        else
        {
            let time=new Date().getTime();
            let xhr = new XMLHttpRequest();
            xhr.open("GET", this.state.url+"/booklist/diredtlyOrder/username/"+this.state.username+"/isbn/"+isbn+"/number/"+number+"/time/"+time, false);
            xhr.send();
            if (xhr.responseText === "true") {
                alert("Books have been directly purchase.");
                this.setState({
                    modal: !this.state.modal1
                });
                window.location.href = "http://localhost:3000/Homepage#/Order";
            } else {
                alert("Failed to directly purchase books!");
            }
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
    render()
    {
        return(
            <div>
                <MDBNavbar color="indigo" dark expand="md" className="nav-justified">
                    <MDBNavbarBrand>
                        <strong className="dark-text">Books</strong>
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
                                        <MDBDropdownItem onClick={()=>this.handleUnsubscribe()}>Unsubscribe</MDBDropdownItem>
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
                            <th><a >BookID</a></th>
                            <th><a >Name</a></th>
                            <th><a >Author</a></th>
                            <th><a >Price</a></th>
                            <th><a >Isbn</a></th>
                            <th><a >Stock</a></th>
                            <th><a >Sales</a></th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>

                                <tr >
                                    <td >
                                        {this.state.books.booklistID}
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
                                        {this.state.books.stock}
                                    </td>
                                    <td>
                                        {this.state.books.sales}
                                    </td>


                                </tr>

                    </MDBTableBody>
                </MDBTable>
                <img class="center" src={this.state.url+"/image/"+ this.props.match.params.id} height={"289"} width={"200"}/>
                <MDBDropdown dropup className="fixed-bottom">
                    <MDBDropdownToggle caret color="primary">
                        Action
                    </MDBDropdownToggle>
                    <MDBDropdownMenu basic>
                        <MDBDropdownItem onClick={this.handleback}>Back</MDBDropdownItem>
                        <MDBDropdownItem onClick={this.toggle}>Add to cart</MDBDropdownItem>
                        <MDBDropdownItem onClick={this.toggle1}>Directly Purchase</MDBDropdownItem>
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
                            <MDBBtn color="primary" onClick={()=>{this.handlecart(this.state.username,this.props.match.params.id)}}>Add to Cart</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                </MDBContainer>
                <MDBContainer>
                    <MDBModal isOpen={this.state.modal1} toggle={this.toggle1}>
                        <MDBModalHeader toggle={this.toggle1}>Please choose the number</MDBModalHeader>
                        <MDBModalBody>
                            <div className="def-number-input number-input">
                                <button onClick={this.decrease1} className="minus"></button>
                                <input className="quantity" name="quantity" value={this.state.value1} onChange={()=> console.log('change')}
                                       type="number" />
                                <button onClick={this.increase1} className="plus"></button>
                            </div>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={this.toggle1}>Close</MDBBtn>
                            <MDBBtn color="primary" onClick={()=>{this.handlePurchase(this.state.username,this.props.match.params.id)}}>Directly Purchase</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                </MDBContainer>


            </div>

        )
    }
}

export default HomepageBook;
