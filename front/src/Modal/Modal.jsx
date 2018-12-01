import React from 'react';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

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
  selectMargin: {
  	marginTop: '-1em',
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
		MuiFormHelperText: {
			root: {
				  color: '#fff',
			    fontSize: '1em',
			    textAlign: 'left',
			    minHeight: '1em',
			    position: 'relative',
			    left: '1em',
			    top: '1.5em',
			    height: '1em',
			    overflow: 'hidden',
			    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
			    lineHeight: '1em',
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
    error: { main: '#ff0669' },
  },
  typography: { useNextVariants: true },
});

let classrooms = [];
let teachers = [];
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

class Modal extends React.Component{
	state = {
		classroom: [],
		teacher: [],
		name: '',
		start: '07:30',
		end: '08:30',
		isTeachersEmpty: true,
		attemptSubmit: false
	}
	componentDidMount(){
		fetch('http://localhost:3000/api/sala')
		.then(res => res.json())
		.then(data => {classrooms = data})
		fetch('http://localhost:3000/api/professor')
		.then(res => res.json())
		.then(data => {teachers = data;})
	}
	handleChange = prop => event => {
		console.log(prop, event.target.value)
	  this.setState({ [prop]: event.target.value });
	};
	handleSelectChange = prop => event => {
		console.log(prop, event.target.value)
	  this.setState({ [prop]: [...this.state[prop], event.target.value] });
	};
	handleSubmit = () => {
		this.setState({attemptSubmit: true})
		
	}
	sendNewCourse = () => {
		const headers = {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		}
		let generateID = String(this.props.coursesLen + 1);
		const body = {
			id: generateID,
			nome: this.state.name, 
			professores: this.state.teacher,
			salas: this.state.classroom,
			inicio: this.state.start,
			fim: this.state.end
		}
		fetch('http://localhost:3000/api/curso', 
			{	method: 'POST', 
				headers: headers,
				body: JSON.stringify(body)
			}
		)
		.then(res => console.log(res.json()))
	}

	render(){
		const {classes} = this.props;
		return(
			<div className="modal">
	      <div className="modal-content">
	        <ValidatorForm
            ref="form"
            onSubmit={this.sendNewCourse}
            onError={errors => console.log(errors)}
          >
	        	<MuiThemeProvider theme={theme}>
	        	  <button className="close-button close-button--modal">
	        	  </button>
	        	  <h3 className="modal-title">Criar Curso</h3>
		          <TextValidator
		            label="Nome do Curso *"
		            variant="outlined"
		            id="name"
		            validators={['required']}
		            value={this.state.name}
		            errorMessages={['Campo Obrigatório']}
		            onChange={this.handleChange('name')}
		            name="name"
		          />
		          <FormControl>
		          	<FormHelperText>
		            	{this.state.teacher.map(tc => tc.nome).join(', ')}
		            </FormHelperText>
		            <SelectValidator	  
		            	className={classes.selectMargin}            
		              label="Professores *"
		              name="teacher"
		              variant="outlined"
		              validators={['required']}
		              errorMessages={['Campo Obrigatório']}
		              value={this.state.teacher}
		              onChange={this.handleSelectChange('teacher')}
		              input={<OutlinedInput id="teacher" />}
		              menuprops={MenuProps}
		            >
		              {teachers.map(teacher => (
		                <MenuItem 
		                	key={teacher.id} 
		                	value={teacher} 
		                >
		                  {teacher.nome}
		                </MenuItem>
		              ))}
		            </SelectValidator>
		            </FormControl>
		            <FormControl>
		            <FormHelperText>
		            	{this.state.classroom.map(cl => cl.sala).join(', ')}
		            </FormHelperText>
		            <SelectValidator
		            	className={classes.selectMargin}
		              label="Salas *"
		              name="classroom"
		              variant="outlined"
		              validators={['required']}
		              errorMessages={['Campo Obrigatório']}
		              value={this.state.classroom}
		              onChange={this.handleSelectChange('classroom')}
		              input={
		              	<OutlinedInput 
		              		 
		              		id="classroom" 
		              		/>
		              	}
		              menuprops={MenuProps}
		            >
		              {classrooms.map(classroom => (
		                <MenuItem 
		                	key={classroom.sala} 
		                	value={classroom} 
		                >
		                  {classroom.sala}
		                </MenuItem>
		              ))}
		            </SelectValidator>
		            </FormControl>
		          <div className="grid grid--time-inputs">
			          <TextValidator
			            id="start"
			            label="Início *"
			            type="time"
			            name="start"
			            variant="outlined"
			            validators={['required']}
			            value={this.state.start}
			            errorMessages={['Campo Obrigatório']}
			            onChange={this.handleChange('start')}
			            inputProps={{
			            	step: 300,
			            }}
			          />
			          <TextValidator
			            id="end"
			            label="Fim *"
			            type="time"
			            name="end"
			            variant="outlined"
			            validators={['required']}
			            value={this.state.end}
			            errorMessages={['Campo Obrigatório']}
			            onChange={this.handleChange('end')}
			            inputProps={{
			            	step: 300,
			            }}
			          />
			          
		          </div>
		          <Button variant="contained" type="submit" onClick={this.handleSubmit} color="secondary">
		            SALVAR
		          </Button>
		        </MuiThemeProvider>
		      </ValidatorForm>
		    </div>
		   </div>
		)
	}
}
export default withStyles(styles, { withTheme: true })(Modal);
