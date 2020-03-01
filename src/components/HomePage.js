import React, { Component } from 'react';
import SearchForm from './SearchForm';
import * as d3 from 'd3';
import { Badge, Form, FormGroup, Label, Input } from 'reactstrap';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allPlayerData: [],
            filteredPlayerData: [],
            numEntries: 10
        };
    }

    componentDidMount() {
        d3.csv("data.csv").then((data) => {
            this.setState({
                allPlayerData: data,
                filteredPlayerData: data
            })
        });
    }

    filterPlayers = (info) => {
        let filteredArray = this.state.allPlayerData;
        if (info.name !== '') {
            let searchName = info.name.toLowerCase();
            let words = searchName.split(" ");
            filteredArray = filteredArray.filter((item) => {
                let containsAllWords = false;
                words.forEach( (word) => {
                    if (item.long_name.toLowerCase().includes(word)) {
                        containsAllWords = true;
                    }
                })
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
                return item.player_positions.includes(info.position);
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
        //console.log(filteredArray);
        this.setState({filteredPlayerData: filteredArray});
    }

    handleEntries = (event) => {
        let elem = event.target;
        let value = elem.value;
        if (value === "All") {
            this.setState({numEntries:this.state.filteredPlayerData.length});
        } else {
            this.setState({numEntries: value});
        }
    }

    render() {
        //console.log(this.state.numEntries);
        return (
            <main id="top">
                <div className="row">
                    <div className="col-lg-4 col-xl-3 collapse show" id="search-feature">
                        <p id="searchtext">Enter values here to search for a player!</p>
                        <SearchForm data={this.state.allPlayerData} callback={this.filterPlayers} />
                    </div>
                    <div className="col-lg-8 col-xl-9 results">
                        <div className="row">
                            <div className="col">
                                <p id="searchresults">Search Results:</p>
                                <p>Click on a player's name to view additional inforamtion about that player!</p>
                            </div>
                            <div className="col entries">
                                <Form>
                                    <FormGroup row>
                                        <Label className="col-8" for="entires">Limit Entries Per Page:</Label>
                                        <div className="col-4">
                                            <Input type="select" name="entires" id="entries" onChange={this.handleEntries}>
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
                        <div className="result-table">
                            <ResultTable rowData={this.state.filteredPlayerData} entries={this.state.numEntries} />
                        </div>
                        <Form className="flex-container">
                            <button className="btn">{"Next " + this.state.numEntries}</button>
                        </Form>
                    </div>
                </div>
            </main>
        );
    }
}

class ResultTable extends Component {

    playerPosition = (position) => {
        let posArr = position.split(", ");
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

    render() {

        //console.log(this.props.rowData);
        let allRows = this.props.rowData.map((item) => {
            return (
                <tr key={item.short_name}>
                    <th>{this.props.rowData.indexOf(item) + 1}</th>
                    <td><img src={"https://cdn.sofifa.org/players/10/20/" + item.sofifa_id + ".png"} alt={item.short_name} className="player-img" /></td>
                    <td>{item.long_name}</td>
                    <td>{item.nationality}</td>
                    <td>{item.club}</td>
                    <td>{this.playerPosition(item.player_positions)}</td>
                </tr>
            );
        })

        return (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Country</th>
                        <th scope="col">Club</th>
                        <th scope="col">Position(s)</th>
                    </tr>
                </thead>
                <tbody id="table-body">
                    {allRows.slice(0, this.props.entries)}
                </tbody>
            </table>
        );
    }
}

export default HomePage;