import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './dashboard.css';
import DashboardArticle from '../../components/dashboardArticle/dashboardArticles';
import Pagination from '../../components/pagination/pagination';

const Dashboard = ({user,match}) => {
    const [articles,Setarticles] = useState([]);
    const [totalItems,SettotalItems] = useState("");
    useEffect(() => {
    let url = 'http://localhost:8080/articles/dashboard';
    if(match.params.page){
        url = `http://localhost:8080/articles/dashboard?${match.params.page}` 
    }
     axios.get(url,{
        headers : 
        {
            Authorization : 'Bearer ' + user.token         
          }
     }).then( res => {
         Setarticles(res.data.articles);
         SettotalItems(res.data.totalItems);
     }).catch(err => {
         console.log(err);
     })
    },[user,match.params.page])
    return (
        <div className='dashboard'>
        <h1>Dashboard</h1>
        {
            articles.map( article => (
                <DashboardArticle key={article._id} {...article} user={user} Setarticles={Setarticles}/>
            ))
        }
        { totalItems && <Pagination totalItems={totalItems} page={match.params.page}/> }
        </div>
    )
}

export default Dashboard;