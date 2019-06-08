import React, { Component } from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse, MDBFormInline,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBRow, MDBContainer, MDBCol, MDBBtn
} from "mdbreact";
import { Link } from 'react-router-dom'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import axios from 'axios/index';
import Cookies from "js-cookie";
import "../css/Homepage.css";



let order = {
    name: true,
    author: true,
    price: true,
    isbn: true,
    stock: true,
    booklistID:true,
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
            username:Cookies.get("username"),
            photoIndex: 0,
            images: [

            ]
        };
    }
    componentDidMount()
    {
        let url=Cookies.get('url');
        axios.get(url+`/booklist`,
            )
            .then(res => {
                this.setState(
                    {
                    books: res.data,
                    booksCp: res.data
                    });
            });
        axios.get(url+`/isbnlist`,
            )
            .then(res => {
                this.setState(
                    {
                        images: res.data,

                    });
            });
    }

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };
    handleLink(isbn) {
        if(isbn!=null) {
            let temp = isbn.substring(isbn.length - 17, isbn.length);
            return "/homepage/detail/" + temp
        }
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
        let res = imageSrc.substring(imageSrc.length - 17,imageSrc.length);
        window.location.href = "/Homepage#/homepage/detail/" + res;
    }
    renderImages = () => {
        let photoIndex = 0;
        const { images } = this.state;
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

    render() {
        return (
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
                            <th><a onClick={() => { this.handleSort("booklistID") }}>书籍编号</a></th>
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
                                        {item.booklistID}
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

               <MDBContainer className="mt-5 p-3" >
                   <div className="mdb-lightbox p-3">
                       <MDBRow>
                           {this.renderImages()}
                       </MDBRow>
                   </div>
               </MDBContainer>
            </div>







        );
    }
}

export default Homepage;