import React, { Component } from 'react';
import { Label, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

class FavoritePlayersPage extends Component {
    render() {
        return (
            <main>
                <div>
                    <p className="headings">Compare Players</p>
                </div>
                <div>
                    <table className="table col-lg-10 col-xl-9 compare-table">
                        <ComparePlayerTableHead />
                        <tbody>
                            <tr>
                                <td className="field"></td>
                                <td className="equal"><img src={"https://cdn.sofifa.org/players/10/20/158023.png"} alt="Player1" /><FontAwesomeIcon icon={faTimesCircle} className="fa-lg cross1" /></td>
                                <td className="equal"><img src={"https://cdn.sofifa.org/players/10/20/20801.png"} alt="Player2" /><FontAwesomeIcon icon={faTimesCircle} className="fa-lg cross2" /></td>
                            </tr>
                            <tr>
                                <td className="field">Name:</td>
                                <td className="equal">Lionel Andres Messi Cuccittini</td>
                                <td className="equal">Cristiano Ronaldo dos Santos Aveiro</td>
                            </tr>
                            <tr>
                                <td className="field">Age:</td>
                                <td className="equal">33</td>
                                <td className="equal">35</td>
                            </tr>
                            <tr>
                                <td className="field">Birth Date:</td>
                                <td className="equal">24/06/1987</td>
                                <td className="equal">05/02/1985</td>
                            </tr>
                            <tr>
                                <td className="field">Nationality:</td>
                                <td className="equal">Argentina</td>
                                <td className="equal">Portugal</td>
                            </tr>
                            <tr>
                                <td className="field">Position:</td>
                                <td className="equal">Attacker</td>
                                <td className="equal">Attacker</td>
                            </tr>
                            <tr>
                                <td className="field">Height:</td>
                                <td className="worse">170 cm</td>
                                <td className="better">187 cm</td>
                            </tr>
                            <tr>
                                <td className="field">Weight:</td>
                                <td className="worse">72 kg</td>
                                <td className="better">83 kg</td>
                            </tr>
                            <tr>
                                <td className="field">
                                    <Label>Team:</Label>
                                </td>
                                <td className="equal"><Input type="select"><option>Barcelona</option></Input></td>
                                <td className="equal"><Input type="select"><option>Juventus</option></Input></td>
                            </tr>
                            <tr>
                                <td className="field">
                                    <Label>League:</Label>
                                </td>
                                <td className="equal"><Input type="select"><option>La Liga</option></Input></td>
                                <td className="equal"><Input type="select"><option>Serie A</option></Input></td>
                            </tr>
                            <tr>
                                <td className="field">
                                    <Label>Season:</Label>
                                </td>
                                <td className="equal"><Input type="select"><option>2019-2020</option></Input></td>
                                <td className="equal"><Input type="select"><option>2019-2020</option></Input></td>
                            </tr>
                            <tr>
                                <td className="field">Matches Played:</td>
                                <td className="worse">20</td>
                                <td className="better">21</td>
                            </tr>
                            <tr>
                                <td className="field">Minutes Played:</td>
                                <td className="worse">1710</td>
                                <td className="better">1855</td>
                            </tr>
                            <tr>
                                <td className="field">Goals Scored:</td>
                                <td className="worse">18</td>
                                <td className="better">21</td>
                            </tr>
                            <tr>
                                <td className="field">Assists:</td>
                                <td className="better">12</td>
                                <td className="worse">2</td>
                            </tr>
                            <tr>
                                <td className="field">Shots(On Target):</td>
                                <td className="worse">96(51)</td>
                                <td className="better">121(52)</td>
                            </tr>
                            <tr>
                                <td className="field">Passes:</td>
                                <td className="better">920(80% accuracy)</td>
                                <td className="worse">656(83% accuracy)</td>
                            </tr>
                            <tr>
                                <td className="field">Tackles:</td>
                                <td className="better">11</td>
                                <td className="worse">7</td>
                            </tr>
                            <tr>
                                <td className="field">Interceptions:</td>
                                <td className="worse">4</td>
                                <td className="better">5</td>
                            </tr>
                            <tr>
                                <td className="field">Duels(Won):</td>
                                <td className="equal">0(0)</td>
                                <td className="equal">0(0)</td>
                            </tr>
                            <tr>
                                <td className="field">Dribbles(Success):</td>
                                <td className="better">149(107)</td>
                                <td className="worse">58(37)</td>
                            </tr>
                            <tr>
                                <td className="field">Fouls:</td>
                                <td className="better">7</td>
                                <td className="worse">15</td>
                            </tr>
                            <tr>
                                <td className="field">Cards(Yellow/Red):</td>
                                <td className="equal">1/0</td>
                                <td className="equal">1/0</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        );
    }
}

class ComparePlayerTableHead extends Component {
    render() {

        return (
            <thead>
                <tr>
                    <th></th>
                    <th>Player 1</th>
                    <th>Player 2</th>
                </tr>
            </thead>
        );
    }
}

export default FavoritePlayersPage;