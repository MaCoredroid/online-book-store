import React, { Component } from 'react';

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
import { MDBBtn } from "mdbreact";
import {Link} from "react-router-dom";

import Cookies from 'js-cookie'

class HomepageBook extends Component {
    constructor(props) {
        super(props);
        this.state = {


            books:[],
            username:"",
            cartloaded:1,
            orderloaded:1



        }

    }
    componentDidMount() {

        axios.get(`http://localhost:8080/Javaweb_war_exploded/Booklist`,{
            params: {
                flag:"FALSE",
                isbn:this.props.match.params.id,
            }
        }).then(res => {
            this.setState({ books: res.data });
        });
        console.log(this.props.match.params.id)
        this.setState({username:Cookies.get("username")});
        if(Cookies.get("cart")==="1")
        {

            this.setState({cartloaded:0});
        }
        if(Cookies.get("order")==="1")
        {


            this.setState({orderloaded:0});
        }




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
            let xhr = new XMLHttpRequest();
            xhr.open("POST", " http://localhost:8080/Javaweb_war_exploded/Cart", false);
            xhr.send(JSON.stringify({
                "username": username,
                "isbn": isbn,
                "number": number,

            }));
            console.log(xhr.status);
            if (xhr.responseText === "TRUE") {
                alert("Books have been added to your cart");
            } else {
                alert("Failed to add books to your cart");
            }
        }




    }

    handleremovefromcart(username,isbn)
    {
        let number=0;
        while(true)
        {
            number = parseInt(prompt("Please enter the number to remove from cart :", "0"));
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
            let temp=number*(-1);
            let xhr = new XMLHttpRequest();
            xhr.open("POST", " http://localhost:8080/Javaweb_war_exploded/Cart", false);
            xhr.send(JSON.stringify({
                "username": username,
                "isbn": isbn,
                "number":temp,

            }));
            console.log(xhr.status);
            if (xhr.responseText === "TRUE") {
                alert("Books have removed from your cart");
            } else {
                alert("Failed to remove books from your cart");
            }
        }
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
                <img src={"http://localhost:8080/Javaweb_war_exploded/getImage?flag=FALSE&isbn="+ this.props.match.params.id} height={"289"} width={"200"}/>
                <div className={(this.state.cartloaded===1 && this.state.orderloaded===1)? 'visible' : 'invisible'}>
                    <MDBBtn className="d-block p-2 " color="primary" onClick={()=>{this.handlecart(this.state.username,this.props.match.params.id)}}>Add to Cart</MDBBtn>
                </div>
                <div className={this.state.orderloaded===1? 'visible' : 'invisible'}>
                    <MDBBtn className="d-block p-2 " color="info" onClick={()=>{this.handlepurchase(this.state.username,this.props.match.params.id)}}>Purchase</MDBBtn>
                </div>
                <div className={this.state.cartloaded===1 ? 'invisible' : 'visible'}>
                    <MDBBtn className="d-block p-2 " color="warning" onClick={()=>{this.handleremovefromcart(this.state.username,this.props.match.params.id)}}>Remove from Cart</MDBBtn>
                </div>
                <MDBBtn className="d-block p-2 " rounded color="secondary" onClick={this.handleback}>Back</MDBBtn>

            </a>

    )
    }
}

export default HomepageBook;
