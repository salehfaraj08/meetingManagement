import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (<>
      <div>
        <nav>
          <ul className='nav-bar'>
            <li>
              <Link className='a' to="/">Home</Link>
            </li>
            <li>
              <Link style={{marginLeft:'68vw'}} className='a' to="/meeting">Meetings</Link>
            </li>
            <li>
              <Link className='a' to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
  </>);
};

export default Header;
