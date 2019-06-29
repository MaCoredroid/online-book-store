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




class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: Cookies.get('url'),
            username: Cookies.get("username"),
            user: [],
            modal: false,
            changePassword:false

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
        window.location.href = "http://localhost:3000/Homepage#/"+ where;
    }
    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };
    toggle2= () =>
    {
        this.setState({
            changePassword: !this.state.changePassword
        });
    }
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
        if (xhm.responseText === "User") {
            this.toggle();
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
            window.location.reload();
        }
        else
        {
            alert("Failed to change username");
        }
    }
    handleChangeEmail()
    {
        let pattern = document.getElementById('password').value;
        let xhm = new XMLHttpRequest();
        xhm.open("GET", this.state.url+"/login/"+this.state.username+"/password/"+pattern, false);
        xhm.send();
        if (xhm.responseText === "User") {
            this.toggle();
        }
        else
        {
            alert("Wrong password!")
            return;
        }
        let xhr = new XMLHttpRequest();
        let key = prompt("Are you sure? Type your new email", this.state.user.email);
        if(key===this.state.user.email)
        {
            return;
        }
        if(key===null)
        {
            return;
        }

        xhr.open("GET", this.state.url+"/userprofile/change/username/"+this.state.username+"/newemail/"+key, false);
        xhr.send();
        if (xhr.responseText === "true")
        {
            alert("Email has been changed");
        }
        else
        {
            alert("Failed to change Email");
        }
        window.location.reload();
    }
    handleChangePassword()
    {
        let pattern = document.getElementById('password').value;
        let xhm = new XMLHttpRequest();
        xhm.open("GET", this.state.url+"/login/"+this.state.username+"/password/"+pattern, false);
        xhm.send();
        if (xhm.responseText === "User") {
            this.toggle();
        }
        else
        {
            alert("Wrong password!")
            return;
        }
        this.toggle2();
    }
    submitHandler1 = event => {
        event.preventDefault();
        let pattern = document.getElementById('password').value;
        let patternag = document.getElementById('passwordag').value;
        if(pattern!==patternag)
        {
            alert("Two passwords don't match");
            return;
        }

        if(pattern.length<6)
        {
            alert("Password has to contain at least 6 characters");
            return;
        }
        let xhr = new XMLHttpRequest();
        xhr.open("GET", this.state.url+"/userprofile/change/username/"+this.state.username+"/newpassword/"+pattern, false);
        xhr.send();
        if (xhr.responseText === "true")
        {
            alert("Password has been changed! Please log in again");
            Cookies.set('username','');
            window.location.href = "http://localhost:3000/";
        }
        else
        {
            alert("Failed to change password");
        }




    };
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
                window.location.href = "http://localhost:3000/";
                return;
            }
        }
    }
    render()
    {
        return (
            <div>
                <MDBNavbar color="indigo" dark expand="md" className="nav-justified" >
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
                                        <MDBDropdownItem onClick={()=>this.handleNavLink("Order")}>Order</MDBDropdownItem>
                                        <MDBDropdownItem onClick={()=>this.handleNavLink("Cart")}>Cart</MDBDropdownItem>
                                        <MDBDropdownItem onClick={()=>this.handleNavLink("Homepage")}>Homepage</MDBDropdownItem>
                                        <MDBDropdownItem onClick={()=>this.handleNavLink("Userstatistics")}>Statistics</MDBDropdownItem>
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

                <MDBContainer className="mt-5 text-center">
                    <MDBRow>
                        <MDBCol>
                            <MDBJumbotron>
                                <h2 className="h1 display-3">Hello, User {this.state.username}!</h2>
                                <p className="lead">
                                    Email : {this.state.user.email}
                                </p>
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
                                <MDBBtn color="info" style={{ height: 50, width:200, marginTop: 10 }} onClick={this.handleChangeEmail.bind(this)}>Change Email</MDBBtn>
                                <MDBBtn color="warning" style={{ height: 50, width:200, marginTop: 10 }} onClick={this.handleChangeUsername.bind(this)}>Change Username</MDBBtn>
                            </p>
                            <p>
                                <MDBBtn color="danger" style={{ height: 50, width:200, marginTop: 10 }} onClick={this.handleChangePassword.bind(this)}>Change Password</MDBBtn>
                                <MDBBtn color="secondary" style={{ height: 50, width:200, marginTop: 10 }} onClick={this.toggle}>Close</MDBBtn>
                            </p>
                        </MDBModalFooter>
                    </MDBModal>
                </MDBContainer>
                <MDBContainer >
                    <MDBModal isOpen={this.state.changePassword} toggle={this.toggle2}>
                        <MDBModalHeader toggle={this.toggle2}>Input New Password</MDBModalHeader>
                        <MDBModalBody>
                            <form  onSubmit={this.submitHandler1}>
                                <div className="grey-text">
                                    <MDBInput
                                        label="New Password"
                                        id={"password"}
                                        icon="lock"
                                        group
                                        type="password"
                                        validate

                                    />
                                    <MDBInput
                                        label="Confirm New Password"
                                        icon="exclamation-triangle"
                                        id={"passwordag"}
                                        group
                                        type="password"
                                        validate

                                    />
                                </div>
                                <div className="text-center">
                                    <MDBBtn color="primary" type="submit">Change</MDBBtn>
                                </div>
                                <p> </p>
                                <div className="text-center">
                                    <p onClick={this.toggle2}>Back</p>
                                </div>
                            </form>
                        </MDBModalBody>
                    </MDBModal>
                </MDBContainer>
            </div>
        );
    }
}


export default UserProfile;
