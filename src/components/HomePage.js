import React, { Component } from 'react';
import SearchForm from './SearchForm';
import * as d3 from 'd3';
import { Badge } from 'reactstrap';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        d3.csv("data.csv").then( (playerdata) => {
            this.setState({data: playerdata})
        });
    }

    render() {
        return (
            <div>
            <main id="top">
                <div className="row">
                    <div className="col-lg-4 col-xl-3 collapse show" id="search-feature">
                        <p id="searchtext">Enter values here to search for a player!</p>
                        <SearchForm data={this.state.data} />
                    </div>
                    <div className="col-lg-8 col-xl-9 results">
                        <div className="row">
                            <div className="col">
                                <p id="searchresults">Search Results:</p>
                                <p>Click on a player's name to view additional inforamtion about that player!</p>
                            </div>
                            <div className="col entries">
                                <label>Limit Entries Per Page:</label>
                                <select id="entries">
                                    <option value="10">10 Entries</option>
                                    <option value="25">25 Entries</option>
                                    <option value="50">50 Entries</option>
                                    <option value="75">75 Entries</option>
                                    <option value="100">100 Entries</option>
                                    <option value="All">All</option>
                                </select>
                            </div>
                        </div>
                        <div className="result-table">
                            <ResultTable rowData={this.state.data} />
                        </div>
                    </div>
                </div>
            </main>
            </div>
        );
    }
}

class ResultTable extends Component {
    
    playerPosition = (position) => {
        let posArr = position.split(", ");
        let allBadges = posArr.map( (pos) => {
            if (pos == "GK") {
                return <Badge id="gk-badge">{pos}</Badge>;
              } else if (pos.includes("M")) {
                return <Badge id="mid-badge">{pos}</Badge>;
              } else if (pos.includes("B")) {
                return <Badge id="def-badge">{pos}</Badge>;
              } else {
                return <Badge id="striker-badge">{pos}</Badge>;
              }
        });
        return allBadges;
    }
    
    render() {

        //console.log(this.props.rowData);
        let allRows = this.props.rowData.map( (item) => {
            return (
                <tr>
                    <th>{this.props.rowData.indexOf(item) + 1}</th>
                    <td><img src={"https://cdn.sofifa.org/players/10/20/" + item.sofifa_id + ".png"} alt="item.short_name" className="player-img" /></td>
                    <td>{item.short_name}</td>
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
                    {allRows.slice(0, 10)}
                </tbody>
            </table>
        );
    }
}

export default HomePage;