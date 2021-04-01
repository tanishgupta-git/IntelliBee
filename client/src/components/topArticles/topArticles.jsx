import React,{useState,useEffect} from 'react';
import axios from 'axios';
import TopArticle from '../topArticle/topArticle';

const TopArticles = ({user}) => {
    const [topArticles,SettopArticles] = useState([]);
    useEffect(() => {
      axios.get('http://localhost:8080/articles/toparticles',{
        headers : 
        {
            Authorization : 'Bearer ' + user.token         
          }
      }).then((res) => {
          SettopArticles(res.data.articles);
      })
    },[user])
    return (
        <div className='topArticles'>
        <p>Top Articles</p>
        {
            topArticles.map( article => {
                return (
                 <TopArticle key={article._id} {...article} />
                )
            })
        }
        </div>
    )
}

export default TopArticles;