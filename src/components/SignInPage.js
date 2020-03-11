import React, { Component } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import firebase from 'firebase/app';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

class SignInPage extends Component {

    constructor(props) {
        super(props);
        this.state = { user: null };
    }

    uiConfig = {
        signInOptions: [
            {
                provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                requireDisplayName: false
            },
            firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ],
        credentialHelper: 'none',
        signInFlow: 'popup'
    }

    componentDidMount() {
        this.authUnRegFunc = firebase.auth().onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                this.props.toggleSignIn();
                this.setState({ user: firebaseUser });
            }
        })
    }

    componentWillUnmount () {
        this.authUnRegFunc();
    }

    render() {

        let content = <div>hi</div>;
        if (this.state.user === null) {
            content = (
                <div>
                <Modal isOpen={this.props.open} toggle={this.props.callback}>
                    <div className="change-pointer close" onClick={this.props.callback}>&times;</div>
                    <div id="signin-modal">
                        <ModalHeader>Sign In</ModalHeader>
                        <ModalBody>
                            <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
                        </ModalBody>
                    </div>
                </Modal>
                </div>
            );
        }

        return (
            <div>
            {content}
            </div>
            
            
        );
    }
}

export default SignInPage;