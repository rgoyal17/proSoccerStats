import React, { Component } from 'react';
import { Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavbarText, Collapse } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons';

class NavBar extends Component {

    render() {
        return (
            <div>
                <Navbar expand="lg" className="fixed-top">
                    <NavbarToggler data-target="#search-feature" data-toggle="collapse">
                        <FontAwesomeIcon icon={faSearch} className="fa-lg" />
                    </NavbarToggler>
                    <NavbarBrand>
                        <img src="./img/logo.png" alt="site logo" id="logo-img" />
                        <NavbarText>PRO SOCCER STATS</NavbarText>
                    </NavbarBrand>
                    <NavbarToggler data-target="#navbarNav" data-toggle="collapse">
                        <FontAwesomeIcon icon={faBars} className="fa-lg" />
                    </NavbarToggler>
                    <Collapse navbar id="navbarNav">
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink exact to="/" activeClassName="activeLink" className="eachtab">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/compare" activeClassName="activeLink" className="eachtab">Compare Players</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/favorites" activeClassName="activeLink" className="eachtab">Favorite Players</NavLink>
                            </NavItem>
                            </Nav>
                            <div className="eachtab signin-tab change-pointer" onClick={this.props.callback}>{this.props.signedIn ? "Log Out" : "Sign In"}</div>
                        
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default NavBar;