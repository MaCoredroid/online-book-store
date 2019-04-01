import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import {Link} from "react-router-dom";
class Register extends Component
{

    submitHandler = event => {
        event.preventDefault();
        let pattern = document.getElementById('password').value;
        let patternag = document.getElementById('passwordag').value;
        if(pattern!=patternag)
        {
            alert("Two passwords don't match");
        }

    };
    render()
    {
        return (
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="6">
                            <form  onSubmit={this.submitHandler}>
                                <p className="h5 text-center mb-4">Sign up</p>
                                <div className="grey-text">
                                    <MDBInput
                                        label="Your name"
                                        icon="user"
                                        group
                                        type="text"

                                    />
                                    <MDBInput
                                        label="Your password"
                                        id={"password"}
                                        icon="lock"
                                        group
                                        type="password"

                                    />
                                    <MDBInput
                                        label="Confirm your password"
                                        icon="exclamation-triangle"
                                        id={"passwordag"}
                                        group
                                        type="password"

                                    />
                                    <MDBInput
                                        label="Your email"
                                        icon="envelope"
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
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
        );
    }
}

export default Register;