import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Navbar extends Component {
  render(){
    return (
      <nav className="light-blue lighten-1" role="navigation">
        <div className="nav-wrapper container"><Link id="logo-container" to="/" class="brand-logo">Logo</Link>
          <ul className="right hide-on-med-and-down">
            <li><Link to="/register">Registrar</Link></li>
          </ul>
  
          <ul id="nav-mobile" className="sidenav">
            <li><a href="#">Navbar Link</a></li>
          </ul>
          <a href="#" data-target="nav-mobile" className="sidenav-trigger"><i className="material-icons">menu</i></a>
        </div>
      </nav>
    )
  }
}
export default Navbar;