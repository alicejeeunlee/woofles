import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function MobileNavbar(props) {
  return (
    <nav className='navbar fixed-bottom'>
      <div className='container-fluid justify-content-evenly'>
        <a><i className="fa-solid fa-paw mt-2 mb-2"></i></a>
        <a><i className="fa-solid fa-heart mt-2 mb-2"></i></a>
        <a><i className="fa-solid fa-user mt-2 mb-2"></i></a>
      </div>
    </nav>
  );
}
