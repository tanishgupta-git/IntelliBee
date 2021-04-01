import React from 'react';
import {Link} from 'react-router-dom';
import './article.css';

const Article = ({_id,title,content,imageUrl}) => {
    return (
        <div className='article'>
         <Link to={`/article/${_id}`}><h1>{title}</h1></Link>
         <p>{content.slice(0,200)}...</p>
         <span><Link className="article-read" to={'article/' + _id}>Read More</Link></span>
         <img src={`http://localhost:8080/${imageUrl}`} alt=""/>
        </div>
    )
}

export default Article