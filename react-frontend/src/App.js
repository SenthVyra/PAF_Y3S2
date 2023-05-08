import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListCommentComponent from './components/ListCommentComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateCommentComponent from './components/CreateCommentComponent';
import UpdateCommentComponent from './components/UpdateCommentComponent';
import ViewCommentComponent from './components/ViewCommentComponent';

function App() {
  return (
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Switch> 
                          <Route path = "/" exact component = {ListCommentComponent}></Route>
                          <Route path = "/comments" component = {ListCommentComponent}></Route>
                          <Route path = "/add-comment/:id" component = {CreateCommentComponent}></Route>
                          <Route path = "/view-comment/:id" component = {ViewCommentComponent}></Route>
                          {/* <Route path = "/update-comment/:id" component = {UpdateCommentComponent}></Route> */}
                    </Switch>
                </div>
              <FooterComponent />
        </Router>
    </div>
    
  );
}

export default App;
