import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import './App.css';
import Button from '@material-ui/core/Button';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import mediumLogo from './images/logo_medium.png';
class App extends React.Component {
  state = {
    authorization: true,
    isModalOpen: false
  }
//apply in button:
    // border-radius: 2em;
    // padding: 0 2.5em;
    // height: 30px;
  toggleModal = () =>
    this.setState({isModalOpen: !this.state.isModalOpen})

  render(){
    return (
      <div className="App container">
        <header className="header">
          <h1 className="logo">
            <img src={mediumLogo} alt="Logotipo Celso Lisboa" />
          </h1>
          {this.state.authorization &&
            <Button variant="contained" onClick={this.toggleModal} color="secondary">
              CRIAR
            </Button>
          }
        </header>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route 
              path="(/|/cursos/)"
              render={  
                this.state.authorization 
                ? (props)=>
                  <Home 
                    isModalOpen={this.state.isModalOpen} 
                    toggleModal={this.toggleModal}
                  />
                : () => <Login/>
              }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
