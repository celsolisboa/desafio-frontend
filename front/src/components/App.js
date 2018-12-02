import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Home/Home';
import Login from './Login/Login';
import Button from '@material-ui/core/Button';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import mediumLogo from '../common/images/logo_medium.png';
import largeLogo from '../common/images/logo_big.png';
import './App.css';

class App extends React.Component {
  state = {
    auth: true,
    isModalOpen: true,
    showLoginAlert: false
  }

  toggleModal = () =>
    this.setState({isModalOpen: !this.state.isModalOpen})

  changeAuth = (ok) => {
    if(ok){
      this.setState({auth: true})
    }else{
      this.setState({showLoginAlert: true});
      setTimeout(
        () => this.setState({showLoginAlert: false})
        , 5000);
    }
  }

  clickAway = () => 
    this.setState({showLoginAlert: false})

  render(){
    return (
      <div className="container">
        <header className="header">
          <h1 className="logo">
            { !this.state.auth 
              && <img src={largeLogo} class="desktop" alt="Logotipo Celso Lisboa" /> 
            }
            <img src={mediumLogo} alt="Logotipo Celso Lisboa" />
          </h1>
          { this.state.auth && <h2 className="page-title desktop">Cursos</h2> }
          {this.state.auth &&
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
                this.state.auth 
                ? () =>
                  <Home 
                    isModalOpen={this.state.isModalOpen} 
                    title="Cursos"
                    toggleModal={this.toggleModal}
                  />
                : () => 
                  <Login 
                    clickAway={this.clickAway}
                    changeAuth={this.changeAuth}
                    showLoginAlert={this.state.showLoginAlert}
                  />
              }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
