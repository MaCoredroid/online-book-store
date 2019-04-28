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

class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {


            books:[],
            username:"",




        }

    }
    componentDidMount() {

        axios.get(`http://localhost:8080/Javaweb_war_exploded/Booklist`,{
            params: {
                flag: "FALSE",
                isbn: this.props.match.params.id,
            }
        }).then(res => {
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
        let number;
        while(true)
        {
            number = parseInt(prompt("Please enter the number :", "0"));

            if ((number % 1 === 0) && number > 0) {

                break;
            }
            if(number==null || number=="")
            {
                return;
            }
            alert("Please enter positive integer");
        }
        let xhr = new XMLHttpRequest();
        xhr.open("POST", " http://localhost:8080/Javaweb_war_exploded/Cart", false);
        xhr.send(JSON.stringify({
            "username":username,
            "isbn":isbn,
            "number":number,

        }));
        console.log(xhr.status);
        if (xhr.responseText === "TRUE")
        {
            alert("Books have been added to your cart");
        }
        else
        {
            alert("Failed to add books to your cart");
        }



    }
    handlepurchase(username,isbn)
    {
        while(true)
        {
            let number = prompt("Please enter the number :", "1");
            if ((number % 1 === 0) && number > 0) {
                alert("Your orders have been made");
                break;
            }
            if(number==null || number=="")
            {
                break;
            }
            alert("Please enter positive integer");
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
                        <strong className="white-text">Weclome, {this.state.username}</strong>
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

                                        <MDBDropdownItem ><Link to="/" >Logout</Link></MDBDropdownItem>
                                        <MDBDropdownItem ><Link to="/Register" >Register</Link></MDBDropdownItem>
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
                        {this.state.books.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td >
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
                                        {item.stock}
                                    </td>


                                </tr>
                            )
                        })}
                    </MDBTableBody>
                </MDBTable>
                <img src={"http://localhost:8080/Javaweb_war_exploded/getImage?isbn="+ this.props.match.params.id} height={"289"} width={"200"}/>


                <MDBBtn className="d-block p-2 " color="primary" onClick={()=>{this.handlecart(this.state.username,this.props.match.params.id)}}>Add to Cart</MDBBtn>
                <MDBBtn className="d-block p-2 " color="info" onClick={()=>{this.handlepurchase(this.state.username,this.props.match.params.id)}}>Directly order</MDBBtn>
                <MDBBtn className="d-block p-2 " rounded color="secondary" onClick={this.handleback}>Back</MDBBtn>

            </a>

    )
    }
}

export default Book;
