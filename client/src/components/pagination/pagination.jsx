import React from 'react';
import { Link } from 'react-router-dom';
import { FaBackward,FaForward} from "react-icons/fa";
import './pagination.css';

const Pagination = ({totalItems,page}) => {
    if(!page) {
        page=1
    }
    else{
        page = page.split("=")
        page = Number(page[1]);
    }
    const pageItems = [];
    const prev = page === 1 ? 0 : page - 1;
    const next = page * 10 < totalItems ? page + 1:"";
    for (let i = 1; i <= Math.ceil(totalItems / 10); i++) {
        pageItems.push(i);
      }
  
    return (
        <div className='pagination'>
        { prev !==0 && <Link className="pagination-item" to={`/page=${prev}`} ><FaBackward /></Link> }
        {
            pageItems.map(item => (
              <Link key={item} className={page=== item ? "pagination-item active" : "pagination-item"} to={`/page=${item}`}>{item}</Link>
            ))
        }
        { next && <Link className="pagination-item"  to={`/page=${next}`} ><FaForward /></Link> }
        </div>
    )
}

export default Pagination;