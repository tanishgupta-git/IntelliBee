import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './articles.css';
import Article from '../article/article';
import TopArticles from '../topArticles/topArticles';
import Pagination from '../pagination/pagination';

const Articles = ({match,user}) => {
const [articles,Setarticles] = useState([]);
const [totalItems,SettotalItems] = useState("");
useEffect(() => {
 let url = 'http://localhost:8080/articles';
 if(match.params.page){
     url = `http://localhost:8080/articles?${match.params.page}` 
 }
 axios.get(url,{
     headers : 
        {
            Authorization : 'Bearer ' + user.token         
          }
 }).then((res) => {
   Setarticles(res.data.articles);
   SettotalItems(res.data.totalItems);
 }).catch(err => {
     console.log(err)
 })
},[user,match.params.page])
return (
    <div className='articles'>
    <div className='articles-left'>
     {
         articles.map( article => (
             <Article key={article._id} {...article}/>)
         )
     }
   { totalItems && <Pagination totalItems={totalItems} page={match.params.page}/> }
     </div>
     <div className='articles-right'>
      <TopArticles user={user}/>
     </div>
    </div>
)
}

export default  Articles;