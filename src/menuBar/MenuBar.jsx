import React, { Component } from 'react';
import './menuBar.css';


class MenuBar extends Component {
  state = {  }
  render() { 
    return ( 
      <React.Fragment>
        <div className="container-menu" id="sidebar">
          <div className="logo">LOGO</div>
          <div className="ul-contianer">
          <ul className="ulMenu">
            <li>HOME</li>
            <li>FAVORITES</li>
            <li>CONTACT</li>
          </ul>
          </div>
        </div>
      </React.Fragment>
     );
  }
}
 
export default MenuBar;