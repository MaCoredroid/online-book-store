import React, { Component } from "react";
import {MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBCard, MDBCardBody} from 'mdbreact';
import {Link} from "react-router-dom";
class Register extends Component
{

    submitHandler = event => {
        event.preventDefault();
        let pattern = document.getElementById('password').value;
        let patternag = document.getElementById('passwordag').value;
        let username=document.getElementById('username').value;
        let useremail=document.getElementById('useremail').value;
        if(username===""||username.length<4)
        {
            alert("Password has to contain at least 4 characters");
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

        let request = new XMLHttpRequest();
        request.open("GET", "http://localhost:8080/Javaweb_war_exploded/Checkuser?user=" + username, false);
        request.send(null);
        if(request.responseText === "FALSE")
        {
            alert("This username has already been taken");
            return;
        }


        let xhr = new XMLHttpRequest();
        xhr.open("POST", " http://localhost:8080/Javaweb_war_exploded/Checkuser", false);

        xhr.send(JSON.stringify({
            "username":username,
            "useremail":useremail,
            "password":pattern,

        }));
        if(xhr.responseText==="TRUE")
        {
            alert("Registration success!");
            return;
        }



    };
    render()
    {
        return (
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="6">
                            <MDBCard>
                                <MDBCardBody>
                                    <form  onSubmit={this.submitHandler}>
                                        <p className="h5 text-center mb-4">Sign up</p>
                                        <div className="grey-text">
                                            <MDBInput
                                                label="Your name"
                                                icon="user"
                                                id={"username"}
                                                group
                                                type="text"
                                                validate

                                            />
                                            <MDBInput
                                                label="Your password"
                                                id={"password"}
                                                icon="lock"
                                                group
                                                type="password"
                                                validate

                                            />
                                            <MDBInput
                                                label="Confirm your password"
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
                                            <Link to={"/"}>Log in</Link>
                                        </div>
                                    </form>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
        );
    }
}

export default Register;