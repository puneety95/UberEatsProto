import React from 'react';
import {Nav} from 'react-bootstrap';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Nav className="justify-content-end">
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li style={{cursor:"pointer"}} key={number} className='page-item'>
            <a onClick={() => paginate(number)}  className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </Nav>
  );
};

export default Pagination;