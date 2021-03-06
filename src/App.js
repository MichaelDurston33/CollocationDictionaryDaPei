import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, NavLink, Redirect, Switch } from 'react-router-dom'


import classes from './App.css';
import CardDistributor from './Containers/CardDistributorPage/CardDistributor.js'
import LandingPage from './Containers/LandingPage/LandingPage.js'
import CardFullView from './Containers/CardFullView/CardFullView.js'
import AddCardToDatabase from './Containers/AddCardToDatabase/AddCardToDatabase.js'


class App extends Component {
  constructor () {
    super();
    this.state = {
      output: ''
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className={classes.App}>
         <Switch>
          <Route path="/" exact render={() =>  <LandingPage />}/>
          <Route path="/Cards" exact render={() =>  <CardDistributor />}/>
          <Route path="/AddCardToDatabase" exact render={() => <AddCardToDatabase />}/>
          <Route path="/tile/:id" exact render={(props) => <CardFullView {...props}/>}/>
        </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
