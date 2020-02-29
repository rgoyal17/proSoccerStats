import React, { Component } from 'react'; //import React Component
import './../style.css';
import NavBar from './navigation/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './HomePage';
import CreateTeamPage from './CreateTeamPage';
import TeamStandingPage from './TeamStandingPage';
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
                        <Route path='/createteam' component={CreateTeamPage} />
                        <Route path='/leaderboard' component={TeamStandingPage} />
                        <Route path='/signin' component={SignInPage} />
                        <Redirect to='/' />
                    </Switch>
                </div>
                <footer>
                    <address>
                        <p>Posted by: Rishabh Goyal and Mehul Goel</p>
                        <p>Contact information: <a href="mailto:rishabhgoyal555@gmail.com">rishabhgoyal555@gmail.com</a> /
                        <a href="mailto:mgoel.mehul@gmail.com">mgoel.mehul@gmail.com</a></p>
                        <cite>Data taken from two sources: <a href="https://www.kaggle.com/karangadiya/fifa19">FIFA 2019 dataset from Kaggle </a>
                        and <a href="https://rapidapi.com/api-sports/api/api-football">Football Player API</a></cite>
                    </address>
                    <p>2020 &copy; INFO340</p>
                </footer>
            </div>
        );
    }
}

export default App;