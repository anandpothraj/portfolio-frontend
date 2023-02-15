import './Header.css';
import Hamburger from './Hamburger';
import SubNavBar from './SubNavbar';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const NavigationBar = (props) => {

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/" className='brandDiv'><p className="line m-auto">&lt;Anand/&gt;</p></Navbar.Brand>
        <Hamburger showMenuBar={props.showMenuBar} setShowMenuBar={props.setShowMenuBar}/>
        <Navbar.Collapse id="responsive-navbar-nav h-100">
          <Nav className="me-auto">
          </Nav>
          <SubNavBar/>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;