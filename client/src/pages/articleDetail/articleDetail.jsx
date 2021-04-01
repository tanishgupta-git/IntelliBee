import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { FaRegUserCircle } from "react-icons/fa";
import './articleDetail.css';

const ArticleDetail = ({match,user}) => {
    const [article,Setarticle] = useState({imageUrl :""});
    const [date,Setdate] = useState("");
    const [creatorname,Setcreatorname] = useState("");
    useEffect(() => {
     axios.get(`http://localhost:8080/articles/article/${match.params.articleId}`,{
        headers : 
        {
            Authorization : 'Bearer ' + user.token         
          } 
     }).then( (res) => {

       Setcreatorname(res.data.username);
       Setarticle(res.data.article);
       const articleDateObject = new Date(res.data.article.createdAt);
       const articleDate = articleDateObject.toDateString().split(" ")
       Setdate(articleDate[1] + " "  + articleDate[2])
     })
    },[user,match.params.articleId])
    return (
        <div className='article-detail'>
        {article.imageUrl && <img src={`http://localhost:8080/${article.imageUrl}`} alt=""/>}
        <p>{date}</p>
         <h1>{article.title}</h1>
         <p>{article.content}</p>
         <div className="article-detail-creator"><FaRegUserCircle /> &nbsp;<i>by</i>&nbsp; <strong>{creatorname}</strong></div>
        </div>
    )
}

export default ArticleDetail;