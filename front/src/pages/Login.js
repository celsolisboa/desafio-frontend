import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {styles,theme,MenuProps,getStyles} from '../common/MuiTheme.js';
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import mediumLogo from '../images/logo_medium.png';

class Login extends React.Component{
	state = {
    showPassword: false,
    password: '',
    email: ''
	}
  
	handleChange = prop => event => {
	  this.setState({ [prop]: event.target.value });
	};

	handleClickShowPassword = () => {
		this.setState(state => ({ showPassword: !state.showPassword }));
	};

  componentDidMount = () => {
    ValidatorForm.addValidationRule('matchesPassword', (value) => {
      //fetch here and compare to actual password
        if (value !== this.state.user.password) {
            return false;
        }
        return true;
    });
  }

  handleSubmit = () => {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    const body = {
      email: this.state.email,
      password: this.state.password
    }
    fetch('http://localhost:3000/api/user/login',
      {method: 'POST', headers: headers, body: JSON.stringify(body)}
    )
    .then(res => res.ok)
    
  }

	render(){
		const { classes } = this.props;
		return(
      <main className="login">
        <ValidatorForm
          id="form"
          ref="form"
          onSubmit={this.handleSubmit}
          onError={errors => console.log(errors)}
        >
        <MuiThemeProvider theme={theme}>
          <h2 className="page-title login-title">Login</h2>
          <TextValidator
            className={classes.margin}
            label="Email"
            name="email"
            validators={['required','isEmail']}
            value={this.state.email}
            variant="outlined"
            errorMessages={['Campo Obrigatório','Email inválido']}
            onChange={this.handleChange('email')}
            id="email"
          />
          <TextValidator
            id="outlined-adornment-password"
            variant="outlined"
            name="password"
            type={this.state.showPassword ? 'text' : 'password'}
            label="Senha"
            validators={['required']}
            errorMessages={['Campo Obrigatório']}
            value={this.state.password}
            onChange={this.handleChange('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                  >
                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" type="submit" color="secondary">
            ACESSAR
          </Button>
        </MuiThemeProvider>
        </ValidatorForm>
      </main>
    )
	}
}
export default withStyles(styles, { withTheme: true })(Login);