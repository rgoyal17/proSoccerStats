import React, { Component } from 'react';
import NavBar from './navigation/NavBar';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './HomePage';
import ComparePlayersPage from './ComparePlayersPage';
import FavoritePlayesPage from './FavoritePlayesPage';
import SignInPage from './SignInPage';

class App extends Component {

    render() {
        return (
            <div>
                <header>
                    <NavBar />
                </header>
                <div>
                    <Switch>
                        <Route exact path='/' component={HomePage} />
                        <Route path='/compare' component={ComparePlayersPage} />
                        <Route path='/favorites' component={FavoritePlayesPage} />
                        <Route path='/signin' component={SignInPage} />
                        <Redirect to='/' />
                    </Switch>
                </div>
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