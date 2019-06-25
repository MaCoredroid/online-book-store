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

class BookManagePageBook extends Component {
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

        window.location.href = "http://localhost:3000/UserManage#/BookManage";

    }



    handleLogout()
    {
        Cookies.set('username','');
        window.location.href = "http://localhost:3000/"
    }
    handleNavLink(where){
        window.location.href = "http://localhost:3000/UserManage#/"+ where;
    }
    handleChangeName(bookID)
    {
        let key = prompt("Input the new book name", this.state.books.name);
        if(key==="")
        {
            alert("Book name can't be blank space!")
            return;
        }
        if(key===this.state.books.name)
        {
            alert("Unchanged!")
            return;
        }
        else
        {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", this.state.url+"/admin/change/bookID/"+bookID+"/newbookname/"+key, false);
            xhr.send();
            if (xhr.responseText === "true")
            {
                alert("Change book name succeeded!");
                this.componentDidMount();
                return;
            }
            else
            {
                alert("Book name has already been taken!");
                return;
            }

        }

    }
    handleChangePrice(bookID)
    {
        let oldprice=this.state.books.price / 100;
        let key = prompt("Input the new book price",oldprice.toString() );
        if(key==="")
        {
            alert("Book price can not be null!")
            return;
        }
        if(key===oldprice.toString())
        {
            return;
        }
        let newprice = parseFloat(key);
        if (!isFinite(newprice))
        {
            alert("Invaild!")
            return;
        }
        let e = 1, p = 0;
        while (Math.round(newprice * e) / e !== newprice) { e *= 10; p++; }
        if(p>2)
        {
            alert("Price can have at most 2 digits of precision!")
            return;
        }
        newprice=newprice*100;
        let xhr = new XMLHttpRequest();
        xhr.open("GET", this.state.url+"/admin/change/bookID/"+bookID+"/newbookprice/"+newprice, false);
        xhr.send();
        if (xhr.responseText === "true")
        {
            alert("Change book price succeeded!");
            this.componentDidMount();
            return;
        }
        else
        {
            alert("Change book price failed!");
            return;
        }


    }
    handleChangeAuthor(bookID)
    {
        let key = prompt("Input the author name", this.state.books.author);
        if(key==="")
        {
            alert("Author name can't be blank space!")
            return;
        }
        if(key===this.state.books.author)
        {
            alert("Unchanged!")
            return;
        }
        else
        {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", this.state.url+"/admin/change/bookID/"+bookID+"/newauthorname/"+key, false);
            xhr.send();
            if (xhr.responseText === "true")
            {
                alert("Change author name succeeded!");
                this.componentDidMount();
                return;
            }
            else
            {
                alert("Change author name failed!");
                return;
            }

        }
    }
    handleChangeStock(bookID)
    {
        let key = prompt("Input the new stock", this.state.books.stock);
        if(key==="")
        {
            alert("Invalid!");
            return;
        }
        if(key===this.state.books.author)
        {
            alert("Unchanged!");
            return;
        }
        let newstock = parseFloat(key);
        if (!isFinite(newstock))
        {
            alert("Invaild!");
            return;
        }
        if(newstock <0)
        {
            alert("Stock should be an positive!");
            return;
        }
        let e = 1, p = 0;
        while (Math.round(newstock * e) / e !== newstock) { e *= 10; p++; }
        if(p!==0)
        {
            alert("Stock should be an int!");
            return;
        }
        else
        {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", this.state.url+"/admin/change/bookID/"+bookID+"/newstock/"+newstock, false);
            xhr.send();
            if (xhr.responseText === "true")
            {
                alert("Change stock succeeded!");
                this.componentDidMount();
                return;
            }
            else
            {
                alert("Change stock failed!");
                return;
            }

        }
    }
    render()
    {
        return(
            <div>
                <MDBNavbar color="default-color" dark expand="md" className="nav-justified" >
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
                                        <MDBDropdownItem onClick={()=>this.handleNavLink("OrderManage")}>OrderManage</MDBDropdownItem>
                                        <MDBDropdownItem onClick={()=>this.handleNavLink("CartManage")}>CartManage</MDBDropdownItem>
                                        <MDBDropdownItem onClick={()=>this.handleNavLink("BookManage")}>BookManage</MDBDropdownItem>
                                        <MDBDropdownItem onClick={()=>this.handleNavLink("UserManage")}>UserManage</MDBDropdownItem>
                                        <MDBDropdownItem onClick={()=>this.handleNavLink("Statistics")}>Statistics</MDBDropdownItem>
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
                                        <MDBDropdownItem onClick={()=>this.handleNavLink("AdminProfile")}>AdminProfile</MDBDropdownItem>
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
                <img class="center" src={this.state.url+"/image/"+ this.state.books.booklistID} height={"289"} width={"200"}/>
                <MDBDropdown dropup >
                    <MDBDropdownToggle caret color="default color">
                        Action
                    </MDBDropdownToggle>
                    <MDBDropdownMenu basic>
                        <MDBDropdownItem onClick={()=>this.handleChangeName(this.state.books.booklistID)}>Change Name</MDBDropdownItem>
                        <MDBDropdownItem onClick={()=>this.handleChangeAuthor(this.state.books.booklistID)}>Change Author</MDBDropdownItem>
                        <MDBDropdownItem onClick={()=>this.handleChangePrice(this.state.books.booklistID)}>Change Price</MDBDropdownItem>
                        <MDBDropdownItem onClick={()=>this.handleChangeStock(this.state.books.booklistID)}>Change Stock</MDBDropdownItem>
                        <MDBDropdownItem onClick={this.handleback}>Back</MDBDropdownItem>
                    </MDBDropdownMenu>
                </MDBDropdown>

            </div>

        )
    }
}

export default BookManagePageBook;
