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
import Switch from "react-switch";


let order = {
    userID:true,
    username:true,
    email:true,
};
let orderBy = 'name';
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            url:Cookies.get('url'),
            users: [

            ],
            usersCp: [

            ],
            username:Cookies.get("username"),
            photoIndex: 0,
            images: [

            ],
            searchOption:"Name",
            salesisshowing:true
        };
    }
    componentDidMount()
    {
        if(Cookies.get("username")==='')
        {
            window.location.href = "http://localhost:3000/";
        }
        let url=Cookies.get('url');
        axios.get(url+'/admin/seeAllUser',)
            .then(res => {
                this.setState(
                    {
                        users: res.data,
                        usersCp: res.data
                    });
            });

    }
    handleBlockChange(username,state) {
        if(state===true)
        {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", this.state.url + "/admin/block/" + username, false);
            xhr.send();
            this.componentDidMount();
        }
        else
        {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", this.state.url + "/admin/unblock/" + username, false);
            xhr.send();
            this.componentDidMount();
        }


    }
    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };
    handleSort(index) {
        orderBy = index
        order[index] = !order[index]
        let list = []
        for (let i = 0; i < this.state.users.length; i++) {
            list.push(this.state.users[i])
        }
        list.sort(this.sort)
        this.setState({
            users: list
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
        if(this.state.searchOption==="UserName") {
            let pattern = document.getElementById('filter').value
            let list = this.state.usersCp.filter((item) => {
                return item.username.indexOf(pattern) !== -1
            })
            this.setState({
                users: list
            })
            return;
        }
        if(this.state.searchOption==="Email") {
            let pattern = document.getElementById('filter').value
            let list = this.state.usersCp.filter((item) => {
                return item.email.indexOf(pattern) !== -1
            })
            this.setState({
                users: list
            })
            return;
        }

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
    handleNavLink(where){
        window.location.href = "http://localhost:3000/UserManage#/"+ where;
    }

    render() {
        return (
            <div>
                <MDBNavbar color="default-color" dark expand="md" className="nav-justified" >
                    <MDBNavbarBrand>
                        <strong className="dark-text">UserManage</strong>
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
                                        <MDBDropdownItem onClick={()=>this.handleSearchOption("UserName")}>UserName</MDBDropdownItem>
                                        <MDBDropdownItem onClick={()=>this.handleSearchOption("Email")}>Email</MDBDropdownItem>
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

                <MDBTable>
                    <MDBTableHead>
                        <tr>
                            <th><a onClick={() => { this.handleSort("userID") }}>userID</a></th>
                            <th><a onClick={() => { this.handleSort("username") }}>Username</a></th>
                            <th><a onClick={() => { this.handleSort("email") }}>Email</a></th>
                            <th><a>Status</a></th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {this.state.users.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td >
                                        {item.userID}
                                    </td>
                                    <td >
                                        {item.username}
                                    </td>
                                    <td>
                                        {item.email}
                                    </td>
                                    <td >

                                            <Switch onChange={()=>this.handleBlockChange(item.username,item.state)} checked={item.state} height={20} width={40}/>

                                    </td>
                                </tr>
                            )
                        })}
                    </MDBTableBody>
                </MDBTable>
            </div>







        );
    }
}

export default UserManage;
