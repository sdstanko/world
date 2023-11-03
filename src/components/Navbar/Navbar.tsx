import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavbarLayout from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.scss';

const Navbar = () => {
    return (
        <>
            <NavbarLayout bg="primary" data-bs-theme="dark">
                <Container>
                    <NavbarLayout.Brand>World</NavbarLayout.Brand>
                    <Nav className="me-auto">
                        <Link to="/" className="nav-link">
                            Map
                        </Link>
                        <Link to="/countrys" className="nav-link">
                            Country List
                        </Link>
                    </Nav>
                </Container>
            </NavbarLayout>
        </>
    );
};

export default Navbar;
