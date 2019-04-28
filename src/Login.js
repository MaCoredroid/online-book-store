import React, {Component} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput } from 'mdbreact';
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'

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
        xhr.open("POST", " http://localhost:8080/Javaweb_war_exploded/Login", false);
        xhr.send(JSON.stringify({
            "username":username,
            "password":pattern,

        }));
        if (xhr.responseText === "TRUE") {
            alert("Login succeed!");
            Cookies.set('username', username);
            window.location.href = "http://localhost:3000/Homepage#/Homepage";
        }
        else
        {
            alert("Login failed! Please check your username and password. ")
            return;
        }


    };

    render()
    {
        return (


            <MDBContainer>
                <MDBRow>
                    <MDBCol md="6">
                        <form onSubmit={this.submitHandler}>
                            <MDBCard>
                                <div className="header pt-3 grey lighten-2">
                                    <MDBRow className="d-flex justify-content-start">
                                        <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">

                                            Log in
                                        </h3>
                                    </MDBRow>
                                </div>
                                <MDBCardBody className="mx-4 mt-4">
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
                                    <p className="font-small grey-text d-flex justify-content-center">
                                        Don't have an account?
                                        <a
                                            href="#!"
                                            className="dark-grey-text font-weight-bold ml-1"
                                        >
                                            <Link to={"/Register"}>Register</Link>


                                        </a>
                                    </p>
                                </MDBCardBody>
                            </MDBCard>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>


        );
    }
}

export default Login;