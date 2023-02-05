import './Header.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link, useLocation } from 'react-router-dom';

const NavigationBar = () => {

  const location = useLocation();

  const linkCss = {
    textDecoration:"none",
    color:"grey"
  };

  const active = {
    textDecoration:"none",
    color:"#ff5403"
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/" className='brandDiv'><p className="line m-auto">&lt;Anand/&gt;</p></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav h-100">
          <Nav className="me-auto">
          </Nav>
          <Nav className='text-center h5'>
            <Link to="/" className='m-2' style={location.pathname === "/" ? active : linkCss}>Home</Link>
            <Link to="/projects" className='m-2' style={location.pathname === "/projects" ? active : linkCss}>Projects</Link>
            <Link to="/blogs" className='m-2' style={location.pathname === "/blogs" ? active : linkCss}>Blogs</Link>
            <Link to="/about" className='m-2' style={location.pathname === "/about" ? active : linkCss}>About Me</Link>
            <Link to="/contact" className='m-2' style={location.pathname === "/contact" ? active : linkCss}>Contact</Link> 
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
};

export default NavigationBar;