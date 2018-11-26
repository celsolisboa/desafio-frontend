import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import mediumLogo from '../images/logo_medium.png';

const styles = theme => ({
  
});

const theme = createMuiTheme({
  overrides: {
    MuiFormControl: {
      root: {
        width: '100%',
      }
    },
    MuiInputBase: {
      root:{
        border: '1px solid #fff',
        marginBottom: '20px',
        color:'#fff',
        borderRadius: '4px',
        "&$focused": {
              borderColor: "transparent"
            }
      }
    },
    MuiFormLabel: {
      root: {
        color:'#fff',
        }
      },
      MuiButtonBase: {
        root: {
          width: '100%'
        }
      }
  },
  palette: {
    primary: { main: '#ffffff' },
    secondary: { main: '#ff0669' },
  },
  typography: { useNextVariants: true },
});

class Login extends React.Component{
	state = {
    showPassword: false,
	}
	handleChange = prop => event => {
	  this.setState({ [prop]: event.target.value });
	};

	handleClickShowPassword = () => {
		this.setState(state => ({ showPassword: !state.showPassword }));
	};

	render(){
		const { classes } = this.props;
		return(
      <main className="login">
        <MuiThemeProvider theme={theme}>
          <h2 className="page-title login-title">Login</h2>
          <TextField
            className={classes.margin}
            label="Email"
            variant="outlined"
            id="email"
          />
          <TextField
            id="outlined-adornment-password"
            variant="outlined"
            type={this.state.showPassword ? 'text' : 'password'}
            label="Senha"
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
          <Button variant="contained" color="secondary">
            ACESSAR
          </Button>
        </MuiThemeProvider>
      </main>
    )
	}
}
export default withStyles(styles, { withTheme: true })(Login);