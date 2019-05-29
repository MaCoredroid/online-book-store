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
            cartnumber:Cookies.get('cartnumber'),
            cartid:Cookies.get('cartid'),




        }

    }
    componentDidMount() {

        axios.get(this.state.url+`/Booklist/`+this.props.match.params.id).then(res => {
            this.setState({ books: res.data });
        });



    }

    handleback()
    {

            window.location.href = "http://localhost:3000/Homepage#/Cart";

    }

    handleremovefromcart(booklistID)
    {


            let xhr = new XMLHttpRequest();
            xhr.open("GET", this.state.url+"/cart/remove/"+booklistID, false);
            xhr.send();
            if (xhr.responseText === "true") {+
                alert("Books have removed from your cart");
            } else {
                alert("Failed to remove books from your cart");
            }
            window.location.href = "http://localhost:3000/Homepage#/Cart";

    }
    handleLogout()
    {
        window.location.href = "http://localhost:3000/"
    }
    handlepurchase(username,isbn)
    {
        let number=0;
        while(true)
        {
            number = parseInt(prompt("Please enter the number to add to purchase:", "0"));
            console.log(number);
            if(number==null || number==""|| number===0|| isNaN(number))
            {
                break;
            }
            if ((number % 1 === 0) && number > 0) {

                break;
            }
            else {
                alert("Please enter positive integer");
            }
        }

        if(number==null || number==""|| number===0||isNaN(number))
        {

        }
        else
        {
            let xhr = new XMLHttpRequest();
            xhr.open("POST", " http://localhost:8080/Javaweb_war_exploded/Order", false);
            xhr.send(JSON.stringify({
                "username": username,
                "isbn": isbn,
                "number": number,

            }));
            console.log(xhr.status);
            if (xhr.responseText === "TRUE") {
                alert("Books have been ordered");
            } else {
                alert("Failed to order books");
            }
        }


    }



    render()
    {
        return(
            <a>
                <MDBNavbar color="indigo" dark expand="md" className="nav-justified">
                    <MDBNavbarBrand>
                        <strong className="white-text">BOOK</strong>
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
                                        <MDBDropdownItem ><Link to="/Cart" >Cart</Link></MDBDropdownItem>
                                        <MDBDropdownItem ><Link to="/Homepage" >Homepage</Link></MDBDropdownItem>
                                        <MDBDropdownItem ><Link to="/Userstatistics" >Statistics</Link></MDBDropdownItem>
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

                <MDBTable>
                    <MDBTableHead>
                        <tr>
                            <th><a >购物车编号</a></th>
                            <th><a >书名</a></th>
                            <th><a >作者</a></th>
                            <th><a >价格</a></th>
                            <th><a >isbn</a></th>
                            <th><a >数量</a></th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>

                        <tr >
                            <td >
                                {this.state.cartid}
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
                                {this.state.cartnumber}
                            </td>


                        </tr>

                    </MDBTableBody>
                </MDBTable>
                <img class="center" src={this.state.url+"/image/"+ this.props.match.params.id} height={"289"} width={"200"}/>
                <MDBDropdown class="center">
                    <MDBDropdownToggle caret color="primary">
                        Action
                    </MDBDropdownToggle>
                    <MDBDropdownMenu basic>
                        <MDBDropdownItem  onClick={()=>{this.handleremovefromcart(this.state.cartid)}}>Remove from cart</MDBDropdownItem>
                        <MDBDropdownItem onClick={()=>{this.handlepurchase(this.state.username,this.props.match.params.id)}}>Purchase</MDBDropdownItem>
                        <MDBDropdownItem onClick={this.handleback}>Back</MDBDropdownItem>
                    </MDBDropdownMenu>
                </MDBDropdown>

            </a>

        )
    }
}

export default CartpageBook;
