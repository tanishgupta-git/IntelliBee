import React from 'react';
import { Route,Switch } from 'react-router-dom';
import Articles from '../../components/articles/articles';
import Header from '../../components/header/header';
import AddEditArticle from '../addEditArticle/addEditArticle';
import ArticleDetail from '../articleDetail/articleDetail';
import Dashboard from '../dashboard/dashboard';

import './homePage.css';

const HomePage = ({logoutHandler,user}) => {

 return (
     <div className='homepage'>
      <Header logoutHandler={logoutHandler} user={user}/>
      <Switch>
          <Route exact path='/add-article/(edit)?/:articleId?' render={ (props) => (<AddEditArticle {...props} user={user}/>)} />
          <Route exact path='/article/:articleId' render={ (props) => (<ArticleDetail {...props} user={user}/>)} />
          <Route exact path='/dashboard/:page?' render={ (props) => (<Dashboard {...props} user={user} />)} />
          <Route exact path='/:page?' render={(props) => (<Articles {...props} user={user} />)} />
      </Switch>
     </div>
 )
}


export default HomePage;