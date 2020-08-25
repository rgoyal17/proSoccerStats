import React, { Component } from 'react';
import { Label, Input, Alert } from 'reactstrap';

class ComparePlayersPage extends Component {
    render() {
        return (
            <main>
                <CompareTable playersToCompare={this.props.playersToCompare} removePlayer={this.props.removePlayer} />
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
        this.update();
    }

    // updates the state based on players to compare
    update = () => {
        let data = this.props.playersToCompare;
        if (data.length >= 2) {
            let t1 = Object.values(data[0])[0][0].team_name;
            let l1 = Object.values(data[0])[0][0].league;
            let s1 = Object.values(data[0])[0][0].season;
            let p1 = Object.values(data[0])[0].filter((item) => {
                return item.team_name === t1 && item.league === l1 && item.season === s1;
            })
            let t2 = Object.values(data[1])[0][0].team_name;
            let l2 = Object.values(data[1])[0][0].league;
            let s2 = Object.values(data[1])[0][0].season;
            let p2 = Object.values(data[1])[0].filter((item) => {
                return item.team_name === t2 && item.league === l2 && item.season === s2;
            })
            let filteredData = [];
            filteredData.push(p1[0], p2[0]);
            let t3 = '';
            let l3 = '';
            let s3 = '';
            let p3 = [{}];
            let t4 = '';
            let l4 = '';
            let s4 = '';
            let p4 = [{}];
            if (data.length > 2) {
                t3 = Object.values(data[2])[0][0].team_name;
                l3 = Object.values(data[2])[0][0].league;
                s3 = Object.values(data[2])[0][0].season;
                p3 = Object.values(data[2])[0].filter((item) => {
                    return item.team_name === t3 && item.league === l3 && item.season === s3;
                })
                filteredData.push(p3[0]);
            }
            if (data.length > 3) {
                t4 = Object.values(data[3])[0][0].team_name;
                l4 = Object.values(data[3])[0][0].league;
                s4 = Object.values(data[3])[0][0].season;
                p4 = Object.values(data[3])[0].filter((item) => {
                    return item.team_name === t4 && item.league === l4 && item.season === s4;
                })
                filteredData.push(p4[0]);
            }
            this.setState({
                allData: data, player1Team: t1, player1League: l1, player1Season: s1, player1Data: p1[0],
                player2Team: t2, player2League: l2, player2Season: s2, player2Data: p2[0], player3Team: t3,
                player3League: l3, player3Season: s3, player3Data: p3[0], player4Team: t4, player4League: l4,
                player4Season: s4, player4Data: p4[0], filteredData: filteredData
            });
        }
    }

    // handle team change
    handleTeam = (event) => {
        let elem = event.target;
        let value = elem.value;
        let id = elem.id;
        this.setState(() => {
            if (id === "team1") {
                let allData = this.state.allData[0];
                let data = Object.values(allData)[0];
                let teamFilteredData = data.filter((item) => {
                    return item.team_name === value;
                });
                let p1Data = teamFilteredData.filter((item) => {
                    return item.league === teamFilteredData[0].league && item.season === teamFilteredData[0].season;
                });
                let copy = this.state.filteredData;
                copy.splice(0, 1, p1Data[0]);
                return { player1Team: value, player1League: teamFilteredData[0].league, player1Season: teamFilteredData[0].season, player1Data: p1Data[0], filteredData: copy };
            } else if (id === "team2") {
                let allData = this.state.allData[1];
                let data = Object.values(allData)[0];
                let teamFilteredData = data.filter((item) => {
                    return item.team_name === value;
                });
                let p2Data = teamFilteredData.filter((item) => {
                    return item.league === teamFilteredData[0].league && item.season === teamFilteredData[0].season;
                });
                let copy = this.state.filteredData;
                copy.splice(1, 1, p2Data[0]);
                return { player2Team: value, player2League: teamFilteredData[0].league, player2Season: teamFilteredData[0].season, player2Data: p2Data[0], filteredData: copy };
            } else if (id === "team3") {
                let allData = this.state.allData[2];
                let data = Object.values(allData)[0];
                let teamFilteredData = data.filter((item) => {
                    return item.team_name === value;
                });
                let p3Data = teamFilteredData.filter((item) => {
                    return item.league === teamFilteredData[0].league && item.season === teamFilteredData[0].season;
                });
                let copy = this.state.filteredData;
                copy.splice(2, 1, p3Data[0]);
                return { player3Team: value, player3League: teamFilteredData[0].league, player3Season: teamFilteredData[0].season, player3Data: p3Data[0], filteredData: copy };
            } else if (id === "team4") {
                let allData = this.state.allData[3];
                let data = Object.values(allData)[0];
                let teamFilteredData = data.filter((item) => {
                    return item.team_name === value;
                });
                let p4Data = teamFilteredData.filter((item) => {
                    return item.league === teamFilteredData[0].league && item.season === teamFilteredData[0].season;
                });
                let copy = this.state.filteredData;
                copy.splice(3, 1, p4Data[0]);
                return { player4Team: value, player4League: teamFilteredData[0].league, player4Season: teamFilteredData[0].season, player4Data: p4Data[0], filteredData: copy };
            }
        });
    }

    // handle league change
    handleLeague = (event) => {
        let elem = event.target;
        let value = elem.value;
        let id = elem.id;
        this.setState(() => {
            if (id === "league1") {
                let allData = this.state.allData[0];
                let data = Object.values(allData)[0];
                let leagueFilteredData = data.filter((item) => {
                    return item.team_name === this.state.player1Team && item.league === value;
                });
                let p1Data = leagueFilteredData.filter((item) => {
                    return item.season === leagueFilteredData[0].season;
                });
                let copy = this.state.filteredData;
                copy.splice(0, 1, p1Data[0]);
                return { player1League: value, player1Season: leagueFilteredData[0].season, player1Data: p1Data[0] };
            } else if (id === "league2") {
                let allData = this.state.allData[1];
                let data = Object.values(allData)[0];
                let leagueFilteredData = data.filter((item) => {
                    return item.team_name === this.state.player2Team && item.league === value;
                });
                let p2Data = leagueFilteredData.filter((item) => {
                    return item.season === leagueFilteredData[0].season;
                });
                let copy = this.state.filteredData;
                copy.splice(1, 1, p2Data[0]);
                return { player2League: value, player2Season: leagueFilteredData[0].season, player2Data: p2Data[0], filteredData: copy };
            } else if (id === "league3") {
                let allData = this.state.allData[2];
                let data = Object.values(allData)[0];
                let leagueFilteredData = data.filter((item) => {
                    return item.team_name === this.state.player3Team && item.league === value;
                });
                let p3Data = leagueFilteredData.filter((item) => {
                    return item.season === leagueFilteredData[0].season;
                });
                let copy = this.state.filteredData;
                copy.splice(2, 1, p3Data[0]);
                return { player3League: value, player3Season: leagueFilteredData[0].season, player3Data: p3Data[0], filteredData: copy };
            } else if (id === "league4") {
                let allData = this.state.allData[3];
                let data = Object.values(allData)[0];
                let leagueFilteredData = data.filter((item) => {
                    return item.team_name === this.state.player4Team && item.league === value;
                });
                let p4Data = leagueFilteredData.filter((item) => {
                    return item.season === leagueFilteredData[0].season;
                });
                let copy = this.state.filteredData;
                copy.splice(3, 1, p4Data[0]);
                return { player4League: value, player4Season: leagueFilteredData[0].season, player4Data: p4Data[0], filteredData: copy };
            }
        });
    }

    // handle season
    handleSeason = (event) => {
        let elem = event.target;
        let value = elem.value;
        let id = elem.id;
        this.setState(() => {
            if (id === "season1") {
                let p1Data = Object.values(this.state.allData[0])[0].filter((item) => {
                    return item.team_name === this.state.player1Team && item.league === this.state.player1League && item.season === value;
                });
                let copy = this.state.filteredData;
                copy.splice(0, 1, p1Data[0]);
                return { player1Season: value, player1Data: p1Data[0], filteredData: copy };
            } else if (id === "season2") {
                let p2Data = Object.values(this.state.allData[1])[0].filter((item) => {
                    return item.team_name === this.state.player2Team && item.league === this.state.player2League && item.season === value;
                });
                let copy = this.state.filteredData;
                copy.splice(1, 1, p2Data[0]);
                return { player2Season: value, player2Data: p2Data[0], filteredData: copy };
            } else if (id === "season3") {
                let p3Data = Object.values(this.state.allData[2])[0].filter((item) => {
                    return item.team_name === this.state.player3Team && item.league === this.state.player3League && item.season === value;
                });
                let copy = this.state.filteredData;
                copy.splice(2, 1, p3Data[0]);
                return { player3Season: value, player3Data: p3Data[0], filteredData: copy };
            } else if (id === "season4") {
                let p4Data = Object.values(this.state.allData[3])[0].filter((item) => {
                    return item.team_name === this.state.player4Team && item.league === this.state.player4League && item.season === value;
                });
                let copy = this.state.filteredData;
                copy.splice(3, 1, p4Data[0]);
                return { player4Season: value, player4Data: p4Data[0], filteredData: copy };
            }
        });
    }

    // handle removing a player
    handleRemove = (index) => {
        this.props.removePlayer(index);
        this.update();
    }

    render() {

        if (this.props.playersToCompare.length < 2 || Object.keys(this.state).length === 0) {
            return (
                <Alert color="warning" className="error-message">Please add at least two players to compare!</Alert>
            );
        } else if (this.state.allData.length >= 2) {
            let finalData = this.state.filteredData;

            let imgRow = this.state.allData.map((item, index) => {
                let key = Object.keys(item)[0];
                let value = Object.values(item)[0][0];
                return (
                    <td key={value.player_id} id="first-row">
                        <img src={"https://futhead.cursecdn.com/static/img/20/players/" + key + ".png"} alt={value.player_name} className="compare-img" />
                        <span role="button" className="change-pointer remove-player" onClick={() => this.handleRemove(index)}>&times;</span>
                    </td>
                )
            });

            let nameRow = finalData.map((item) => {
                return <td key={item.player_id}>{item.player_name}</td>
            });

            let ageRow = finalData.map((item) => {
                return <td key={item.player_id}>{item.age}</td>
            });

            let dobRow = finalData.map((item) => {
                return <td key={item.player_id}>{item.birth_date}</td>
            });

            let nationalityRow = finalData.map((item) => {
                return <td key={item.player_id}>{item.nationality}</td>
            });

            let heightRow = finalData.map((item) => {
                return <td key={item.player_id}>{item.height}</td>
            });

            let weightRow = finalData.map((item) => {
                return <td key={item.player_id}>{item.weight}</td>
            });

            let teamRow = this.state.allData.map((item, index) => {
                let values = Object.values(item)[0];
                let allTeams = [];
                values.forEach((player) => {
                    if (!allTeams.includes(player.team_name) && player.team_name !== null && player.team_name !== undefined) {
                        allTeams.push(player.team_name);
                    }
                });
                let allTeamOptions = allTeams.map((team) => {
                    return <option key={team} value={team}>{team}</option>;
                });
                let val = this.state.player1Team;
                if (index === 1) {
                    val = this.state.player2Team;
                } else if (index === 2) {
                    val = this.state.player3Team;
                } else if (index === 3) {
                    val = this.state.player4Team;
                }
                return (
                    <td key={values[0].player_id}>
                        <div className="compare-input">
                            <Input type="select" name="team" id={"team" + (index + 1)} onChange={this.handleTeam} value={val}>
                                {allTeamOptions}
                            </Input>
                        </div>
                    </td>
                )
            });

            let leagueRow = this.state.allData.map((item, index) => {
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
                });
                let allLeagueOptions = allLeagues.map((league) => {
                    return <option key={league} value={league}>{league}</option>;
                });
                let val = this.state.player1League;
                if (index === 1) {
                    val = this.state.player2League;
                } else if (index === 2) {
                    val = this.state.player3League;
                } else if (index === 3) {
                    val = this.state.player4League;
                }
                return (
                    <td key={values[0].player_id}>
                        <div className="compare-input">
                            <Input type="select" name="league" id={"league" + (index + 1)} onChange={this.handleLeague} value={val}>
                                {allLeagueOptions}
                            </Input>
                        </div>
                    </td>
                )
            });

            let seasonRow = this.state.allData.map((item, index) => {
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
                });
                let allSeasonOptions = allSeasons.map((season) => {
                    return <option key={season} value={season}>{season}</option>;
                });
                let val = this.state.player1Season;
                if (index === 1) {
                    val = this.state.player2Season;
                } else if (index === 2) {
                    val = this.state.player3Season;
                } else if (index === 3) {
                    val = this.state.player4Season;
                }
                return (
                    <td key={values[0].player_id}>
                        <div className="compare-input">
                            <Input type="select" name="season" id={"season" + (index + 1)} onChange={this.handleSeason} value={val}>
                                {allSeasonOptions}
                            </Input>
                        </div>
                    </td>
                )
            });

            // initialize max and min of each statistic (this is to show max as green and min as red in the table)
            let ratingMax = finalData[0].rating !== null && finalData[0].rating !== undefined ? Number(finalData[0].rating) : 0;
            let ratingMin = ratingMax;
            let matchesMax = finalData[0].games.appearences !== null && finalData[0].games.appearences !== undefined ? Number(finalData[0].games.appearences) : 0;
            let matchesMin = matchesMax;
            let minutesMax = finalData[0].games.minutes_played !== null && finalData[0].games.minutes_played !== undefined ? Number(finalData[0].games.minutes_played) : 0;
            let minutesMin = minutesMax;
            let goalsMax = finalData[0].goals.total !== null && finalData[0].goals.total !== undefined ? Number(finalData[0].goals.total) : 0;
            let goalsMin = goalsMax;
            let assistsMax = finalData[0].goals.assists !== null && finalData[0].goals.assists !== undefined ? Number(finalData[0].goals.assists) : 0;
            let assistsMin = assistsMax;
            let shotsMax = finalData[0].shots.on !== null && finalData[0].shots.on !== undefined ? Number(finalData[0].shots.on) : 0;
            let shotsMin = shotsMax;
            let passesMax = finalData[0].passes.accuracy !== null && finalData[0].passes.accuracy !== undefined ? Number(finalData[0].passes.accuracy) : 0;
            let passesMin = passesMax;
            let tacklesMax = finalData[0].tackles.total !== null && finalData[0].tackles.total !== undefined ? Number(finalData[0].tackles.total) : 0;
            let tacklesMin = tacklesMax;
            let interceptionsMax = finalData[0].tackles.interceptions !== null && finalData[0].tackles.interceptions !== undefined ? Number(finalData[0].tackles.interceptions) : 0;
            let interceptionsMin = interceptionsMax;
            let duelsMax = finalData[0].duels.won !== null && finalData[0].duels.won !== undefined ? Number(finalData[0].duels.won) : 0;
            let duelsMin = duelsMax;
            let dribblesMax = finalData[0].dribbles.success !== null && finalData[0].dribbles.success !== undefined ? Number(finalData[0].dribbles.success) : 0;
            let dribblesMin = dribblesMax;
            let foulsMax = finalData[0].fouls.committed !== null && finalData[0].fouls.committed !== undefined ? Number(finalData[0].fouls.committed) : 0;
            let foulsMin = foulsMax;
            let cardsMax = finalData[0].cards.yellow !== null && finalData[0].cards.yellow !== undefined && finalData[0].cards.red !== null && finalData[0].cards.red !== undefined ? Number(finalData[0].cards.yellow) + Number(finalData[0].cards.red) : 0;
            let cardsMin = cardsMax;
            let savedMax = finalData[0].goals.saves !== null && finalData[0].goals.saves !== undefined ? Number(finalData[0].goals.saves) : 0;
            let savedMin = savedMax;
            let concededMax = finalData[0].goals.conceded !== null && finalData[0].goals.conceded !== undefined ? Number(finalData[0].goals.conceded) : 0;
            let concededMin = concededMax;

            // assign actual values for max and min of each statistic
            finalData.forEach((item) => {
                if (item.rating !== null && item.rating !== undefined && item.rating > ratingMax) {
                    ratingMax = item.rating;
                }
                if (item.rating !== null && item.rating !== undefined && item.rating < ratingMin) {
                    ratingMin = item.rating;
                }
                if (item.games.appearences !== null && item.games.appearences !== undefined && item.games.appearences > matchesMax) {
                    matchesMax = item.games.appearences;
                }
                if (item.games.appearences !== null && item.games.appearences !== undefined && item.games.appearences < matchesMin) {
                    matchesMin = item.games.appearences;
                }
                if (item.games.minutes_played !== null && item.games.minutes_played !== undefined && item.games.minutes_played > minutesMax) {
                    minutesMax = item.games.minutes_played;
                }
                if (item.games.minutes_played !== null && item.games.minutes_played !== undefined && item.games.minutes_played < minutesMin) {
                    minutesMin = item.games.minutes_played;
                }
                if (item.goals.total !== null && item.goals.total !== undefined && item.goals.total > goalsMax) {
                    goalsMax = item.goals.total;
                }
                if (item.goals.total !== null && item.goals.total !== undefined && item.goals.total < goalsMin) {
                    goalsMin = item.goals.total;
                }
                if (item.goals.assists !== null && item.goals.assists !== undefined && item.goals.assists > assistsMax) {
                    assistsMax = item.goals.assists;
                }
                if (item.goals.assists !== null && item.goals.assists !== undefined && item.goals.assists < assistsMin) {
                    assistsMin = item.goals.assists;
                }
                if (item.shots.on !== null && item.shots.on !== undefined && item.shots.on > shotsMax) {
                    shotsMax = item.shots.on;
                }
                if (item.shots.on !== null && item.shots.on !== undefined && item.shots.on < shotsMin) {
                    shotsMin = item.shots.on;
                }
                if (item.passes.accuracy !== null && item.passes.accuracy !== undefined && item.passes.accuracy > passesMax) {
                    passesMax = item.passes.accuracy;
                }
                if (item.passes.accuracy !== null && item.passes.accuracy !== undefined && item.passes.accuracy < passesMin) {
                    passesMin = item.passes.accuracy;
                }
                if (item.tackles.total !== null && item.tackles.total !== undefined && item.tackles.total > tacklesMax) {
                    tacklesMax = item.tackles.total;
                }
                if (item.tackles.total !== null && item.tackles.total !== undefined && item.tackles.total < tacklesMin) {
                    tacklesMin = item.tackles.total;
                }
                if (item.tackles.interceptions !== null && item.tackles.interceptions !== undefined && item.tackles.interceptions > interceptionsMax) {
                    interceptionsMax = item.tackles.interceptions;
                }
                if (item.tackles.interceptions !== null && item.tackles.interceptions !== undefined && item.tackles.interceptions < interceptionsMin) {
                    interceptionsMin = item.tackles.interceptions;
                }
                if (item.duels.won !== null && item.duels.won !== undefined && item.duels.won > duelsMax) {
                    duelsMax = item.duels.won;
                }
                if (item.duels.won !== null && item.duels.won !== undefined && item.duels.won < duelsMin) {
                    duelsMin = item.duels.won;
                }
                if (item.dribbles.success !== null && item.dribbles.success !== undefined && item.dribbles.success > dribblesMax) {
                    dribblesMax = item.dribbles.success;
                }
                if (item.dribbles.success !== null && item.dribbles.success !== undefined && item.dribbles.success < dribblesMin) {
                    dribblesMin = item.dribbles.success;
                }
                if (item.fouls.committed !== null && item.fouls.committed !== undefined && item.fouls.committed > foulsMax) {
                    foulsMax = item.fouls.committed;
                }
                if (item.fouls.committed !== null && item.fouls.committed !== undefined && item.fouls.committed < foulsMin) {
                    foulsMin = item.fouls.committed;
                }
                if (item.cards.yellow !== null && item.cards.yellow !== undefined && item.cards.red !== null && item.cards.red !== undefined && (item.cards.yellow + item.cards.red) > cardsMax) {
                    cardsMax = item.cards.yellow + item.cards.red;
                }
                if (item.cards.yellow !== null && item.cards.yellow !== undefined && item.cards.red !== null && item.cards.red !== undefined && (item.cards.yellow + item.cards.red) < cardsMin) {
                    cardsMin = item.cards.yellow + item.cards.red;
                }
                if (item.goals.saves !== null && item.goals.saves !== undefined && item.goals.saves > savedMax) {
                    savedMax = item.goals.saves;
                }
                if (item.goals.saves !== null && item.goals.saves !== undefined && item.goals.saves < savedMin) {
                    savedMin = item.goals.saves;
                }
                if (item.goals.conceded !== null && item.goals.conceded !== undefined && item.goals.conceded > concededMax) {
                    concededMax = item.goals.conceded;
                }
                if (item.goals.conceded !== null && item.goals.conceded !== undefined && item.goals.conceded < concededMin) {
                    concededMin = item.goals.conceded;
                }
            });

            let ratingRow = finalData.map((item) => {
                let val = 'med';
                if (item.rating !== null && item.rating !== undefined && Number(item.rating) === Number(ratingMax)) {
                    val = 'better';
                } else if (item.rating !== null && item.rating !== undefined && Number(item.rating) === Number(ratingMin)) {
                    val = 'worse';
                }
                return <td key={item.player_id} className={val}>{item.rating !== null && item.rating !== undefined ? (item.rating.length > 4 ? item.rating.substring(0, 4) : item.rating) : 0}</td>
            });

            let matchesRow = finalData.map((item) => {
                let val = 'med';
                if (item.games.appearences !== null && item.games.appearences !== undefined && Number(item.games.appearences) === Number(matchesMax)) {
                    val = 'better';
                } else if (item.games.appearences !== null && item.games.appearences !== undefined && Number(item.games.appearences) === Number(matchesMin)) {
                    val = 'worse';
                }
                return <td key={item.player_id} className={val}>{item.games.appearences}</td>
            });

            let minutesRow = finalData.map((item) => {
                let val = 'med';
                if (item.games.minutes_played !== null && item.games.minutes_played !== undefined && Number(item.games.minutes_played) === Number(minutesMax)) {
                    val = 'better';
                } else if (item.games.minutes_played !== null && item.games.minutes_played !== undefined && Number(item.games.minutes_played) === Number(minutesMin)) {
                    val = 'worse';
                }
                return <td key={item.player_id} className={val}>{item.games.minutes_played}</td>
            });

            let goalsRow = finalData.map((item) => {
                let val = 'med';
                if (item.goals.total !== null && item.goals.total !== undefined && Number(item.goals.total) === Number(goalsMax)) {
                    val = 'better';
                } else if (item.goals.total !== null && item.goals.total !== undefined && Number(item.goals.total) === Number(goalsMin)) {
                    val = 'worse';
                }
                return <td key={item.player_id} className={val}>{item.goals.total}</td>
            });

            let assistsRow = finalData.map((item) => {
                let val = 'med';
                if (item.goals.assists !== null && item.goals.assists !== undefined && Number(item.goals.assists) === Number(assistsMax)) {
                    val = 'better';
                } else if (item.goals.assists !== null && item.goals.assists !== undefined && Number(item.goals.assists) === Number(assistsMin)) {
                    val = 'worse';
                }
                return <td key={item.player_id} className={val}>{item.goals.assists}</td>
            });

            let shotsRow = finalData.map((item) => {
                let val = 'med';
                if (item.shots.on !== null && item.shots.on !== undefined && Number(item.shots.on) === Number(shotsMax)) {
                    val = 'better';
                } else if (item.shots.on !== null && item.shots.on !== undefined && Number(item.shots.on) === Number(shotsMin)) {
                    val = 'worse';
                }
                return <td key={item.player_id} className={val}>{item.shots.total + "(" + item.shots.on + ")"}</td>
            });

            let passesRow = finalData.map((item) => {
                let val = 'med';
                if (item.passes.accuracy !== null && item.passes.accuracy !== undefined && Number(item.passes.accuracy) === Number(passesMax)) {
                    val = 'better';
                } else if (item.passes.accuracy !== null && item.passes.accuracy !== undefined && Number(item.passes.accuracy) === Number(passesMin)) {
                    val = 'worse';
                }
                return <td key={item.player_id} className={val}>{item.passes.total + "(" + item.passes.accuracy + "% accuracy)"}</td>
            });

            let tacklesRow = finalData.map((item) => {
                let val = 'med';
                if (item.tackles.total !== null && item.tackles.total !== undefined && Number(item.tackles.total) === Number(tacklesMax)) {
                    val = 'better';
                } else if (item.tackles.total !== null && item.tackles.total !== undefined && Number(item.tackles.total) === Number(tacklesMin)) {
                    val = 'worse';
                }
                return <td key={item.player_id} className={val}>{item.tackles.total}</td>
            });

            let interceptionsRow = finalData.map((item) => {
                let val = 'med';
                if (item.tackles.interceptions !== null && item.tackles.interceptions !== undefined && Number(item.tackles.interceptions) === Number(interceptionsMax)) {
                    val = 'better';
                } else if (item.tackles.interceptions !== null && item.tackles.interceptions !== undefined && Number(item.tackles.interceptions) === Number(interceptionsMin)) {
                    val = 'worse';
                }
                return <td key={item.player_id} className={val}>{item.tackles.interceptions}</td>
            });

            let duelsRow = finalData.map((item) => {
                let val = 'med';
                if (item.duels.won !== null && item.duels.won !== undefined && Number(item.duels.won) === Number(duelsMax)) {
                    val = 'better';
                } else if (item.duels.won !== null && item.duels.won !== undefined && Number(item.duels.won) === Number(duelsMin)) {
                    val = 'worse';
                }
                return <td key={item.player_id} className={val}>{item.duels.total + "(" + item.duels.won + ")"}</td>
            });

            let dribblesRow = finalData.map((item) => {
                let val = 'med';
                if (item.dribbles.success !== null && item.dribbles.success !== undefined && Number(item.dribbles.success) === Number(dribblesMax)) {
                    val = 'better';
                } else if (item.dribbles.success !== null && item.dribbles.success !== undefined && Number(item.dribbles.success) === Number(dribblesMin)) {
                    val = 'worse';
                }
                return <td key={item.player_id} className={val}>{item.dribbles.attempts + "(" + item.dribbles.success + ")"}</td>
            });

            let foulsRow = finalData.map((item) => {
                let val = 'med';
                if (item.fouls.committed !== null && item.fouls.committed !== undefined && Number(item.fouls.committed) === Number(foulsMin)) {
                    val = 'better';
                } else if (item.fouls.committed !== null && item.fouls.committed !== undefined && Number(item.fouls.committed) === Number(foulsMax)) {
                    val = 'worse';
                }
                return <td key={item.player_id} className={val}>{item.fouls.committed}</td>
            });

            let cardsRow = finalData.map((item) => {
                let val = 'med';
                if (item.cards.yellow !== null && item.cards.yellow !== undefined && item.cards.red !== null && item.cards.red !== undefined && (item.cards.yellow + item.cards.red) === Number(cardsMin)) {
                    val = 'better';
                } else if (item.cards.yellow !== null && item.cards.yellow !== undefined && item.cards.red !== null && item.cards.red !== undefined && (item.cards.yellow + item.cards.red) === Number(cardsMax)) {
                    val = 'worse';
                }
                return <td key={item.player_id} className={val}>{(item.cards.yellow + item.cards.red) + "(" + item.cards.red + ")"}</td>
            });

            let savedRow = finalData.map((item) => {
                let val = 'med';
                if (item.goals.saves !== null && item.goals.saves !== undefined && item.goals.saves === Number(savedMax)) {
                    val = 'better';
                } else if (item.goals.saves !== null && item.goals.saves !== undefined && item.goals.saves === Number(savedMin)) {
                    val = 'worse';
                }
                return <td key={item.player_id} className={val}>{item.goals.saves}</td>
            });

            let concededRow = finalData.map((item) => {
                let val = 'med';
                if (item.goals.conceded !== null && item.goals.conceded !== undefined && item.goals.conceded === Number(concededMin)) {
                    val = 'better';
                } else if (item.goals.conceded !== null && item.goals.conceded !== undefined && item.goals.conceded === Number(concededMax)) {
                    val = 'worse';
                }
                return <td key={item.player_id} className={val}>{item.goals.conceded}</td>
            });

            return (
                <div>
                    <h1>Compare Players</h1>
                    <div className="player-table col-11 col-xl-10">
                        <table className="table">
                            <TableHeader playersToCompare={this.state.allData} />
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
                                <tr>
                                    <td className="field">Season Rating:</td>
                                    {ratingRow}
                                </tr>
                                <tr>
                                    <td className="field">Matches Played:</td>
                                    {matchesRow}
                                </tr>
                                <tr>
                                    <td className="field">Minutes Played:</td>
                                    {minutesRow}
                                </tr>
                                <tr>
                                    <td className="field">Goals Scored:</td>
                                    {goalsRow}
                                </tr>
                                <tr>
                                    <td className="field">Assists:</td>
                                    {assistsRow}
                                </tr>
                                <tr>
                                    <td className="field">Shots(On Target):</td>
                                    {shotsRow}
                                </tr>
                                <tr>
                                    <td className="field">Passes:</td>
                                    {passesRow}
                                </tr>
                                <tr>
                                    <td className="field">Tackles:</td>
                                    {tacklesRow}
                                </tr>
                                <tr>
                                    <td className="field">Interceptions:</td>
                                    {interceptionsRow}
                                </tr>
                                <tr>
                                    <td className="field">Duels(Won):</td>
                                    {duelsRow}
                                </tr>
                                <tr>
                                    <td className="field">Dribbles(Success):</td>
                                    {dribblesRow}
                                </tr>
                                <tr>
                                    <td className="field">Fouls:</td>
                                    {foulsRow}
                                </tr>
                                <tr>
                                    <td className="field">Cards(Red):</td>
                                    {cardsRow}
                                </tr>
                                <tr>
                                    <td className="field">Goals Saved:</td>
                                    {savedRow}
                                </tr>
                                <tr>
                                    <td className="field">Goals Conceded::</td>
                                    {concededRow}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        } else {
            return null;
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