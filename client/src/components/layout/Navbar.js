import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Navbar extends Component {
  render(){
    return (
      <nav className="light-blue lighten-1" role="navigation">
        <div className="nav-wrapper container"><Link id="logo-container" to="/" className="brand-logo">Logo</Link>
          <ul className="right hide-on-med-and-down">
            <li><Link to="/register">Registrar</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
  
          <ul id="nav-mobile" className="sidenav">
          <li><Link to="/register">Registrar</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
          <Link to="/" data-target="nav-mobile" className="sidenav-trigger"><i className="material-icons">menu</i></Link>
        </div>
      </nav>
    )
  }
}
export default Navbar;