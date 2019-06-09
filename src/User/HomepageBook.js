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
            username:"",
            url:Cookies.get('url'),
            value: 0,
            modal: false

        }

    }
    componentDidMount() {

        axios.get(this.state.url+`/Booklist/`+this.props.match.params.id).then(res => {
            this.setState({ books: res.data });
        });
        this.setState({username:Cookies.get("username")});





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

    toggle = () => {
        this.setState({
            modal: !this.state.modal
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
        window.location.href = "http://localhost:3000/"
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
                            <th><a >BookID</a></th>
                            <th><a >Name</a></th>
                            <th><a >Author</a></th>
                            <th><a >Price</a></th>
                            <th><a >Isbn</a></th>
                            <th><a >Stock</a></th>
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
                            <MDBBtn color="primary" onClick={()=>{this.handlecart(this.state.username,this.props.match.params.id)}}>Add</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                </MDBContainer>


            </div>

        )
    }
}

export default HomepageBook;
