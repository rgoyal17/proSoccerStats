import React, { Component } from 'react';
import { Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavbarText, Collapse } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons';

class NavBar extends Component {

    render() {
        return (
            <div>
                <Navbar expand="lg" id="navbar" className="fixed-top">
                    <NavbarToggler data-target="#search-feature" data-toggle="collapse">
                        <FontAwesomeIcon icon={faSearch} className="fa-lg" />
                    </NavbarToggler>
                    <NavbarBrand id="navbar-brand">
                        <img src="./img/logo.png" alt="site logo" id="logo-img" />
                        <NavbarText>PRO TEAM SOCCER</NavbarText>
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
                                <NavLink to="/createteam" activeClassName="activeLink" className="eachtab">Create Team</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/leaderboard" activeClassName="activeLink" className="eachtab">Team Standing</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/signin" activeClassName="activeLink" className="eachtab">Sign In</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default NavBar;