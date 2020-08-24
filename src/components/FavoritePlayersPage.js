import React, { Component } from 'react';
import { Alert, Badge } from 'reactstrap';

class FavoritePlayersPage extends Component {
    render() {

        let content = <FavoriteTable user={this.props.user} firebaseUserData={this.props.firebaseUserData} />;
        if (this.props.user === null) {
            content = <Alert color="warning" className="error-message">Please sign in to add and view your favorite players!</Alert>;
        }

        return (
            <main>
                {content}
            </main>
        );
    }
}

class FavoriteTable extends Component {

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

    render() {

        if (this.props.firebaseUserData.length === 0) {
            return <Alert color="warning" className="error-message">No players to view! You can mark players favorite from the home page.</Alert>;
        } else {

            let rows = this.props.firebaseUserData.map((item, index) => {
                let key = item.player_id;
                return (
                    <tr key={key}>
                        <td>{index + 1}</td>
                        <td><img src={item.image} alt={item.name} /></td>
                        <td>{item.name}</td>
                        <td>{item.country}</td>
                        <td>{item.club}</td>
                        <td>{this.playerPosition(item.positions)}</td>
                    </tr>
                );
            });

            return (
                <div>
                    <h1>Here is your list of favorite players</h1>
                    <div className="player-table col-11 col-xl-10">
                        <table className="table">
                            <FavouriteTableHead cols={["#", "Image", "Name", "Country", "Club", "Preffered Position(s)"]} />
                            <tbody>
                                {rows}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }
    }
}

class FavouriteTableHead extends Component {
    render() {

        let thArray = this.props.cols.map((colNameString) => {
            return <th scope="col" key={colNameString}>{colNameString}</th>
        })

        let thead = (
            <thead>
                <tr>
                    {thArray}
                </tr>
            </thead>
        )
        return (thead);
    }
}

export default FavoritePlayersPage;