import Nav from 'react-bootstrap/Nav';
import { Link, useLocation } from 'react-router-dom';

const SubNavBar = () => {

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
    <Nav className='text-center h5'>
        <Link to="/" className='m-2' style={location.pathname === "/" ? active : linkCss}>Home</Link>
        <Link to="/projects" className='m-2' style={location.pathname === "/projects" ? active : linkCss}>Projects</Link>
        {/* <Link to="/blogs" className='m-2' style={location.pathname === "/blogs" ? active : linkCss}>Blogs</Link> */}
        <Link to="/about" className='m-2' style={location.pathname === "/about" ? active : linkCss}>About Me</Link>
        <Link to="/contact" className='m-2' style={location.pathname === "/contact" ? active : linkCss}>Contact</Link> 
    </Nav>
  );
};

export default SubNavBar;