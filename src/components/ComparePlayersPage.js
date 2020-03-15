import React, { Component } from 'react';
import { Label, Input, Alert } from 'reactstrap';

class ComparePlayersPage extends Component {
    render() {
        return (
            <main>
                <CompareTable playersToCompare={this.props.playersToCompare} />
            </main>
        );
    }
}

class CompareTable extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        let data = this.props.playersToCompare;
        if (data.length >= 2) {
            let t1 = Object.values(data[0])[0][0].team_name;
            let l1 = Object.values(data[0])[0][0].league;
            let s1 = Object.values(data[0])[0][0].season;
            let t2 = Object.values(data[1])[0][0].team_name;
            let l2 = Object.values(data[1])[0][0].league;
            let s2 = Object.values(data[1])[0][0].season;
            let t3 = '';
            let l3 = '';
            let s3 = '';
            let t4 = '';
            let l4 = '';
            let s4 = '';
            if (data.length === 3) {
                t3 = Object.values(data[2])[0][0].team_name;
                l3 = Object.values(data[2])[0][0].league;
                s3 = Object.values(data[2])[0][0].season;
            }
            if (data.length === 4) {
                t4 = Object.values(data[3])[0][0].team_name;
                l4 = Object.values(data[3])[0][0].league;
                s4 = Object.values(data[3])[0][0].season;
            }
            console.log(t1);
            this.setState({ player1Team: t1, player1League: l1, player1Season: s1, player2Team: t2, player2League: l2, player2Season: s2, player3Team: t3, player3League: l3, player3Season: s3, player4Team: t4, player4League: l4, player4Season: s4 });
        }
    }

    handleTeam = (event) => {
        let elem = event.target;
        let value = elem.value;
        let id = elem.id;
        this.setState(() => {
            if (id === "team1") {
                return {player1Team: value};
            } else if (id === "team2") {
                return {player2Team: value};
            } else if (id === "team3") {
                return {player3Team: value};
            } else if (id === "team4") {
                return {player4Team: value};
            }
        });
    }

    handleLeague = (event) => {
        let elem = event.target;
        let value = elem.value;
        let id = elem.id;
        this.setState(() => {
            if (id === "league1") {
                return {player1League: value};
            } else if (id === "league2") {
                return {player2League: value};
            } else if (id === "league3") {
                return {player3League: value};
            } else if (id === "league4") {
                return {player4League: value};
            }
        });
    }

    handleSeason = (event) => {
        let elem = event.target;
        let value = elem.value;
        let id = elem.id;
        this.setState(() => {
            if (id === "season1") {
                return {player1Season: value};
            } else if (id === "season2") {
                return {player2Season: value};
            } else if (id === "season3") {
                return {player3Season: value};
            } else if (id === "season4") {
                return {player4Season: value};
            }
        });
    }

    render() {
        console.log(this.props.playersToCompare);
        console.log(this.state);
        if (this.props.playersToCompare.length < 2) {
            return (
                <Alert color="warning" id="compare-error">Please add at least two players to compare!</Alert>
            )
        } else {

            let imgRow = this.props.playersToCompare.map((item) => {
                let key = Object.keys(item)[0];
                let value = Object.values(item)[0][0];
                return (
                    <td key={key} id="first-row">
                        <img src={"https://cdn.sofifa.org/players/10/20/" + key + ".png"} alt={value.player_name} />
                        <span className="change-pointer remove-player">&times;</span>
                    </td>
                )
            });

            let nameRow = this.props.playersToCompare.map((item) => {
                let key = Object.keys(item)[0];
                let value = Object.values(item)[0][0];
                return <td key={key}>{value.player_name}</td>
            });

            let ageRow = this.props.playersToCompare.map((item) => {
                let key = Object.keys(item)[0];
                let value = Object.values(item)[0][0];
                return <td key={key}>{value.age}</td>
            });

            let dobRow = this.props.playersToCompare.map((item) => {
                let key = Object.keys(item)[0];
                let value = Object.values(item)[0][0];
                return <td key={key}>{value.birth_date}</td>
            });

            let nationalityRow = this.props.playersToCompare.map((item) => {
                let key = Object.keys(item)[0];
                let value = Object.values(item)[0][0];
                return <td key={key}>{value.nationality}</td>
            });

            let heightRow = this.props.playersToCompare.map((item) => {
                let key = Object.keys(item)[0];
                let value = Object.values(item)[0][0];
                return <td key={key}>{value.height}</td>
            });

            let weightRow = this.props.playersToCompare.map((item) => {
                let key = Object.keys(item)[0];
                let value = Object.values(item)[0][0];
                return <td key={key}>{value.weight}</td>
            });

            let teamRow = this.props.playersToCompare.map((item, index) => {
                let key = Object.keys(item)[0];
                let values = Object.values(item)[0];
                let allTeams = [];
                values.forEach((player) => {
                    if (!allTeams.includes(player.team_name) && player.team_name !== null) {
                        allTeams.push(player.team_name);
                    }
                })
                let allTeamOptions = allTeams.map((team) => {
                    return <option key={team} value={team}>{team}</option>;
                })
                return (
                    <td key={key}>
                        <div className="compare-input">
                            <Input type="select" name="team" id={"team"+ (index + 1)} onChange={this.handleTeam}>
                                {allTeamOptions}
                            </Input>
                        </div>
                    </td>
                )
            });

            let leagueRow = this.props.playersToCompare.map((item, index) => {
                let key = Object.keys(item)[0];
                let values = Object.values(item)[0];
                let allLeagues = [];
                values.forEach((player) => {
                    if (!allLeagues.includes(player.league) && player.league !== null) {
                        if ((index === 0 && player.team_name === this.state.player1Team) ||
                            (index === 1 && player.team_name === this.state.player2Team) ||
                            (index === 2 && player.team_name === this.state.player3Team) ||
                            (index === 3 && player.team_name === this.state.player4Team)) {
                            allLeagues.push(player.league);
                        }
                    }
                })
                let allLeagueOptions = allLeagues.map((league) => {
                    return <option key={league} value={league}>{league}</option>;
                })
                return (
                    <td key={key}>
                        <div className="compare-input">
                            <Input type="select" name="league" id={"league" + (index + 1)} onChange={this.handleLeague}>
                                {allLeagueOptions}
                            </Input>
                        </div>
                    </td>
                )
            });

            let seasonRow = this.props.playersToCompare.map((item, index) => {
                let key = Object.keys(item)[0];
                let values = Object.values(item)[0];
                let allSeasons = [];
                values.forEach((player) => {
                    if (!allSeasons.includes(player.season) && player.season !== null) {
                        if ((index === 0 && player.team_name === this.state.player1Team && player.league === this.state.player1League) ||
                            (index === 1 && player.team_name === this.state.player2Team && player.league === this.state.player2League) ||
                            (index === 2 && player.team_name === this.state.player3Team && player.league === this.state.player3League) ||
                            (index === 3 && player.team_name === this.state.player4Team && player.league === this.state.player4League)) {
                            allSeasons.push(player.season);
                        }
                    }
                })
                let allSeasonOptions = allSeasons.map((season) => {
                    return <option key={season} value={season}>{season}</option>;
                })
                return (
                    <td key={key}>
                        <div className="compare-input">
                            <Input type="select" name="season" id={"season" + (index + 1)} onChange={this.handleSeason}>
                                {allSeasonOptions}
                            </Input>
                        </div>
                    </td>
                )
            });

            return (
                <div>
                    <p className="headings">Compare Players</p>
                    <table className="table col-10 compare-table">
                        <TableHeader playersToCompare={this.props.playersToCompare} />
                        <tbody>
                            <tr>
                                <td className="field"></td>
                                {imgRow}
                            </tr>
                            <tr>
                                <td className="field">Name:</td>
                                {nameRow}
                            </tr>
                            <tr>
                                <td className="field">Age:</td>
                                {ageRow}
                            </tr>
                            <tr>
                                <td className="field">Birth Date:</td>
                                {dobRow}
                            </tr>
                            <tr>
                                <td className="field">Nationality:</td>
                                {nationalityRow}
                            </tr>
                            <tr>
                                <td className="field">Height:</td>
                                {heightRow}
                            </tr>
                            <tr>
                                <td className="field">Weight:</td>
                                {weightRow}
                            </tr>
                            <tr>
                                <td className="field"><Label for="team">Team:</Label></td>
                                {teamRow}
                            </tr>
                            <tr>
                                <td className="field"><Label for="league">League:</Label></td>
                                {leagueRow}
                            </tr>
                            <tr>
                                <td className="field"><Label for="season">Season:</Label></td>
                                {seasonRow}
                            </tr>
                        </tbody>
                        {/* <tbody>
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
                        </tbody> */}
                    </table>
                </div>
            )
        }
    }
}

class TableHeader extends Component {
    render() {
        let header = this.props.playersToCompare.map((item, index) => {
            return <th key={index + 1}>{"Player " + (index + 1)}</th>
        })
        return (
            <thead>
                <tr>
                    <th></th>
                    {header}
                </tr>
            </thead>
        )
    }
}

export default ComparePlayersPage;