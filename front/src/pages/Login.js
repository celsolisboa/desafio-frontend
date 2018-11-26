import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
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
  margin: {
    margin: theme.spacing.unit,
  },
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
			<div className="container">
        <header>
          <h1 className="logo">
            <img src={mediumLogo} alt="Logotipo Celso Lisboa" />
          </h1>
        </header>
        <main className="login">
          <h2 className="page-title">Login</h2>
          <TextField
            className={classes.margin}
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
              },
            }}
            label="Email"
            variant="outlined"
            id="email"
          />
          <FormControl className={classes.margin}>
            <InputLabel htmlFor="password">Senha</InputLabel>
            <Input
              id="password"
              type={this.state.showPassword ? 'text' : 'password'}
              value={this.state.password}
              onChange={() => this.handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                  >
                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button variant="contained" color="secondary">
            ACESSAR
          </Button>
        </main>
      </div>
    )
	}
}
export default withStyles(styles, { withTheme: true })(Login);