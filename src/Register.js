import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';

class Register extends Component
{

    submitHandler = event => {
        event.preventDefault();
        let pattern = document.getElementById('email').value;
        let patternag = document.getElementById('emailag').value;
        if(pattern!=patternag)
        {
            alert("Two email address don't match");
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
                                        validate
                                        error="wrong"
                                        success="right"
                                    />
                                    <MDBInput
                                        label="Your email"
                                        id={"email"}
                                        icon="envelope"
                                        group
                                        type="email"
                                        validate
                                        error="wrong"
                                        success="right"
                                    />
                                    <MDBInput
                                        label="Confirm your email"
                                        icon="exclamation-triangle"
                                        id={"emailag"}
                                        group
                                        type="text"
                                        validate
                                        error="wrong"
                                        success="right"
                                    />
                                    <MDBInput
                                        label="Your password"
                                        icon="lock"
                                        group
                                        type="password"
                                        validate
                                    />
                                </div>
                                <div className="text-center">
                                    <MDBBtn color="primary" type="submit">Register</MDBBtn>
                                </div>
                            </form>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
        );
    }
}

export default Register;