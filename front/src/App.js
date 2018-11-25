import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import './App.css';

class App extends React.Component {
  state = {
    authorization: true
  }

  render(){
    return (
      <div className="App">
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route 
              path="/"
              render={this.state.authorization?(props)=><Home/>:() => <Login/>}
            />
            <Route 
              path="/cursos/"
              render={this.state.authorization?(props)=><Home/>:() => <Login/>}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
