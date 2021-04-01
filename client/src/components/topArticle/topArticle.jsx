import React from 'react';
import { Link } from 'react-router-dom';
import './topArticle.css';

const TopArticle = ({_id,title,imageUrl,createdAt}) => {
    const articleDateObject = new Date(createdAt).toDateString().split(" ");
    const articleDate = articleDateObject[1] + " " + articleDateObject[2];
    return (
        <div className='topArticle'>
        <div>
        <Link to={`/article/${_id}`}><h3>{title}</h3></Link>
        <p>{articleDate}</p>
        </div>
        <img src={`http://localhost:8080/${imageUrl}`} alt=""/>
        </div>
    )
}

export default TopArticle;