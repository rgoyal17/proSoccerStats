import React, { Component } from 'react';
 
 
class FavoritePlayersPage extends Component {
    render() {
        return (
            <main>
                {/*only show when player is not signed in*/}
                {/* <p className="headings">Please sign in to see your favourite players</p>  */}
                <p className="headings">Here is your list of favourite players</p>
                <div>
                    <table className="table col-lg-10 col-xl-9 compare-table">
                        <FavouriteTableHead cols={["#", "Image", "Name", "Country", "Club", "Preffered Position(s)", "Date Added"]}/>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td><img src={"https://cdn.sofifa.org/players/10/20/158023.png"} alt="Player1" /></td>
                                <td>Lionel Andres Messi Cuccittini</td>
                                <td>Argentina</td>
                                <td>FC Barcelona</td>
                                <td>
                                    {/* Add badges here. Same as is done in HomePage */}
                                    <span class="badge striker-badge">RW</span>
                                    <span class="badge striker-badge">CF</span>
                                    <span class="badge striker-badge">ST</span>
                                </td>
                                <td>Added on 13th March 2019</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td><img src={"https://cdn.sofifa.org/players/10/20/20801.png"} alt="Player2" /></td>
                                <td>Cristiano Ronaldo dos Santos Aveiro</td>
                                <td>Portugal</td>
                                <td>Juventus</td>
                                <td>
                                    <span class="badge striker-badge">LW</span>
                                    <span class="badge striker-badge">ST</span>
                                </td>
                                <td>Added on 13th March 2019</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td><img src={"https://cdn.sofifa.org/players/10/20/231747.png"} alt="Player3" /></td>
                                <td>Kylian Mbappé</td>
                                <td>France</td>
                                <td>Paris Saint-German</td>
                                <td>
                                    <span class="badge striker-badge">RW</span>
                                    <span class="badge striker-badge">ST</span>
                                </td>
                                <td>Added on 13th March 2019</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td><img src={"https://cdn.sofifa.org/players/10/20/192985.png"} alt="Player4" /></td>
                                <td>Kevin De Bruyne</td>
                                <td>Belgium</td>
                                <td>Manchester City</td>
                                <td>
                                    <span class="badge striker-badge">CAM</span>
                                    <span class="badge striker-badge">CM</span>
                                </td>
                                <td>Added on 13th March 2019</td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td><img src={"https://cdn.sofifa.org/players/10/20/195864.png"} alt="Player5" /></td>
                                <td>Paul Pogba</td>
                                <td>France</td>
                                <td>Manchester United</td>
                                <td>
                                    <span class="badge striker-badge">CM</span>
                                    <span class="badge striker-badge">CDM</span>
                                </td>
                                <td>Added on 13th March 2019</td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td><img src={"https://cdn.sofifa.org/players/10/20/200145.png"} alt="Player6" /></td>
                                <td>Carlos Henrique Venancio Casimiro</td>
                                <td>Brazil</td>
                                <td>Real Madrid</td>
                                <td>
                                    <span class="badge striker-badge">CDM</span>
                                </td>
                                <td>Added on 13th March 2019</td>
                            </tr>
                            <tr>
                                <td>7</td>
                                <td><img src={"https://cdn.sofifa.org/players/10/20/212218.png"} alt="Player7" /></td>
                                <td>Aymeric Laporte</td>
                                <td>France</td>
                                <td>Manchester City</td>
                                <td>
                                    <span class="badge striker-badge">CB</span>
                                    <span class="badge striker-badge">LB</span>
                                </td>
                                <td>Added on 13th March 2019</td>
                            </tr>
                            <tr>
                                <td>8</td>
                                <td><img src={"https://cdn.sofifa.org/players/10/20/203376.png"} alt="Player8" /></td>
                                <td>Virgil van Dijk</td>
                                <td>Netherlands</td>
                                <td>Liverpool</td>
                                <td>
                                    <span class="badge striker-badge">CB</span>
                                </td>
                                <td>Added on 13th March 2019</td>
                            </tr>
                            <tr>
                                <td>9</td>
                                <td><img src={"https://cdn.sofifa.org/players/10/20/235243.png"} alt="Player9" /></td>
                                <td>Matthijs de Ligt</td>
                                <td>Netherlands</td>
                                <td>Juventus</td>
                                <td>
                                    <span class="badge striker-badge">CB</span>
                                </td>
                                <td>Added on 13th March 2019</td>
                            </tr>
                            <tr>
                                <td>10</td>
                                <td><img src={"https://cdn.sofifa.org/players/10/20/212622.png"} alt="Player10" /></td>
                                <td>Joshua Kimmich</td>
                                <td>Germany</td>
                                <td>FC Bayern München</td>
                                <td>
                                    <span class="badge striker-badge">RB</span>
                                    <span class="badge striker-badge">CDM</span>
                                </td>
                                <td>Added on 13th March 2019</td>
                            </tr>
                            <tr>
                                <td>11</td>
                                <td><img src={"https://cdn.sofifa.org/players/10/20/200389.png"} alt="Player11" /></td>
                                <td>Jan Oblak</td>
                                <td>Slovenia</td>
                                <td>Atlético Madrid</td>
                                <td>
                                    <span class="badge striker-badge">GK</span>
                                </td>
                                <td>Added on 13th March 2019</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="addition">
                        <button> Add a Favourite Player</button>
                    </div>
                </div>
             </main>
        );
    }
}
 
class FavouriteTable extends Component {
 
}
 
class FavouriteTableHead extends Component {
    render() {
        
        let thArray = this.props.cols.map((colNameString) => {
            return <th scope="col">{colNameString}</th>
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