import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { RiEditBoxLine,RiDeleteBin6Fill } from "react-icons/ri";
import './dashboardArticle.css';

const DashboardArticle = ({_id,title,imageUrl,content,user,Setarticles}) => {
    const handleClick = () => {
     axios.delete(`http://localhost:8080/articles/article/${_id}`,{
        headers : {
          Authorization : 'Bearer ' + user.token         
        }
      }).then((res) => {
        Setarticles( prevState => prevState.filter(article => article._id !== _id))
      })
    }
    return (
        <div className='dashboard-article'>
        <img src={`http://localhost:8080/${imageUrl}`} alt=""/>
        <div className='dashboard-article-content'>
            <h2>{title}</h2>
            <p>{content.slice(0,120)}...</p>
        </div>
        <div className='dashboard-article-actions'>
            <Link to={`add-article/edit/`+_id}><RiEditBoxLine /></Link>
            <button onClick={handleClick}><RiDeleteBin6Fill /></button>
        </div>
        </div>
    )
}

export default DashboardArticle; 