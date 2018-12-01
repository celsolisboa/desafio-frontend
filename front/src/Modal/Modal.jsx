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
  	marginTop: '-2em',//to compensate for the formHelperText height
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
			    top: '0.5em',
			    height: '1em',
			    overflow: 'hidden',
			    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
			    lineHeight: '1em',
			    width: '85%',
			    textOverflow: 'ellipsis',
			    whiteSpace: 'nowrap'
			},
			contained: {
				  top: '-1em',
    			left: '.3em',
    			margin: 0
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

function getStyles(arr, val, that) {
  return {
    backgroundColor:
      that.state[arr].indexOf(val) === -1
        ? 'transparent'
        : 'rgba(0, 0, 0, 0.14)'
  };
}

class Modal extends React.Component{
	state = {
		classroom: [],
		teacher: [],
		name: '',
		start: '07:30',
		end: '08:30'
	}
	componentDidMount(){
		fetch('http://localhost:3000/api/sala')
		.then(res => res.json())
		.then(data => {classrooms = data})
		fetch('http://localhost:3000/api/professor')
		.then(res => res.json())
		.then(data => {teachers = data;})
		ValidatorForm.addValidationRule('isAfterStart', (value) => {
			if(value > this.state.start){
				return true
			}
			return false
		})
	}
	handleChange = prop => event => {
		console.log(prop, event.target.value)
	  this.setState({ [prop]: event.target.value });
	};
	handleSelectChange = prop => event => {
		if(!this.state[prop].find(item => item === event.target.value)){
		 	this.setState({ [prop]: [...this.state[prop], event.target.value] });
		}
	};
	handleSubmit = () => {
		const headers = {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		}
		let generateID = String(parseInt(this.props.highestID.id)+1);
		console.log(generateID);
		const body = {
			id: generateID,
			nome: this.state.name, 
			professores: teachers.filter(tc => this.state.teacher.includes(tc.nome)),
			salas: classrooms.filter(cl => this.state.classroom.includes(cl.sala)),
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
            onSubmit={this.handleSubmit}
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
		          		{/*fixes style from Select Validator 
		            	not accepting multiple values*/}
		            	{
		            		this.state.classroom.length > 1 
		            		? this.state.classroom.join(', ')
		            		: null
		            	}
		            	{
		            		this.state.teacher.length > 1
		            		? this.state.teacher.join(', ')
		            		: null
		            	}
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
		                	style={getStyles('teacher', teacher.nome, this)}
		                	key={teacher.id} 
		                	value={teacher.nome} 
		                >
		                  {teacher.nome}
		                </MenuItem>
		              ))}
		            </SelectValidator>
		            </FormControl>
		            <FormControl>
		            <FormHelperText>
		            	{/*fixes style from Select Validator 
		            	not accepting multiple values*/}
		            	{
		            		this.state.classroom.length > 1 
		            		? this.state.classroom.join(', ')
		            		: null
		            	}
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
		              input={<OutlinedInput id="classroom" />}
		              menuprops={MenuProps}
		            >
		              {classrooms.map(classroom => (
		                <MenuItem 
		                	style={getStyles('classroom', classroom.sala, this)}
		                	key={classroom.sala} 
		                	value={classroom.sala} 
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
			            validators={['required'],['isAfterStart']}
			            value={this.state.end}
			            errorMessages={['Campo Obrigatório'],['Deve ser maior que início']}
			            onChange={this.handleChange('end')}
			            inputProps={{
			            	step: 300,
			            }}
			          />
			          
		          </div>
		          <Button variant="contained" type="submit" 
		          color="secondary">
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
