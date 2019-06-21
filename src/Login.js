import React, {Component} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput } from 'mdbreact';
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import './css/Login.css'
import { MDBFreeBird, MDBCardTitle, MDBEdgeHeader } from
        "mdbreact";

class Login extends Component {
    submitHandler = event => {
        event.preventDefault();
        if(Cookies.get('username'))
        {
            Cookies.remove('username');
        }
        let pattern = document.getElementById('password').value;
        let username = document.getElementById('username').value;
        let xhr = new XMLHttpRequest();
        let url=Cookies.get('url');


        xhr.open("GET", url+"/login/"+username+"/password/"+pattern, false);
        xhr.send();
        if (xhr.responseText === "Blocked") {
            alert("You are blocked! Please contact the admin!");
            return;
        }
        if (xhr.responseText === "User") {
            alert("Login succeed!");
            Cookies.set('username', username);
            window.location.href = "http://localhost:3000/Homepage#/Homepage";
            return;
        }
        if (xhr.responseText === "Admin") {
            alert("Login succeed!");
            Cookies.set('username', username);
            window.location.href = "http://localhost:3000/UserManage#/UserManage";
            return;
        }

        if(xhr.responseText === "false") {
            alert("Login failed! Please check your username and password. ")
            return;
        }



    };

    render()
    {
        return (


                <MDBContainer >
                    <MDBEdgeHeader color="white"></MDBEdgeHeader>
                    <MDBFreeBird>
                        <MDBRow>
                            <MDBCol md="6" lg="5" className="mx-auto float-none white ">
                                <MDBCard>
                                <div className="header pt-3 grey lighten-2">
                                    <MDBRow className="d-flex justify-content-start">
                                        <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                                            Log in
                                        </h3>
                                    </MDBRow>
                                </div>
                                <MDBCardBody className="mx-4 mt-4">
                                    <form onSubmit={this.submitHandler}>
                                        <MDBInput label="username"
                                                  group type="text"
                                                  validate
                                                  id={"username"}


                                        />
                                        <MDBInput
                                            label="Your password"

                                            type="password"
                                            validate
                                            containerClass="mb-0"
                                            id={"password"}
                                        />

                                        <div className="text-center mb-4 mt-5">
                                            <MDBBtn
                                                color="danger"
                                                type="submit"
                                                className="btn-block z-depth-2"
                                            >
                                                Log in
                                            </MDBBtn>
                                        </div>
                                        <div className="font-small grey-text d-flex justify-content-center">
                                            Don't have an account?
                                            <div
                                                href="#!"
                                                className="dark-grey-text font-weight-bold ml-1"
                                            >
                                                <Link to={"/Register"}>Register</Link>


                                            </div>
                                        </div>
                                    </form>
                                </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBFreeBird>
                </MDBContainer>









    );
    }
}

export default Login;
