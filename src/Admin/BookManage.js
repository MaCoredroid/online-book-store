import React, { Component } from "react";
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavItem,
    MDBNavbarToggler,
    MDBCollapse,
    MDBFormInline,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBIcon,
    MDBRow,
    MDBContainer,
    MDBCol,
    MDBBtn,
    MDBModalHeader, MDBModalBody, MDBModal, MDBInput
} from "mdbreact";
import { Link } from 'react-router-dom'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import axios from 'axios/index';
import Cookies from "js-cookie";
import "../css/Homepage.css";
import Switch from "react-switch";



let order = {
    name: true,
    author: true,
    price: true,
    isbn: true,
    stock: true,
    booklistID:true,
    sales:true,
};
let orderBy = 'name';
class BookManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: Cookies.get('url'),
            isOpen: false,
            books: [

            ],
            booksCp: [

            ],
            username:Cookies.get("username"),
            photoIndex: 0,
            images: [

            ],
            imagesCp:[

            ],
            searchOption:"Name",
            add:false,
            pic:null
        };
    }
    componentDidMount()
    {
        if(Cookies.get("username")==='')
        {
            window.location.href = "http://localhost:3000/";
        }
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
        axios.get(url+`/bookidlist`,
        )
            .then(res => {
                this.setState(
                    {
                        images: res.data,
                        imagesCp:res.data

                    });
            });
        this.handlePicChange=this.handlePicChange.bind(this);
    }
    handlePicChange(event)
    {
        this.setState({
            pic: URL.createObjectURL(event.target.files[0])
        })

    }
    toggle = () => {
        this.setState({
            add: !this.state.add
        });
    }
    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };
    handleLink(id) {

            return "/bookmanagepagebook/detail/" + id;

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
    handleSearchOption(what){
        this.setState({
            searchOption:what
        })
    }
    handleLogout()
    {
        Cookies.set('username','');
        window.location.href = "http://localhost:3000/"
    }
    handlepictureLink(imageSrc)
    {
        window.location.href = "http://localhost:3000/UserManage#/bookmanagepagebook/detail/" + imageSrc;
    }
    renderImages = () => {
        let photoIndex = 0;
        const { images } = this.state;
        let url=Cookies.get('url');
        return images.map(imageSrc => {
            photoIndex++;
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
    handleChange() {
        if(this.state.searchOption==="Name") {
            let pattern = document.getElementById('filter').value
            let list = this.state.booksCp.filter((item) => {
                return item.name.indexOf(pattern) !== -1
            })
            let imagelist=[];
            for(let i=0;i<list.length;i++)
            {
                for(let j=0;j<this.state.imagesCp.length;j++)
                {
                    if(list[i].booklistID.toString()===this.state.imagesCp[j])
                    {
                        imagelist.push(list[i].booklistID);
                        break;
                    }

                }
            }
            this.setState({
                books: list,
                images:imagelist
            })
            return;
        }
        if(this.state.searchOption==="Author") {
            let pattern = document.getElementById('filter').value
            let list = this.state.booksCp.filter((item) => {
                return item.author.indexOf(pattern) !== -1
            })
            let imagelist=[];
            for(let i=0;i<list.length;i++)
            {
                for(let j=0;j<this.state.imagesCp.length;j++)
                {
                    if(list[i].booklistID.toString()===this.state.imagesCp[j])
                    {
                        imagelist.push(list[i].booklistID);
                        break;
                    }

                }
            }
            this.setState({
                books: list,
                images:imagelist
            })
            return;
        }
        if(this.state.searchOption==="isbn") {
            let pattern = document.getElementById('filter').value
            let list = this.state.booksCp.filter((item) => {
                return item.isbn.indexOf(pattern) !== -1
            })
            let imagelist=[];
            for(let i=0;i<list.length;i++)
            {
                for(let j=0;j<this.state.imagesCp.length;j++)
                {
                    if(list[i].booklistID.toString()===this.state.imagesCp[j])
                    {
                        imagelist.push(list[i].booklistID);
                        break;
                    }

                }
            }
            this.setState({
                books: list,
                images:imagelist
            })
            return;
        }

    }


    handleBlockChange(bookid,state) {
        if(state===true)
        {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", this.state.url + "/admin/blockbook/bookID/" + bookid, false);
            xhr.send();
            this.componentDidMount();
        }
        else
        {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", this.state.url + "/admin/unblockbook/bookID/" + bookid, false);
            xhr.send();
            this.componentDidMount();
        }


    }
    handleNavLink(where){
        window.location.href = "http://localhost:3000/UserManage#/"+ where;
    }
    handleChangeCover(bookid)
    {
        const data = new FormData();
        let fileInput = document.getElementById('inputGroupFile01');
        let file = fileInput.files[0]
        data.append('file', file);
        let xhr = new XMLHttpRequest();
        xhr.open('POST', this.state.url+"/setimage/"+bookid,false);
        xhr.send(data);
        if (xhr.responseText === "true")
        {
            alert("Add book succeeded!");
            this.componentDidMount();
            this.toggle();
            location.reload();
            return;
        }
        else
        {
            alert("Change stock failed!");
            return;
        }
    }
    handleAddBook = event =>
    {
        event.preventDefault();
        let name= document.getElementById('name').value;
        let author = document.getElementById('author').value;
        let isbn = document.getElementById('isbn').value;
        let price = document.getElementById('price').value;
        let stock = document.getElementById('stock').value;
        let newstock = parseFloat(stock);
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
        let newprice = parseFloat(price);
        if (!isFinite(newprice))
        {
            alert("Invaild!")
            return;
        }
        if(newprice<0)
        {
            alert("Price should be an positive!");
            return;
        }
        e = 1, p = 0;
        while (Math.round(newprice * e) / e !== newprice) { e *= 10; p++; }
        if(p>2)
        {
            alert("Price can have at most 2 digits of precision!")
            return;
        }
        price=price*100;
        let xhr = new XMLHttpRequest();
        xhr.open("GET", this.state.url+"/admin/addbook/name/"+name+"/author/"+author+"/price/"+price+"/isbn/"+isbn+"/stock/"+stock, false);
        xhr.send();
        if (xhr.responseText === "false")
        {
            alert("Add book failed! Duplicate isbn!");
            return;
        }
        else
        {
            this.handleChangeCover(xhr.responseText);
        }

    }
    render() {
        return (
            <div>
                <MDBNavbar color="default-color" dark expand="md" className="nav-justified" >
                    <MDBNavbarBrand>
                        <strong className="dark-text">BookManage</strong>
                    </MDBNavbarBrand>

                    <MDBNavbarBrand>
                        <strong className="dark-text">Weclome,  Admin {this.state.username}           </strong>
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
                                <MDBDropdown >
                                    <MDBDropdownToggle nav caret>
                                        <span className="mr-2">Search by {this.state.searchOption}</span>
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu>
                                        <MDBDropdownItem onClick={()=>this.handleSearchOption("Name")}>Name</MDBDropdownItem>
                                        <MDBDropdownItem onClick={()=>this.handleSearchOption("Author")}>Author</MDBDropdownItem>
                                        <MDBDropdownItem onClick={()=>this.handleSearchOption("isbn")}>isbn</MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavItem>
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
                                        <MDBDropdownItem onClick={()=>this.handleNavLink("AdminProfile")}>AdminProfile</MDBDropdownItem>
                                        <MDBDropdownItem onClick={()=>{this.handleLogout()}}>Logout</MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>

                </MDBNavbar>

                <MDBTable responsive small fixed bordered hover scrollY maxHeight="400px">
                    <MDBTableHead >
                        <tr>
                            <th><a onClick={() => { this.handleSort("booklistID") }}>BookID</a></th>
                            <th><a onClick={() => { this.handleSort("name") }}>Name</a></th>
                            <th><a onClick={() => { this.handleSort("author") }}>Author</a></th>
                            <th><a onClick={() => { this.handleSort("price") }}>Price</a></th>
                            <th><a onClick={() => { this.handleSort("isbn") }}>Isbn</a></th>
                            <th><a onClick={() => { this.handleSort("stock") }}>Stock</a></th>
                            <th><a onClick={() => { this.handleSort("sales") }}>Sales</a></th>
                            <th><a>Status</a></th>
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
                                    <td>
                                        {item.sales}
                                    </td>
                                    <td >

                                            <Switch onChange={()=>this.handleBlockChange(item.booklistID,item.status)} checked={item.status} height={20} width={40}/>

                                    </td>
                                    <td >
                                        <Link to={this.handleLink(item.booklistID)}>Details</Link>
                                    </td>
                                </tr>
                            )
                        })}
                    </MDBTableBody>
                </MDBTable>

                <MDBContainer className="mt-5 p-3" >
                    <div className="mdb-lightbox p-3">
                        <MDBTable >
                            <MDBRow>
                                {this.renderImages()}
                            </MDBRow>
                        </MDBTable>
                    </div>
                </MDBContainer>
                <MDBBtn className="fixed-bottom" onClick={this.toggle}>
                    Add Book
                </MDBBtn>
                <MDBModal isOpen={this.state.add} toggle={this.toggle} >
                    <MDBModalHeader toggle={this.toggle}>Add new book</MDBModalHeader>
                    <MDBModalBody>
                        <form  onSubmit={this.handleAddBook}>
                            <div className="input-group">
                                <div className="custom-file">
                                    <input
                                        type="file"
                                        className="custom-file-input"
                                        id="inputGroupFile01"
                                        aria-describedby="inputGroupFileAddon01"
                                        onChange={this.handlePicChange}
                                    />
                                    <label className="custom-file-label" htmlFor="inputGroupFile01">
                                        Choose file
                                    </label>
                                </div>
                            </div>
                            <p></p>
                            <p>
                                <img src={this.state.pic} height={"289"} width={"200"}/>
                            </p>
                            <div className="grey-text">
                                <MDBInput
                                    label="Book Name"
                                    id={"name"}
                                    group
                                    type="text"

                                />
                                <MDBInput
                                    label="Author"
                                    id={"author"}
                                    group
                                    type="text"

                                />
                                <MDBInput
                                    label="isbn"
                                    id={"isbn"}
                                    group
                                    type="text"

                                />
                                <MDBInput
                                    label="price"
                                    id={"price"}
                                    group
                                    type="number"
                                />
                                <MDBInput
                                    label="stock"
                                    id={"stock"}
                                    group
                                    type="number"
                                />
                            </div>
                            <MDBBtn  type="submit" >Confirm</MDBBtn>
                        </form>
                    </MDBModalBody>
                </MDBModal>
            </div>







        );
    }
}

export default BookManage;
