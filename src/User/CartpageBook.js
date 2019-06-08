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
            value: 0,
            modal: false




        }

    }
    componentDidMount() {

        axios.get(this.state.url+`/Booklist/`+this.props.match.params.id).then(res => {
            this.setState({ books: res.data,
            value:this.state.cartnumber
            });
        });


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

    toggle = () => {
        this.setState({
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

        let number = this.state.value;

        if(number===0)
        {

        }
        else
        {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", this.state.url + "/cart/change/" + this.state.cartid+"/number/"+this.state.value, false);
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
        window.location.href = "http://localhost:3000/"
    }
    handlePurchase()
    {
        let time=new Date().getTime();
        let xhr = new XMLHttpRequest();
        xhr.open("GET", this.state.url+"/cart/purchase/"+this.state.cartid+"/time/"+time.toString(), false);
        xhr.send();
        if (xhr.responseText === "true")
        {
            alert("Books have been purchased");
            this.setState({
                modal: !this.state.modal
            });
            window.location.href = "http://localhost:3000/Homepage#/Order";
        }
        else
        {
            alert("Failed to purchase:not enough books.");
            this.setState({
                modal: !this.state.modal
            });
        }
    }



    render()
    {
        return(
            <a>
                <MDBNavbar color="indigo" dark expand="md" className="nav-justified">
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
                <MDBDropdown dropup className="fixed-bottom">
                    <MDBDropdownToggle caret color="primary">
                        Action
                    </MDBDropdownToggle>
                    <MDBDropdownMenu basic>
                        <MDBDropdownItem  onClick={()=>{this.handleremovefromcart(this.state.cartid)}}>Remove from cart</MDBDropdownItem>
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
