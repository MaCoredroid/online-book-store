import React, { Component } from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse, MDBFormInline,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBRow, MDBContainer, MDBCol, MDBBtn
} from "mdbreact";
import { Link } from 'react-router-dom'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import axios from "axios/index";
import Cookies from "js-cookie";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";




let order = {
    name: true,
    author: true,
    price: true,
    isbn: true,
    stock: true,
    OrderID:true,
    timestamp:true,
};
let orderBy = 'name';
class Search extends Component {
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
            username:Cookies.get("username"),
            images: [

            ],
            searchOption:"Name",
            result:"No result"
        };
    }
    componentDidMount()
    {
        if(Cookies.get("username")==='')
        {
            window.location.href = "http://localhost:3000/";
        }



    }
    handleSearchOption(what){
        this.setState({
            searchOption:what
        })
    }

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };
    handleLink(id) {
        window.location.href = "http://localhost:3000"+"/Homepage#/orderpage/detail/" + id;

    }
    handleLogout()
    {
        Cookies.set('username','');
        window.location.href = "http://localhost:3000/"
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
        if(this.state.searchOption==="Name") {
            let pattern = document.getElementById('filter').value
            let list = this.state.booksCp.filter((item) => {
                return item.name.indexOf(pattern) !== -1
            })
            this.setState({
                books: list
            })
            return;
        }
        if(this.state.searchOption==="Author") {
            let pattern = document.getElementById('filter').value
            let list = this.state.booksCp.filter((item) => {
                return item.author.indexOf(pattern) !== -1
            })
            this.setState({
                books: list
            })
            return;
        }
        if(this.state.searchOption==="isbn") {
            let pattern = document.getElementById('filter').value
            let list = this.state.booksCp.filter((item) => {
                return item.isbn.indexOf(pattern) !== -1
            })
            this.setState({
                books: list
            })
            return;
        }

    }
    handleSearch() {
        let pattern = document.getElementById("standard-basic").value
        axios.get(this.state.url+`/searchInDescription/pattern/`+pattern).then(res => {
            this.setState(
                {
                    result:res.data
                });
        });
    }
    handleNavLink(where){
        window.location.href = "http://localhost:3000/Homepage#/"+ where;
    }
    handleUnsubscribe()
    {
        let key = prompt("Are you sure you want to delete your account and all your infomation? Type your username", "Your Username");
        if(key===this.state.username)
        {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", this.state.url+"/userprofile/unsubscribe/username/"+this.state.username, false);
            xhr.send();
            if (xhr.responseText === "true")
            {
                alert("Your account has been unsubscribed!");
                Cookies.set('username','');
                window.location.href = "http://localhost:3000/";
                return;
            }
            else
            {
                alert("Failed to unsubscribe your account");
                return;
            }
        }
    }
    render() {
        return (
            <div>
                <MDBNavbar color="indigo" dark expand="md" className="nav-justified" >
                    <MDBNavbarBrand>
                        <strong className="dark-text">Orders</strong>
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
                                        <MDBDropdownItem onClick={()=>this.handleNavLink("Order")}>Order</MDBDropdownItem>
                                        <MDBDropdownItem onClick={()=>this.handleNavLink("Cart")}>Cart</MDBDropdownItem>
                                        <MDBDropdownItem onClick={()=>this.handleNavLink("Homepage")}>Homepage</MDBDropdownItem>
                                        <MDBDropdownItem onClick={()=>this.handleNavLink("ChatRoom")}>ChatRoom</MDBDropdownItem>
                                        <MDBDropdownItem onClick={()=>this.handleNavLink("Userstatistics")}>Statistics</MDBDropdownItem>
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
                                        <MDBDropdownItem onClick={()=>this.handleNavLink("UserProfile")}>UserProfile</MDBDropdownItem>
                                        <MDBDropdownItem onClick={()=>{this.handleLogout()}}>Logout</MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBDropdown>
                                    <MDBDropdownToggle nav caret>
                                        <MDBIcon icon="heart-broken" />
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu className="dropdown-default" right>
                                        <MDBDropdownItem onClick={()=>this.handleUnsubscribe()}>Unsubscribe</MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>

                </MDBNavbar>
                <Grid container>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                        <Typography  variant={"h4"}>
                            Search In description:
                        </Typography>
                        <Grid style={{ display: 'flex' }}>
                            <form noValidate autoComplete="off">
                                <TextField id="standard-basic" label="Standard" />
                            </form>
                            <div style={{ flexGrow: 1 }} />
                            <Button variant="contained" color="primary" onClick={() => {this.handleSearch()}}>
                                Search
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                        <Typography  variant={"h6"}>
                            {this.state.result}
                        </Typography>
                    </Grid>
                </Grid>
            </div>







        );
    }
}

export default Search;
