import React, { Component } from "react";
import {
    MDBJumbotron,
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBDropdown,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBCollapse,
    MDBNavbarNav,
    MDBNavItem,
    MDBIcon,
    MDBNavbar, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBInput
} from "mdbreact";
import axios from "axios/index";
import Cookies from "js-cookie";
import "react-datepicker/dist/react-datepicker.css";




class AdminProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: Cookies.get('url'),
            username: Cookies.get("username"),
            user: [],
            modal: false,


        }





    }
    componentDidMount()
    {
        if(Cookies.get("username")==='')
        {
            window.location.href = "http://localhost:3000/";
        }
        axios.get(this.state.url+"/userprofile/username/"+this.state.username).then(res => {
            this.setState({ user: res.data });
        });

    }
    handleNavLink(where){
        window.location.href = "http://localhost:3000/UserManage#/"+ where;
    }
    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };
    handleLogout()
    {
        Cookies.set('username','');
        window.location.href = "http://localhost:3000/"
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    handleChangeUsername()
    {
        let pattern = document.getElementById('password').value;
        let xhm = new XMLHttpRequest();
        xhm.open("GET", this.state.url+"/login/"+this.state.username+"/password/"+pattern, false);
        xhm.send();
        if (xhm.responseText === "true") {
        }
        else
        {
            alert("Wrong password!")
            return;
        }
        let xhr = new XMLHttpRequest();
        let key = prompt("Are you sure? Type your new username", this.state.username);
        if(key===this.state.username)
        {
            return;
        }
        if(key===null)
        {
            return;
        }

        xhr.open("GET", this.state.url+"/userprofile/change/username/"+this.state.username+"/newusername/"+key, false);
        xhr.send();
        if (xhr.responseText === "true")
        {
            alert("Username has been changed");
            Cookies.set('username', key);
        }
        else
        {
            alert("Failed to change username");
        }
        window.location.reload();
    }
    handleChangePassword()
    {
        let pattern = document.getElementById('password').value;
        let xhm = new XMLHttpRequest();
        xhm.open("GET", this.state.url+"/login/"+this.state.username+"/password/"+pattern, false);
        xhm.send();
        if (xhm.responseText === "true") {
        }
        else
        {
            alert("Wrong password!")
            return;
        }
        let key = prompt("Are you sure? Type your new password", "********");
        if(key===this.state.user.email)
        {
            return;
        }
        if(key===null)
        {
            return;
        }
        let key1 = prompt("Are you sure? Type your new password again", "********");
        if(key1===key)
        {

        }
        else
        {
            alert("Password doesn't match!")
            return;
        }
        let xhr = new XMLHttpRequest();
        xhr.open("GET", this.state.url+"/userprofile/change/username/"+this.state.username+"/newpassword/"+key, false);
        xhr.send();
        if (xhr.responseText === "true")
        {
            alert("Password has been changed! Please log in again");
            window.location.href = "http://localhost:3000/";
        }
        else
        {
            alert("Failed to change password");
        }
    }
    render()
    {
        return (
            <div>
                <MDBNavbar color="default-color" dark expand="md" className="nav-justified">
                    <MDBNavbarBrand>
                        <strong className="dark-text">User Profile</strong>
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

                <MDBContainer className="mt-5 text-center">
                    <MDBRow>
                        <MDBCol>
                            <MDBJumbotron>
                                <h2 className="h1 display-3">Hello, Admin {this.state.username}!</h2>
                                <hr className="my-2" />
                                <p>
                                    You must provide your password to change your username, password or email.
                                </p>
                                <p className="lead">
                                    <MDBBtn color="primary" onClick={this.toggle}>Change</MDBBtn>
                                </p>
                            </MDBJumbotron>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <MDBContainer>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                        <MDBModalHeader toggle={this.toggle}>Please input your password</MDBModalHeader>
                        <MDBModalBody>
                            <MDBInput
                                label="Your password"

                                type="password"
                                validate
                                containerClass="mb-0"
                                id={"password"}
                            />
                        </MDBModalBody>
                        <MDBModalFooter>
                            <p>
                                <MDBBtn color="warning" style={{ height: 50, width:200, marginTop: 10 }} onClick={this.handleChangeUsername.bind(this)}>Change Username</MDBBtn>
                                <MDBBtn color="danger" style={{ height: 50, width:200, marginTop: 10 }} onClick={this.handleChangePassword.bind(this)}>Change Password</MDBBtn>
                            </p>
                            <p>
                                <MDBBtn color="secondary" style={{ height: 50, width:200, marginTop: 10 }} onClick={this.toggle}>Close</MDBBtn>
                            </p>
                        </MDBModalFooter>
                    </MDBModal>
                </MDBContainer>
            </div>
        );
    }
}


export default AdminProfile;
