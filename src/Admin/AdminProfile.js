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
    MDBNavbar,
    MDBModal,
    MDBModalHeader,
    MDBModalBody,
    MDBModalFooter,
    MDBInput,
    MDBEdgeHeader,
    MDBFreeBird,
    MDBCard,
    MDBCardBody
} from "mdbreact";
import axios from "axios/index";
import Cookies from "js-cookie";
import "react-datepicker/dist/react-datepicker.css";
import {Link} from "react-router-dom";




class AdminProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: Cookies.get('url'),
            username: Cookies.get("username"),
            user: [],
            modal: false,
            register: false,
            changePassword:false
        }





    }
    componentDidMount()
    {
        if(Cookies.get("username")==='')
        {
            window.location.href = "http://localhost:3000/";
        }

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
    toggle1= () =>
    {
        this.setState({
            register: !this.state.register
        });
    }
    toggle2= () =>
    {
        this.setState({
            changePassword: !this.state.changePassword
        });
    }
    handleChangeUsername()
    {
        let pattern = document.getElementById('password').value;
        let xhm = new XMLHttpRequest();
        xhm.open("GET", this.state.url+"/login/"+this.state.username+"/password/"+pattern, false);
        xhm.send();
        if (xhm.responseText === "Admin")
        {
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

        xhr.open("GET", this.state.url+"/adminprofile/change/username/"+this.state.username+"/newusername/"+key, false);
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
        if (xhm.responseText === "Admin") {
            this.toggle();
        }
        else
        {
            alert("Wrong password!")
            return;
        }
        this.toggle2();
    }
    handleAddAnotherAdmin()
    {
        let pattern = document.getElementById('password').value;
        let xhm = new XMLHttpRequest();
        xhm.open("GET", this.state.url+"/login/"+this.state.username+"/password/"+pattern, false);
        xhm.send();
        if (xhm.responseText === "Admin") {
            this.toggle();
            this.toggle1();
        }
        else
        {
            alert("Wrong password!")
            return;
        }

    }
    submitHandler = event => {
        event.preventDefault();
        let pattern = document.getElementById('password').value;
        let patternag = document.getElementById('passwordag').value;
        let username=document.getElementById('username').value;
        let useremail=document.getElementById('useremail').value;
        if(username===""||username.length<4)
        {
            alert("Username has to contain at least 4 characters");
            return;
        }
        if(pattern!==patternag)
        {
            alert("Two passwords don't match");
            return;
        }
        if(useremail==="")
        {
            alert("Please enter valid email");
            return;
        }

        if(pattern.length<6)
        {
            alert("Password has to contain at least 6 characters");
            return;
        }


        let xhr = new XMLHttpRequest();
        xhr.open("GET", Cookies.get("url")+"/registeradmin/username/"+username+"/password/"+pattern+"/email/"+useremail, false);

        xhr.send();
        if(xhr.responseText === "false")
        {
            alert("This username has already been taken");
            return;
        }
        if(xhr.responseText==="true")
        {
            alert("Registration success!");
            this.toggle1();
            return;
        }



    };
    submitHandler1 = event => {
        event.preventDefault();
        let pattern = document.getElementById('password1').value;
        let patternag = document.getElementById('password1ag').value;
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
        xhr.open("GET", this.state.url+"/adminprofile/change/username/"+this.state.username+"/newpassword/"+pattern, false);
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
    render()
    {
        return (
            <div>
                <MDBNavbar color="default-color" dark expand="md" className="nav-justified" >
                    <MDBNavbarBrand>
                        <strong className="dark-text">Admin Profile</strong>
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
                                    <MDBBtn  onClick={this.toggle}>Change</MDBBtn>
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
                                <MDBBtn color="info" style={{ height: 50, width:200, marginTop: 10 }} onClick={this.handleAddAnotherAdmin.bind(this)}>Add Admin</MDBBtn>
                                <MDBBtn color="secondary" style={{ height: 50, width:200, marginTop: 10 }} onClick={this.toggle}>Close</MDBBtn>
                            </p>
                        </MDBModalFooter>
                    </MDBModal>
                </MDBContainer>
                <MDBContainer >
                    <MDBModal size="lg" isOpen={this.state.register} toggle={this.toggle1}>
                        <MDBModalHeader toggle={this.toggle1}>Add another admin</MDBModalHeader>
                        <MDBModalBody>
                                        <form  onSubmit={this.submitHandler}>
                                            <div className="grey-text">
                                                <MDBInput
                                                    label="Admin Username"
                                                    icon="user"
                                                    id={"username"}
                                                    group
                                                    type="text"
                                                    validate

                                                />
                                                <MDBInput
                                                    label="Password"
                                                    id={"password"}
                                                    icon="lock"
                                                    group
                                                    type="password"
                                                    validate

                                                />
                                                <MDBInput
                                                    label="Confirm Password"
                                                    icon="exclamation-triangle"
                                                    id={"passwordag"}
                                                    group
                                                    type="password"
                                                    validate

                                                />
                                                <MDBInput
                                                    label="Your email"
                                                    icon="envelope"
                                                    id={"useremail"}
                                                    group
                                                    type="email"
                                                    validate
                                                    error="wrong"
                                                    success="right"
                                                />
                                            </div>
                                            <div className="text-center">
                                                <MDBBtn color="primary" type="submit">Register</MDBBtn>
                                            </div>
                                            <p> </p>
                                            <div className="text-center">
                                                <p onClick={this.toggle1}>Back</p>
                                            </div>
                                        </form>
                        </MDBModalBody>
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
                                        id={"password1"}
                                        icon="lock"
                                        group
                                        type="password"
                                        validate

                                    />
                                    <MDBInput
                                        label="Confirm New Password"
                                        icon="exclamation-triangle"
                                        id={"password1ag"}
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


export default AdminProfile;
