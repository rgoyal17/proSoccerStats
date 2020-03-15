import React, { Component } from 'react';
import NavBar from './navigation/NavBar';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './HomePage';
import ComparePlayersPage from './ComparePlayersPage';
import FavoritePlayesPage from './FavoritePlayesPage';
import SignInPage from './SignInPage';
import firebase from 'firebase/app';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showSignInModal: false,
            signedIn: false,
            checkedIds: [],
            compareStats: []
        };
    }

    handleLogOut = () => {
        firebase.auth().signOut();
        this.setState({signedIn: false});
    }

    toggleSignInModal = () => {
        this.setState({showSignInModal: !this.state.showSignInModal});
    }

    toggleSignIn = () => {
        this.setState({signedIn: true, showSignInModal: false});
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

    render() {

        let signinModal = null;
        if (this.state.showSignInModal) {
            signinModal = (
                <SignInPage open={this.state.showSignInModal} callback={this.toggleSignInModal} toggleSignIn={this.toggleSignIn} />
            )
        }

        return (
            <div>
                <header>
                    <NavBar callback={this.state.signedIn ? this.handleLogOut : this.toggleSignInModal} signedIn={this.state.signedIn} />
                </header>
                <Switch>
                    <Route exact path='/' render={(props) => <HomePage {...props} signedIn={this.state.signedIn} callback={this.toggleSignInModal} checkedPlayer={this.updateCheckedPlayers} checkedIds={this.state.checkedIds} statsArr={this.state.compareStats} />} />
                    <Route path='/compare' render={(props) => <ComparePlayersPage {...props} playersToCompare={this.state.compareStats} />} />
                    <Route path='/favorites' component={FavoritePlayesPage} />
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