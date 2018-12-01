import React from 'react';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

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
		MuiFormHelperText: {
			root: {
				fontSize: '1em',
			},
			contained: {
				marginTop: '-10px',
		    marginBottom: '12px'
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

function getStyles(classroom, that) {
  return {
    fontWeight:
      that.state.classroom.indexOf(classroom) === -1
        ? that.props.theme.typography.fontWeightRegular
        : that.props.theme.typography.fontWeightMedium,
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
	}
	handleChange = prop => event => {
		console.log(prop, event.target.value)
	    this.setState({ [prop]: event.target.value });
	};
	handleSubmit = () => {
		// ValidatorForm.addValidationRule('fieldsNotEmpty', (value) => {
  //       if (value.length > 0) {
  //           return true;
  //       }
  //       return false;
  //   });
		// if(this.state.classroom.length > 0 && this.state.teacher.length > 0
		// 	&& this.state.name.length > 0){
		// 	this.sendNewCourse()
		// }else{

		// }
		// .then(data => data))
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
            onSubmit={this.handleSubmit}
            onError={errors => console.log(errors)}
          >
	        	<MuiThemeProvider theme={theme}>
	        	  <button className="close-button close-button--modal">
	        	  </button>
	        	  <h3 className="modal-title">Criar Curso</h3>
		          <TextValidator
		            className={classes.margin}
		            label="Nome do Curso *"
		            variant="outlined"
		            id="name"
		            validators={['required']}
		            errorMessages={['Campo obrigatório']}
		            onChange={this.handleChange('name')}
		            name="name"
		          />
		          <FormControl variant="outlined" className={classes.formControl}>
		            <InputLabel
					      	style={{width: 'auto'}}
		              ref={ref => {
		                this.InputLabelRef = ref;
		              }}
		              htmlFor="teachers"
		            >
		             Professores *
		            </InputLabel>
		            <Select
		              multiple
		              errorText="All fields are required"
		              autoWidth={true}
		              labelWidth={0}
		              variant="outlined"
		              value={this.state.teacher}
		              onChange={this.handleChange('teacher')}
		              input={<OutlinedInput id="teacher" />}
		              MenuProps={MenuProps}
		            >
		              {teachers.map(teacher => (
		                <MenuItem 
		                	key={teacher.id} 
		                	value={teacher} 
		                	style={getStyles(teacher.nome, this)}
		                >
		                  {teacher.nome}
		                </MenuItem>
		              ))}
		            </Select>
		          </FormControl>
		          <FormControl variant="outlined" className={classes.formControl}>
		            <InputLabel
				      style={{width: 'auto'}}
		              ref={ref => {
		                this.InputLabelRef = ref;
		              }}
		              htmlFor="classroom"
		            >
		              Salas *
		            </InputLabel>
		            <Select
		              multiple
		              autoWidth={true}
		              labelWidth={0}
		              variant="outlined"
		              value={this.state.classroom}
		              onChange={this.handleChange('classroom')}
		              input={<OutlinedInput id="classroom" />}
		              MenuProps={MenuProps}
		            >
		              {classrooms.map(classroom => (
		                <MenuItem 
		                	key={classroom.id} 
		                	value={classroom} 
		                	style={getStyles(classroom.sala, this)}
		                >
		                  {classroom.sala}
		                </MenuItem>
		              ))}
		            </Select>
		          </FormControl>
		          <div className="grid grid--time-inputs">
			          <TextField
			            id="start"
			            label="Início *"
			            type="time"
			            defaultValue="07:30"
			            variant="outlined"
			            onChange={this.handleChange('start')}
			            inputProps={{
			            	step: 300,
			            }}
			          />
			          <TextField
			            id="end"
			            label="Fim *"
			            type="time"
			            defaultValue="08:30"
			            variant="outlined"
			            onChange={this.handleChange('end')}
			            inputProps={{
			            	step: 300,
			            }}
			          />
		          </div>
		          <Button variant="contained" type="submit" color="secondary">
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
