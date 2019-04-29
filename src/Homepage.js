import React, { Component } from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse, MDBFormInline,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBRow, MDBContainer, MDBCol, MDBBtn
} from "mdbreact";
import { Link } from 'react-router-dom'
import Lightbox from "react-image-lightbox";
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import axios from 'axios';
import Cookies from "js-cookie";
import "./css/Homepage.css";



let order = {
    name: true,
    author: true,
    price: true,
    isbn: true,
    stock: true,
};
let orderBy = 'name';
class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            books: [

            ],
            booksCp: [

            ],
            username:"",
            photoIndex: 0,
            images: [

            ]
        };
    }
    componentDidMount()
    {
        axios.get(`http://localhost:8080/Javaweb_war_exploded/Booklist`, {
            params: {
                flag: "TRUE",
            }
        })
            .then(res => {
                this.setState(
                    {
                    books: res.data,
                    booksCp: res.data
                    });
            });
        axios.get(`http://localhost:8080/Javaweb_war_exploded/getImage`, {
            params: {
                flag: "TRUE",
            }
        })
            .then(res => {
                this.setState(
                    {
                        images: res.data,

                    });
            });
        this.setState({username:Cookies.get("username")});
    }

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };
    handleLink(isbn) {
        Cookies.set('homepage', 1);
        Cookies.set('cart', 0);
        Cookies.set('order', 0);
        return "/detail/" + isbn
    }
    handleSort(index) {
        orderBy = index
        order[index] = !order[index]
        let list = []
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
    handleLogout()
    {
        window.location.href = "http://localhost:3000/"
    }
    handlepictureLink(imageSrc)
    {
        Cookies.set('homepage', 1);
        Cookies.set('cart', 0);
        Cookies.set('order', 0);
        let res = imageSrc.substring(imageSrc.length - 17,imageSrc.length);
        window.location.href = "http://localhost:3000/Homepage#/detail/"+ res;
    }
    renderImages = () => {
        let photoIndex = -1;
        const { images } = this.state;

        return images.map(imageSrc => {
            photoIndex++;
            const privateKey = photoIndex;
            return (
                <MDBCol md="3" key={photoIndex}>
                    <figure >
                        <img
                            height="300px"
                            width="200px"
                            
                            src={imageSrc}
                            alt="Gallery"
                            className="img-fluid z-depth-1"
                            onClick={() => {this.handlepictureLink(imageSrc)}}
                        />
                    </figure>
                </MDBCol>
            );
        })
    }

    render() {
        return (
           <a>
                <MDBNavbar color="indigo" dark expand="md" className="nav-justified">
                    <MDBNavbarBrand>
                        <strong className="white-text">Homepage</strong>
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
                            <th><a onClick={() => { this.handleSort("name") }}>书名</a></th>
                            <th><a onClick={() => { this.handleSort("author") }}>作者</a></th>
                            <th><a onClick={() => { this.handleSort("price") }}>价格</a></th>
                            <th><a onClick={() => { this.handleSort("isbn") }}>isbn</a></th>
                            <th><a onClick={() => { this.handleSort("stock") }}>库存</a></th>
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
                                    <td >
                                        <Link to={this.handleLink(item.isbn)}>查看详情</Link>
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
            </a>







        );
    }
}

export default Homepage;