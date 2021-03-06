import React from 'react';
import RegistrationModal from './RegistrationModal';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container } from 'reactstrap';

class AppNavbar extends React.Component {
    state = {
        isOpen: false
    };

    toggle = () => {
        this.setState({isOpen: !this.state.isOpen})
    };


    render() {
        return (
            <div>
                <Navbar color="light" light expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href={"/"}>
                            MainPage
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className={"ml-auto"} navbar>
                                <NavItem>
                                    <NavLink href={"https://githib.com"}>Github</NavLink>
                                </NavItem>
                                <NavItem>
                                    <RegistrationModal />
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }

}

export default AppNavbar;