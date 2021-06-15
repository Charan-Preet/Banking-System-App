import React from "react";
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div>
      <header className="bg-black-90 fixed w-100 ph3 pv3 pv4-ns ph4-m ph5-l">
        <nav className="f6 fw6 ttu tracked sans-serif">
          <Link className="link dim white dib mr3 b" to='/' title="Home">
            Home
          </Link>
          <Link className="link dim white dib mr3 b" to='/register' title="About">
            Customer
          </Link>
          <Link className="link dim white dib mr3 b" to='/admin/login' title="Store">
            Admin
          </Link>
          <Link className="link dim white dib b" to="/agent/login" title="Contact">
            Agent
          </Link>
        </nav>
      </header>
    </div>
  );
}
