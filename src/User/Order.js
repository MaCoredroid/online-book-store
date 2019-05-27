import React, { Component } from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse, MDBFormInline,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBRow, MDBContainer, MDBCol
} from "mdbreact";
import { Link } from 'react-router-dom'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import axios from "axios/index";
import Cookies from "js-cookie";




let order = {
    name: true,
    author: true,
    price: true,
    isbn: true,
    stock: true,
    OrderID:true,
};
let orderBy = 'name';
class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            orders:[],
            books: [



            ],
            booksCp: [



            ],
            url:Cookies.get('url'),
            username:Cookies.get("username")
        };
    }
    componentDidMount()
    {

        axios.get(this.state.url+`/order/`+this.state.username).then(res => {
                this.setState(
                    {
                        books: res.data,
                        booksCp: res.data
                    });
            });


    }
    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };
    handleLink(isbn,number) {
        Cookies.set('ordernumber',number);
        return "/orderpage/detail/" + isbn
    }
    handleLogout()
    {
        window.location.href = "http://localhost:3000/"
    }
    handleSort(index) {
        orderBy = index;
        order[index] = !order[index];
        let list = [];
        for (let i = 0; i < this.state.books.length; i++) {
            list.push(this.state.books[i])
        }
        list.sort(this.sort)
        this.setState({
            books: list
        })
    }
    sort(a, b) {
        let res = 0;
        if (a[orderBy] < b[orderBy]) {
            res = -1
        } else if (a[orderBy] > b[orderBy]) {
            res = 1
        } else {
            res = 0
        }
        if (!order[orderBy]) {
            res = 0 - res
        }
        return res
    }
    handleChange() {
        let pattern = document.getElementById('filter').value
        let list = this.state.booksCp.filter((item) => {
            return item.name.indexOf(pattern) !== -1
        })
        this.setState({
            books: list
        })
    }
    renderImages = () => {
        let  images  = [];
        for (let i = 0; i < this.state.books.length; i++) {
            images.push(this.state.books[i].isbn);
        }
        let photoIndex = 0;
        let url=Cookies.get('url');
        return images.map(imageSrc => {
            photoIndex++;
            const privateKey = photoIndex;
            return (
                <MDBCol md="3" key={photoIndex}>
                    <figure >
                        <img
                            height="300px"
                            width="200px"

                            src={url+"/image/"+imageSrc}
                            alt="Gallery"
                            className="img-fluid z-depth-1"
                            onClick={() => {this.handlepictureLink(imageSrc)}}
                        />
                    </figure>
                </MDBCol>
            );
        })
    }
    handlepictureLink(imageSrc)
    {
        let res = imageSrc.substring(imageSrc.length - 17,imageSrc.length);
        window.location.href = "/Homepage#/orderpage/detail/" + res;
    }
    render() {
        return (
            <paper>
                <MDBNavbar color="indigo" dark expand="md" className="nav-justified">
                    <MDBNavbarBrand>
                        <strong className="white-text">Order</strong>
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
                                        <MDBDropdownItem ><Link to="/Userstatistics" >Statistics</Link></MDBDropdownItem>
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
                            <th><a onClick={() => { this.handleSort("OrderID") }}>订单编号</a></th>
                            <th><a onClick={() => { this.handleSort("name") }}>书名</a></th>
                            <th><a onClick={() => { this.handleSort("author") }}>作者</a></th>
                            <th><a onClick={() => { this.handleSort("price") }}>价格</a></th>
                            <th><a onClick={() => { this.handleSort("isbn") }}>isbn</a></th>
                            <th><a onClick={() => { this.handleSort("stock") }}>数量</a></th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {this.state.books.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td >
                                        {item.OrderID}
                                    </td>
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
                                        {item.number}
                                    </td>
                                    <td >
                                        <Link to={this.handleLink(item.isbn,item.number)}>查看详情</Link>
                                    </td>
                                </tr>
                            )
                        })}
                    </MDBTableBody>
                </MDBTable>
                <MDBContainer className="mt-5 p-3" style={{ backgroundColor: "#fff" }}>
                    <div className="mdb-lightbox p-3">
                        <MDBRow>
                            {this.renderImages()}
                        </MDBRow>
                    </div>
                </MDBContainer>
            </paper>







        );
    }
}

export default Order;