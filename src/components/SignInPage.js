import React, { Component } from 'react';
import { Label, Input, Button, Form } from 'reactstrap';
 
class SignInPage extends Component {
    render() {
        return (
            <main>
                <div className="headings">
                    Sign in to your Account
                </div>
                <div className="sign-in">
                    <div className="sign-in-helper">
                        <Label>Email Address:</Label>
                        <Input type="text" placeholder="Enter Your Email Address..."></Input>
                    </div>
                    <div className="sign-in-helper">
                        <div className="row">
                            <Label className="col">Password:</Label>
                            <span className="entries col"><a href="#">Forgot Password</a></span>
                        </div>
                        <Input type="text" placeholder="Enter Your Password..."></Input>
                    </div>
                    <div>
                        <Form><Button id="signin-btn">Sign In</Button></Form>
                    </div>
                </div>
                <p className="option">------------ OR ------------</p>
                <div className="log-in">
                    <Form><Button id="account">New User? Create an account</Button></Form>
                </div>
 
            </main>
            
        );
    }
}
 
export default SignInPage;