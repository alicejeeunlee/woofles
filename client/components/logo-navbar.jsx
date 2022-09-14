import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function LogoNavbar(props) {
  return (
    <nav className='navbar fixed-top'>
      <div className='container-fluid justify-content-center justify-content-md-start'>
        <i className="fa-solid fa-stroopwafel ms-3"></i>
        <a className='navbar-brand ms-4 me-4 pt-0 pb-0' href="#">Woofles</a>
        <i className="fa-solid fa-stroopwafel me-5"></i>
        <div id='desktop-nav'>
          <a href="#" className='anchor ms-3'>Discover</a>
          <a href="#favorites" className='anchor'>Favorites</a>
          <a href="#Inquiries" className='anchor'>Inquiries</a>
        </div>
      </div>
    </nav>
  );
}
