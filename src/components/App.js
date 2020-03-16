import React, { Component } from 'react';
import NavBar from './navigation/NavBar';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import HomePage from './HomePage';
import ComparePlayersPage from './ComparePlayersPage';
import FavoritePlayersPage from './FavoritePlayersPage';
import firebase from 'firebase/app';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showSignInModal: false,
            signedIn: false,
            checkedIds: [],
            compareStats: [],
            user: null,
            firebaseData: []
        };
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
                this.getData(firebaseUser.uid);
                this.setState({ signedIn: true, showSignInModal: false, user: firebaseUser });
            } else {
                this.setState({signedIn: false, user: null, firebaseData: []});
            }
        });
    }

    componentWillUnmount() {
        this.authUnRegFunc();
        this.playerRef.off();
    }

    handleLogOut = () => {
        firebase.auth().signOut();
    }

    toggleSignInModal = () => {
        this.setState({ showSignInModal: !this.state.showSignInModal });
    }

    getData = (uid) => {
        this.playerRef = firebase.database().ref('playerInfo');
        this.playerRef.on('value', (snapshot) => {
            let data = snapshot.val();
            if (data !== null && data !== undefined) {
                let playerKeys = Object.keys(data);
                let playerArray = playerKeys.map((key) => {
                    let playerObj = data[key];
                    playerObj.firebaseId = key;
                    return playerObj;
                });
                let filteredArray = playerArray.filter((item) => {
                    return Object.keys(item)[0] === uid;
                })
                this.setState({ firebaseData: filteredArray });
            } else {
                this.setState({ firebaseData: [] });
            }
        });
    }

    updateCheckedPlayers = (playerObj) => {
        let copy = this.state.compareStats;
        let copy1 = this.state.checkedIds;
        let exists = false;
        let index = -1;
        for (let i = 0; i < copy.length; i++) {
            if (Object.keys(copy[i])[0] === Object.keys(playerObj)[0]) {
                exists = true;
                index = i;
                break;
            }
        }
        if (exists) {
            copy.splice(index, 1);
            copy1.splice(index, 1);
        } else {
            copy.push(playerObj);
            copy1.push(Object.keys(playerObj)[0]);
        }
        this.setState({ compareStats: copy, checkedIds: copy1 });
    }

    removePlayer = (index) => {
        let copy1 = this.state.compareStats;
        copy1.splice(index, 1);
        let copy2 = this.state.checkedIds;
        copy2.splice(index, 1);
        this.setState({ compareStats: copy1, checkedIds: copy2 });
    }

    render() {

        let signinModal = null;
        if (this.state.showSignInModal) {
            signinModal = (
                <div>
                    <Modal isOpen={this.state.showSignInModal} toggle={this.toggleSignInModal}>
                        <div className="change-pointer close" onClick={this.toggleSignInModal}>&times;</div>
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
                <header>
                    <NavBar callback={this.state.signedIn ? this.handleLogOut : this.toggleSignInModal} signedIn={this.state.signedIn} />
                </header>
                <Switch>
                    <Route exact path='/' render={(props) => <HomePage {...props} signedIn={this.state.signedIn} callback={this.toggleSignInModal} checkedPlayer={this.updateCheckedPlayers} checkedIds={this.state.checkedIds} statsArr={this.state.compareStats} user={this.state.user} firebaseData={this.state.firebaseData} />} />
                    <Route path='/compare' render={(props) => <ComparePlayersPage {...props} playersToCompare={this.state.compareStats} removePlayer={this.removePlayer} />} />
                    <Route path='/favorites' render={(props) => <FavoritePlayersPage {...props} user={this.state.user} firebaseData={this.state.firebaseData} />} />
                    <Redirect to='/' />
                </Switch>
                {signinModal}
                <footer>
                    <address>
                        <p>Posted by: Rishabh Goyal and Mehul Goel</p>
                        <p>Contact information: <a href="mailto:rishabhgoyal555@gmail.com">rishabhgoyal555@gmail.com</a> / <a href="mailto:mgoel.mehul@gmail.com">mgoel.mehul@gmail.com</a></p>
                        <cite>Data taken from two sources: <a href="https://www.kaggle.com/stefanoleone992/fifa-20-complete-player-dataset">FIFA 2020 dataset from Kaggle </a>and <a href="https://rapidapi.com/api-sports/api/api-football">Football Player API</a></cite>
                    </address>
                    <p>2020 &copy; INFO340</p>
                </footer>
            </div>
        );
    }
}

export default App;