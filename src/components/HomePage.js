import React, { Component } from 'react';
import SearchForm from './SearchForm';
import * as d3 from 'd3';
import { Badge, Form, FormGroup, Label, Input, Modal, ModalBody, ModalFooter, Card, CardImg, CardHeader, CardBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faHeart } from '@fortawesome/free-solid-svg-icons';
import 'd3';
import firebase from 'firebase/app';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allPlayerData: [],
            filteredPlayerData: [],
            numEntries: 10,
            entries: 10,
            start: 0
        };
    }

    componentDidMount() {
        // load csv data
        d3.csv("2021_data.csv").then((data) => {
            this.setState({
                allPlayerData: data,
                filteredPlayerData: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }

    // filters players based on search filters
    filterPlayers = (info) => {
        let filteredArray = this.state.allPlayerData;
        if (info.name !== '') {
            let searchName = info.name.toLowerCase();
            let words = searchName.split(" ");
            filteredArray = filteredArray.filter((item) => {
                let name = item.name;
                name = this.cleanName(name);

                let containsAllWords = true;
                for (let i = 0; i < words.length; i++) {
                    if (!name.toLowerCase().includes(words[i])) {
                        return false;
                    }
                }
                return containsAllWords;
            });
        }
        if (info.nationality !== 'DEFAULT') {
            filteredArray = filteredArray.filter((item) => {
                return item.nationality === info.nationality;
            });
        }
        if (info.club !== 'DEFAULT') {
            filteredArray = filteredArray.filter((item) => {
                return item.club === info.club;
            });
        }
        if (info.position !== 'DEFAULT') {
            filteredArray = filteredArray.filter((item) => {
                return item.position.includes(info.position);
            });
        }
        if (info.foot !== 'DEFAULT') {
            filteredArray = filteredArray.filter(function (item) {
                return item.preferred_foot === info.foot;
            });
        }
        if (info.age !== "") {
            let d = new Date();
            let n = Number(d.getFullYear());
            filteredArray = filteredArray.filter(function (item) {
                return n - Number(item.dob.substring(item.dob.length - 4, item.dob.length)) === Number(info.age);
            });
        }
        this.setState({ filteredPlayerData: filteredArray, numEntries: 10, start: 0 });
    }

    // replace weird characters
    cleanName = (name) => {
        name = name.replace(/á/gi, "a");
        name = name.replace(/à/gi, "a");
        name = name.replace(/ã/gi, "a");
        name = name.replace(/â/gi, "a");
        name = name.replace(/ä/gi, "a");
        name = name.replace(/ć/gi, "c");
        name = name.replace(/ç/gi, "c");
        name = name.replace(/č/gi, "c");
        name = name.replace(/é/gi, "e");
        name = name.replace(/è/gi, "e");
        name = name.replace(/ê/gi, "e");
        name = name.replace(/ę/gi, "e");
        name = name.replace(/ë/gi, "e");
        name = name.replace(/í/gi, "i");
        name = name.replace(/î/gi, "i");
        name = name.replace(/ï/gi, "i");
        name = name.replace(/ñ/gi, "n");
        name = name.replace(/ó/gi, "o");
        name = name.replace(/ô/gi, "o");
        name = name.replace(/ö/gi, "o");
        name = name.replace(/š/gi, "s");
        name = name.replace(/ü/gi, "u");
        name = name.replace(/ú/gi, "u");
        name = name.replace(/ú/gi, "u");
        name = name.replace(/ù/gi, "u");
        name = name.replace('\'', '%27');
        return name;
    }

    handleEntries = (event) => {
        let elem = event.target;
        let value = elem.value;
        if (value === "All") {
            this.setState({ numEntries: this.state.filteredPlayerData.length, entries: value });
        } else {
            this.setState({ numEntries: value, entries: value });
        }
    }

    handleNext = (event) => {
        event.preventDefault();
        this.setState({ start: Number(this.state.start) + Number(this.state.numEntries) });
    }

    handlePrev = (event) => {
        event.preventDefault();
        this.setState({ start: Number(this.state.start) - Number(this.state.numEntries) });
    }

    handleTop = (event) => {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    handleReset = () => {
        this.setState({ filteredPlayerData: this.state.allPlayerData, numEntries: 10, entries: 10, start: 0 });
    }

    render() {
        const nextDisable = Number(this.state.start) + Number(this.state.numEntries) >= Number(this.state.filteredPlayerData.length);
        const prevDisable = Number(this.state.start) - Number(this.state.numEntries) < 0;

        return (
            <main id="home-main">
                <div className="row">
                    <div className="col-lg-4 col-xl-3 collapse show" id="search-feature">
                        <p id="searchtext">Enter values here to search for a player!</p>
                        <SearchForm data={this.state.allPlayerData} callback={this.filterPlayers} reset={this.handleReset} />
                    </div>
                    <div className="col-lg-8 col-xl-9 results">
                        <div className="row">
                            <div className="col">
                                <p id="searchresults">Search Results:</p>
                            </div>
                            <div className="col entries">
                                <Form>
                                    <FormGroup row>
                                        <div className="col-sm-7 col-5" id="limit-text">
                                            <Label for="entires">Limit Entries Per Page:</Label>
                                        </div>
                                        <div className="col-sm-5 col-7">
                                            <Input type="select" name="entires" id="entries" onChange={this.handleEntries} value={this.state.entries}>
                                                <option value="10">10 Entries</option>
                                                <option value="25">25 Entries</option>
                                                <option value="50">50 Entries</option>
                                                <option value="75">75 Entries</option>
                                                <option value="100">100 Entries</option>
                                                <option value="All">All</option>
                                            </Input>
                                        </div>
                                    </FormGroup>
                                </Form>
                            </div>
                        </div>
                        <p id="info">Click on any row of the table to view additional inforamtion about that player!</p>
                        <div className="player-table">
                            <ResultTable rowData={this.state.filteredPlayerData} entries={this.state.numEntries} begin={this.state.start}
                                signedIn={this.props.signedIn} callback1={this.props.callback} checkedPlayer={this.props.checkedPlayer}
                                checkedIds={this.props.checkedIds} statsArr={this.props.statsArr} user={this.props.user}
                                firebaseUserData={this.props.firebaseUserData} firebasePlayerData={this.props.firebasePlayerData}
                                cleanName={this.cleanName} />
                        </div>
                        <Form id="top-btn"><button className="btn" onClick={this.handleTop}>Back to Top</button></Form>
                        <Form className="scroll-buttons">
                            <button className="btn" id="prev-btn" onClick={this.handlePrev} disabled={prevDisable}>{"Prev "}{this.state.numEntries === this.state.filteredPlayerData.length ? null : this.state.numEntries}</button>
                            <button className="btn" onClick={this.handleNext} disabled={nextDisable}>{"Next "}{this.state.numEntries === this.state.filteredPlayerData.length ? null : this.state.numEntries}</button>
                        </Form>
                    </div>
                </div>
            </main>
        );
    }
}

class ResultTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            requestFailed: false,
            modalOpen: false,
            playerStat: [],
            picture: '',
            playerId: '',
            showToggle1: false,
            showToggle2: false,
            maxPlayers: false,
            removed: false,
            apiKey: ""
        };
    }

    componentDidMount() {
        d3.csv("APIkey.csv").then((data) => {
            this.setState({apiKey: data.columns[0]});
        })
        .catch((error) => {
            console.log(error);
        });
    }

    // creates badges based on player's position
    playerPosition = (position) => {
        let posArr = position.split("|");
        let allBadges = posArr.map((pos) => {
            if (pos === "GK") {
                return <Badge id="gk-badge" key={pos}>{pos}</Badge>;
            } else if (pos.includes("M")) {
                return <Badge id="mid-badge" key={pos}>{pos}</Badge>;
            } else if (pos.includes("B")) {
                return <Badge id="def-badge" key={pos}>{pos}</Badge>;
            } else {
                return <Badge id="striker-badge" key={pos}>{pos}</Badge>;
            }
        });
        return allBadges;
    }

    // finds a player using an api
    async findPlayer(name, dob, nationality, image, id, isCompare) {

        if (isCompare && !this.props.checkedIds.includes(id) && this.props.statsArr.length >= 4) {
            // new player added to compare but max limit of 4 reached
            this.setState({ maxPlayers: true, modalOpen: true });
        } else {
            if (!isCompare) {
                // player row has been clicked
                // modal needed to show player stats
                this.setState({ modalOpen: true, picture: image, playerId: id });
            } else if (!this.props.checkedIds.includes(id)) {
                // add to compare clicked (within limit)
                // model not required because player is to be compared
                this.setState({ playerId: id });
            }

            if (!isCompare || !this.props.checkedIds.includes(id)) {
                // either player row clicked or new player added to compare (within limit)
                if (this.props.firebasePlayerData != null && this.props.firebasePlayerData[id] !== undefined ) {
                    // firebase data stores data for this player, so just update state and stop spinners
                    if (isCompare) {
                        this.props.checkedPlayer({ [id]: this.props.firebasePlayerData[id] });
                    } else {
                        this.setState({ playerStat: this.props.firebasePlayerData[id] });
                    }
                } else {
                    // firebase data does not store this player, so will have to call the api to get data
                    if (!isCompare) {
                        this.toggleSpinner1();
                    } else {
                        this.toggleSpinner2();
                    }

                    name = this.props.cleanName(name);

                    if (dob.length === 9) {
                        if (dob.charAt(1) === '/') {
                            dob = "0" + dob;
                        } else {
                            dob = dob.substring(0, 3) + '0' + dob.substring(3);
                        }
                    } else if (dob.length === 8) {
                        dob = "0" + dob;
                        dob = dob.substring(0, 3) + '0' + dob.substring(3);
                    }

                    let playerFound = false;
                    if (name.length > 3) {
                        // search with full name
                        playerFound = await this.searchAPI(name, dob, nationality, id, isCompare);
                        if (!playerFound) {
                            let splitArr = name.split(" ");
                            if (splitArr.length > 1) {
                                if (splitArr[0].length > 3) {
                                    // try searching again with just first name
                                    playerFound = await this.searchAPI(splitArr[0], dob, nationality, id, isCompare);
                                }
                                if ((splitArr[0].length <= 3 || !playerFound) && (splitArr[splitArr.length - 1].length > 3)) {
                                    // try searching with just last name
                                    playerFound = await this.searchAPI(splitArr[splitArr.length - 1], dob, nationality, id, isCompare);
                                }
                            }
                        }
                    }
                    if (!playerFound) {
                        // couldn't find the player after all the tries, so we show an error message
                        if (isCompare) {
                            // modal required to show error message
                            this.setState({ requestFailed: true, modalOpen: true });
                            // stop compare spinner
                            this.toggleSpinner2();
                        } else {
                            // modal already open (above)
                            this.setState({ requestFailed: true });
                            // stop first spinner
                            this.toggleSpinner1();
                        }
                    }
                }
            } else {
                // unchecking the player from add to compare
                this.props.checkedPlayer({ [id]: null });
            }
        }
    }

    // call the search endpoint of the api to search for a player
    async searchAPI(name, dob, nationality, id, isCompare) {
        try {
            let uriTemplate = "https://api-football-v1.p.rapidapi.com/v2/players/search/{name}";
            let uri = uriTemplate.replace("{name}", name);
            let response = await fetch(uri, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                    "x-rapidapi-key": this.state.apiKey
                }
            })
            let data = await response.json();
            let players = this.dobFilter(data.api.players, dob, nationality);
            if (players.length > 0) {
                this.getPlayerStats(players[0], id, isCompare);
                return true;
            } else {
                return false;
            }
        } catch {
            if (!isCompare) {
                this.toggleSpinner1();
            } else {
                this.toggleSpinner2();
            }
            this.setState({ requestFailed: true });
            return true;
        }
    }

    // filter players based on their DOB and nationality
    dobFilter = (players, dob, nationality) => {
        players = players.filter((item) => {
            let itemDob = item.birth_date;
            if (itemDob !== null) {
                itemDob = itemDob.substring(3, 6) + itemDob.substring(0, 3) + itemDob.substring(6, 10);
            }
            return dob === itemDob && item.nationality === nationality;
        })
        return players;
    }

    // gets the player's statistics
    getPlayerStats = (player, id, isCompare) => {
        let uriTemplate = "https://api-football-v1.p.rapidapi.com/v2/players/player/{id}";
        let uri = uriTemplate.replace("{id}", player.player_id);
        fetch(uri, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                "x-rapidapi-key": this.state.apiKey
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            // add player data to firebase and update state
            firebase.database().ref('playerData/' + id).set(data.api.players);
            if (isCompare) {
                this.props.checkedPlayer({ [id]: data.api.players });
            } else {
                this.setState({ playerStat: data.api.players });
            }
        })
        .catch(() => {
            this.setState({ requestFailed: true });
        })
        .then(() => {
            if (!isCompare) {
                this.toggleSpinner1();
            } else {
                this.toggleSpinner2();
            }
        });
    }

    toggleModal = () => {
        this.setState({ modalOpen: false, playerStat: [], requestFailed: false })
    }

    toggleSpinner1 = () => {
        this.setState({ showToggle1: !this.state.showToggle1 });
    }

    toggleSpinner2 = () => {
        this.setState({ showToggle2: !this.state.showToggle2 });
    }

    handleHeart = (id, img, name, country, club, pos) => {
        if (!this.props.signedIn) {
            this.props.callback1();
        } else {
            if (this.likedIds.includes(id)) {
                // unlike player
                firebase.database().ref('UserLikedPlayers/' + this.props.user.uid + '/' + id).remove();
            } else {
                // update database to add liked player
                let player = {
                        image: img,
                        name: name,
                        country: country,
                        club: club,
                        positions: pos
                }
                firebase.database().ref('UserLikedPlayers/' + this.props.user.uid + '/' + id).set(player);
            }
        }
    }

    render() {
        if (Object.keys(this.props.firebasePlayerData).length > 0) {

            let modal = <div></div>;
            if (this.state.requestFailed) {
                modal = (
                    <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal}>
                        <ModalBody>
                            Sorry! Stats for this player are currently not available.
                        </ModalBody>
                        <ModalFooter>
                            <button className="btn" onClick={this.toggleModal}>Close</button>
                        </ModalFooter>
                    </Modal>
                )
            }
            if (this.state.playerStat.length !== 0) {
                modal = (
                    <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal}>
                        <ModalBody>
                            <PlayerCard stats={this.state.playerStat} picture={this.state.picture} />
                        </ModalBody>
                        <ModalFooter>
                            <button className="btn" onClick={this.toggleModal}>Close</button>
                        </ModalFooter>
                    </Modal>
                )
            }
            if (this.state.maxPlayers) {
                modal = (
                    <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal}>
                        <ModalBody>
                            You can only add a maximum of 4 players at a time!
                        </ModalBody>
                        <ModalFooter>
                            <button className="btn" onClick={this.toggleModal}>Close</button>
                        </ModalFooter>
                    </Modal>
                )
            }

            this.likedIds = [];
            this.props.firebaseUserData.forEach((item) => {
                this.likedIds.push(item.player_id);
            });

            let allRows = this.props.rowData.map((item) => {
                let img = "https://futhead.cursecdn.com/static/img/20/players/" + item.player_id + ".png";
                return (
                    <tr className="data-row" key={item.player_id}>
                        <th className="change-pointer" onClick={() => this.findPlayer(item.name, item.dob, item.nationality, img, item.player_id, false)}>{this.props.rowData.indexOf(item) + 1}</th>
                        <td className="change-pointer" onClick={() => this.findPlayer(item.name, item.dob, item.nationality, img, item.player_id, false)}><img src={img} alt={item.name} className="player-img" /></td>
                        <td className="change-pointer" onClick={() => this.findPlayer(item.name, item.dob, item.nationality, img, item.player_id, false)}>{item.name + "  "}{this.state.showToggle1 && this.state.playerId === item.player_id ? <FontAwesomeIcon icon={faSpinner} className=" fa-spin fa-lg" /> : null}</td>
                        <td className="change-pointer" onClick={() => this.findPlayer(item.name, item.dob, item.nationality, img, item.player_id, false)}>{item.nationality}</td>
                        <td className="change-pointer" onClick={() => this.findPlayer(item.name, item.dob, item.nationality, img, item.player_id, false)}>{item.club}</td>
                        <td className="change-pointer" onClick={() => this.findPlayer(item.name, item.dob, item.nationality, img, item.player_id, false)}>{this.playerPosition(item.position)}</td>
                        <td>
                            <div className="features"><input type="checkbox" checked={this.props.checkedIds.includes(item.player_id)} onChange={() => this.findPlayer(item.name, item.dob, item.nationality, img, item.player_id, true)} /> Add to Compare {this.state.showToggle2 && this.state.playerId === item.player_id ? <FontAwesomeIcon icon={faSpinner} className=" fa-spin fa-lg" /> : null}</div>
                            <div className="features"><FontAwesomeIcon icon={faHeart} role="button" className={this.likedIds.includes(item.player_id) ? "fa-lg liked change-pointer" : "fa-lg not-liked change-pointer"} onClick={() => this.handleHeart(item.player_id, img, item.name, item.nationality, item.club, item.position)} /> Mark Favorite</div>
                        </td>
                    </tr>
                );
            });

            return (
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Image</th>
                                <th scope="col">Name</th>
                                <th scope="col">Country</th>
                                <th scope="col">Club</th>
                                <th scope="col">Preferred Position(s)</th>
                                <th scope="col">Features</th>
                            </tr>
                        </thead>
                        <tbody id="table-body">
                            {allRows.slice(this.props.begin, Number(this.props.begin) + Number(this.props.entries))}
                        </tbody>
                    </table>
                    {modal}
                </div>
            );
        } else {
            return (
                <div id="icon">
                    <FontAwesomeIcon icon={faSpinner} className=" fa-spin fa-lg" />
                </div>
            );
        }
    }
}

class PlayerCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allData: this.props.stats,
            teamFilteredData: [],
            leagueFilteredData: [],
            seasonFilteredData: [],
            team: this.props.stats[0].team_name,
            league: this.props.stats[0].league,
            season: this.props.stats[0].season
        };
    }

    componentDidMount() {
        let teamData = this.state.allData.filter((item) => {
            return item.team_name === this.state.team;
        });
        let leagueData = teamData.filter((item) => {
            return item.league === this.state.league;
        });
        let seasonData = leagueData.filter((item) => {
            return item.season === this.state.season;
        })
        this.setState({ teamFilteredData: teamData, leagueFilteredData: leagueData, seasonFilteredData: seasonData });
    }

    //handle team change
    handleTeam = (event) => {
        let elem = event.target;
        let value = elem.value;

        this.setState((currState) => {
            let teamData = currState.allData.filter((item) => {
                return item.team_name === value;
            })
            let leagueData = teamData.filter((item) => {
                return item.league === teamData[0].league;
            });
            let seasonData = leagueData.filter((item) => {
                return item.season === leagueData[0].season;
            })
            return {
                teamFilteredData: teamData, leagueFilteredData: leagueData, seasonFilteredData: seasonData,
                team: value, league: teamData[0].league, season: leagueData[0].season
            };
        });
    }

    //handle league change
    handleLeague = (event) => {
        let elem = event.target;
        let value = elem.value;

        this.setState((currState) => {
            let leagueData = currState.teamFilteredData.filter((item) => {
                return item.league === value;
            })
            let seasonData = leagueData.filter((item) => {
                return item.season === leagueData[0].season;
            })
            return { leagueFilteredData: leagueData, seasonFilteredData: seasonData, league: value, season: leagueData[0].season };
        });
    }

    // handle season change
    handleSeason = (event) => {
        let elem = event.target;
        let value = elem.value;

        this.setState((currState) => {
            let seasonData = currState.leagueFilteredData.filter((item) => {
                return item.season === value;
            })
            return { seasonFilteredData: seasonData, season: value }
        });
    }

    render() {

        // get player's teams
        let allTeams = [];
        this.state.allData.forEach(function (item) {
            if (!allTeams.includes(item.team_name) && item.team_name !== null && item.team_name !== undefined) {
                allTeams.push(item.team_name);
            }
        })
        let allTeamOptions = allTeams.map((item) => {
            return <option key={item} value={item}>{item}</option>;
        })

        // get player's leagues
        let allLeagues = [];
        this.state.teamFilteredData.forEach(function (item) {
            if (!allLeagues.includes(item.league) && item.league !== null && item.league !== undefined) {
                allLeagues.push(item.league);
            }
        })
        let allLeagueOptions = allLeagues.map((item) => {
            return <option key={item} value={item}>{item}</option>;
        })

        // get player's seasons
        let allSeasons = [];
        this.state.leagueFilteredData.forEach(function (item) {
            if (!allSeasons.includes(item.season) && item.season !== null && item.season !== undefined) {
                allSeasons.push(item.season);
            }
        })
        let allSeasonOptions = allSeasons.map((item) => {
            return <option key={item} value={item}>{item}</option>;
        })

        // data after all values of the card form is selected
        let data = <div></div>;
        if (this.state.seasonFilteredData.length !== 0) {
            data = (
                <div>
                    <div className="row">
                        <div className="col field">Season Rating:</div>
                        <div className="col">{this.state.seasonFilteredData[0].rating !== null && this.state.seasonFilteredData[0].rating !== undefined ? (this.state.seasonFilteredData[0].rating.length > 4 ? this.state.seasonFilteredData[0].rating.substring(0, 4) : this.state.seasonFilteredData[0].rating) : 0}</div>
                    </div>
                    <div className="row">
                        <div className="col field">Matches played:</div>
                        <div className="col">{this.state.seasonFilteredData[0].games.appearences}</div>
                    </div>
                    <div className="row">
                        <div className="col field">Minutes played:</div>
                        <div className="col">{this.state.seasonFilteredData[0].games.minutes_played}</div>
                    </div>
                    <div className="row">
                        <div className="col field">Goals Scored:</div>
                        <div className="col">{this.state.seasonFilteredData[0].goals.total}</div>
                    </div>
                    <div className="row">
                        <div className="col field">Assists:</div>
                        <div className="col">{this.state.seasonFilteredData[0].goals.assists}</div>
                    </div>
                    <div className="row">
                        <div className="col field">Shots(On Target):</div>
                        <div className="col">{this.state.seasonFilteredData[0].shots.total + "(" + this.state.seasonFilteredData[0].shots.on + ")"}</div>
                    </div>
                    <div className="row">
                        <div className="col field">Passes:</div>
                        <div className="col">{this.state.seasonFilteredData[0].passes.total + "(" + this.state.seasonFilteredData[0].passes.accuracy + "% accuracy)"}</div>
                    </div>
                    <div className="row">
                        <div className="col field">Tackles:</div>
                        <div className="col">{this.state.seasonFilteredData[0].tackles.total}</div>
                    </div>
                    <div className="row">
                        <div className="col field">Interceptions:</div>
                        <div className="col">{this.state.seasonFilteredData[0].tackles.interceptions}</div>
                    </div>
                    <div className="row">
                        <div className="col field">Duels(Won):</div>
                        <div className="col">{this.state.seasonFilteredData[0].duels.total + "(" + this.state.seasonFilteredData[0].duels.won + ")"}</div>
                    </div>
                    <div className="row">
                        <div className="col field">Dribbles(Success):</div>
                        <div className="col">{this.state.seasonFilteredData[0].dribbles.attempts + "(" + this.state.seasonFilteredData[0].dribbles.success + ")"}</div>
                    </div>
                    <div className="row">
                        <div className="col field">Fouls:</div>
                        <div className="col">{this.state.seasonFilteredData[0].fouls.committed}</div>
                    </div>
                    <div className="row">
                        <div className="col field">Cards(Yellow/Red):</div>
                        <div className="col">{this.state.seasonFilteredData[0].cards.yellow + "/" + this.state.seasonFilteredData[0].cards.red}</div>
                    </div>
                    <div className="row">
                        <div className="col field">Goals Saved:</div>
                        <div className="col">{this.state.seasonFilteredData[0].goals.saves}</div>
                    </div>
                    <div className="row">
                        <div className="col field">Goals Conceded:</div>
                        <div className="col">{this.state.seasonFilteredData[0].goals.conceded}</div>
                    </div>
                </div>
            );
        }

        return (
            <Card>
                <div id="card-img">
                    <CardImg top width="100%" src={this.props.picture} alt={this.state.allData[0].player_name} />
                </div>
                <CardHeader>{this.state.allData[0].player_name}</CardHeader>
                <CardBody>
                    <div className="row">
                        <div className="col field">Age:</div>
                        <div className="col">{this.state.allData[0].age}</div>
                    </div>
                    <div className="row">
                        <div className="col field">Birth Date:</div>
                        <div className="col">{this.state.allData[0].birth_date}</div>
                    </div>
                    <div className="row">
                        <div className="col field">Nationality:</div>
                        <div className="col">{this.state.allData[0].nationality}</div>
                    </div>
                    <div className="row">
                        <div className="col field">Position:</div>
                        <div className="col">{this.state.allData[0].position}</div>
                    </div>
                    <div className="row">
                        <div className="col field">Height:</div>
                        <div className="col">{this.state.allData[0].height}</div>
                    </div>
                    <div className="row">
                        <div className="col field">Weight:</div>
                        <div className="col">{this.state.allData[0].weight}</div>
                    </div>
                    <div className="row input-row">
                        <Label className="col field" for="team">Team:</Label>
                        <Input className="col" type="select" name="team" id="team" onChange={this.handleTeam} value={this.state.team}>
                            {allTeamOptions}
                        </Input>
                    </div>
                    <div className="row input-row">
                        <Label className="col field" for="league">League:</Label>
                        <Input className="col" type="select" name="league" id="league" onChange={this.handleLeague} value={this.state.league}>
                            {allLeagueOptions}
                        </Input>
                    </div>
                    <div className="row input-row">
                        <Label className="col field" for="season">Season:</Label>
                        <Input className="col" type="select" name="season" id="season" onChange={this.handleSeason} value={this.state.season}>
                            {allSeasonOptions}
                        </Input>
                    </div>
                    {data}
                </CardBody>
            </Card>

        )
    }
}

export default HomePage;
