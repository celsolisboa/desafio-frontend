import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputBase from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import green from '@material-ui/core/colors/green';
import mediumLogo from '../images/logo_medium.png';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    width: '100%'
  },
  textField: {
    width: '100%',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  bootstrapRoot: {
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
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
	 			background: '#888',
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

const whiteBorder = {
	borderColor: 'white'
}

const classrooms = [101, 102, 103, 104, 105, 106, 201, 202, 203, 204];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(classroom, that) {
  return {
    fontWeight:
      that.state.classroom.indexOf(classroom) === -1
        ? that.props.theme.typography.fontWeightRegular
        : that.props.theme.typography.fontWeightMedium,
  };
}


class Home extends React.Component{
	state = {
		classroom: [],
    	showPassword: false,
	}
	handleChange = prop => event => {
		console.log(prop, event.target.value)
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
		            <img src={mediumLogo} />
		          </h1>
		        </header>
		        <main className="home">
		          <div className="courses">
		            <h2 className="page-title">Cursos</h2>
		          </div>
		        </main>
		        <div className="modal">
		        	<div className="modal-content">
		        	<MuiThemeProvider theme={theme}>
		        	  <button className="close-button">
		        	  </button>
		        	  <h3 className="page-title">Criar Curso</h3>
			          <TextField
			            className={classes.margin}
			            label="Nome do Curso"
			            variant="outlined"
			            id="course-name"
			          />
			          <TextField
				        InputProps={{
			                classes: {
			                	input: classes.cssNotched,
			                	focused: classes.cssFocused
			                }
			            }}
			            label="Professores"
			            variant="outlined"
			            id="teachers"
			          />
			          <FormControl variant="outlined" className={classes.formControl}>
			            <InputLabel
			              ref={ref => {
			                this.InputLabelRef = ref;
			              }}
			              htmlFor="classroom"
			            >
			              Salas
			            </InputLabel>
			            <Select
			              multiple
			              variant="outlined"
			              value={this.state.classroom}
			              onChange={this.handleChange('classroom')}
			              input={<OutlinedInput id="classroom" />}
			              MenuProps={MenuProps}
			            >
			              {classrooms.map(classroom => (
			                <MenuItem 
			                	key={classroom} 
			                	value={classroom} 
			                	style={getStyles(classroom, this)}
			                >
			                  {classroom}
			                </MenuItem>
			              ))}
			            </Select>
			          </FormControl>
			          <div className="grid grid--time-inputs">
				          <TextField
				            id="start"
				            label="Início"
				            type="time"
				            defaultValue="07:30"
				            variant="outlined"
				            inputProps={{
				            	step: 300,
				            }}
				          />
				          <TextField
				            id="end"
				            label="Fim"
				            type="time"
				            defaultValue="08:30"
				            variant="outlined"
				            inputProps={{
				            	step: 300,
				            }}
				          />
			          </div>
			          <Button variant="contained" color="secondary">
			            SALVAR
			          </Button>
			         </MuiThemeProvider>
			        </div>
		        </div>
	        </div>
		)
	}
}
export default withStyles(styles, { withTheme: true })(Home);