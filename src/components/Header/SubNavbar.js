import Nav from 'react-bootstrap/Nav';
import data from '../../SourceData/data.json';
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
      {
        data.navLink.map((link, i) => {
          return(
            <Link to={link.path} key={i} className='m-2' style={location.pathname === link.path ? active : linkCss}>{link.title}</Link>
          )
        })
      }
    </Nav>
  );
};

export default SubNavBar;