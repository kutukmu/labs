import React from "react"
import { Link } from "gatsby"

import { IoMdGitNetwork } from "react-icons/io"
const Header = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <IoMdGitNetwork className="logo-icon" />
        <h1>TCP/IP Labs</h1>
      </div>
      <ul className="navbar-nav">
        <li>
          <Link activeClassName="active" to="/" className="navbar-link">
            Home
          </Link>
        </li>
        <li>
          <Link activeClassName="active" to="/lab1" className="navbar-link">
            Lab1
          </Link>
        </li>
         <li>
          <Link activeClassName="active" to="/lab2" className="navbar-link">
            Lab2
          </Link>
        </li>
         <li>
          <Link activeClassName="active" to="/lab3" className="navbar-link">
            Lab3
          </Link>
        </li>
        {/* <li><Link activeClassName="active" to="/lab2" className="navbar-link">Lab2</Link></li> */}
        {/* <li><Link activeClassName="active" to="/lab3" className="navbar-link">Lab3</Link></li> */}
      </ul>
    </div>
  )
}

export default Header
