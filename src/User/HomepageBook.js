import React, { Component } from 'react';

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
import { MDBBtn } from "mdbreact";
import {Link} from "react-router-dom";

import Cookies from 'js-cookie'

class HomepageBook extends Component {
    constructor(props) {
        super(props);
        this.state = {


            books:[],
            username:"",
            url:Cookies.get('url')


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
    handlecart(username,isbn)
    {
        let number=0;
        while(true)
        {
            number = parseInt(prompt("Please enter the number to add to cart :", "0"));
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
            let time=new Date().getTime();
            let xhr = new XMLHttpRequest();
            xhr.open("GET", this.state.url+"/cart/username/"+username+"/isbn/"+isbn+"/number/"+number.toString()+"/time/"+time.toString(), false);
            xhr.send();
            if (xhr.responseText === "true") {
                alert("Books have been added to your cart");
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
                            <th><a >书名</a></th>
                            <th><a >作者</a></th>
                            <th><a >价格</a></th>
                            <th><a >isbn</a></th>
                            <th><a >库存</a></th>
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
                <img src={this.state.url+"/image/"+ this.props.match.params.id} height={"289"} width={"200"}/>
                <div >
                    <MDBBtn className="d-block p-2 " color="primary" onClick={()=>{this.handlecart(this.state.username,this.props.match.params.id)}}>Add to Cart</MDBBtn>
                </div>
                <MDBBtn className="d-block p-2 " rounded color="secondary" onClick={this.handleback}>Back</MDBBtn>

            </a>

        )
    }
}

export default HomepageBook;
