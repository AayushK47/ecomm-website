import { useContext } from 'react';
import { navigate } from '@reach/router';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

import { isLoggedIn } from '../utils/isLoggedIn';
import { UserContext } from '../context/UserContext';
import Modal from '../components/Modal';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import './Navbar.css';

function AppNavbar() {
    const { name, showSignIn, setShowSignIn, showSignUp, setShowSignUp } = useContext(UserContext);
    
    return (
        <>
            <Modal title="Sign In" show={showSignIn} setShow={setShowSignIn}>
                <SignInForm setShowSignIn={setShowSignIn} />
            </Modal>
            <Modal title="Sign Up" show={showSignUp} setShow={setShowSignUp}>
                <SignUpForm setShowSignUp={setShowSignUp} />
            </Modal>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Online Grocery</Navbar.Brand>
                    <Navbar.Toggle />
                    {
                        isLoggedIn() ? 
                        <NavDropdown style={{ color: "white !important" }} className="text-light" title="Welcome Back" id="collasible-nav-dropdown">
                            <NavDropdown.Item disabled={true}>{ name }</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={() => navigate('/orders')}>My Orders</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => {localStorage.removeItem('token'); window.location.reload(); } }>Logout</NavDropdown.Item>
                        </NavDropdown> :
                            <Navbar.Collapse className="justify-content-end">
                                <Nav.Link onClick={() => setShowSignIn(true)} className="text-white">Sign In</Nav.Link>
                                <Nav.Link onClick={() => setShowSignUp(true)} className="text-white">Sign Up</Nav.Link>
                            </Navbar.Collapse>
                    }
                </Container>
            </Navbar>
        </>
    )
}

export default AppNavbar;
