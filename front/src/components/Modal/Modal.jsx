import React from 'react';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import {styles,theme,MenuProps,getStyles} from '../../common/MuiTheme.js';
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import './Modal.css';

let classrooms = [];
let teachers = [];

class Modal extends React.Component{
	state = {
		classroom: [],
		teacher: [],
		name: '',
		start: '07:30',
		end: '08:30',
		completed: 0,
		awaitResponse: false,
		hasResponse: false,
		openAlert: false,
		suggestion: ''
	}
	componentDidMount(){
		fetch('http://localhost:3000/api/sala')
		.then(res => res.json())
		.then(data => {classrooms = data})
		fetch('http://localhost:3000/api/professor')
		.then(res => res.json())
		.then(data => {teachers = data;})
		ValidatorForm.addValidationRule('isAfterStart', (value) => {
			/*currently comparing strings! must change if logic changes*/
			if(value > this.state.start){
				return true
			}
			return false
		})
		document.addEventListener("keydown", this.escFunction, false);
	}
	handleChange = prop => event => {
		console.log(prop, event.target.value)
	  this.setState({ [prop]: event.target.value });
	};
	handleSelectChange = prop => event => {
		this.cleanSuggestion();
		if(!this.state[prop].find(item => item === event.target.value)){
		 	this.setState({ [prop]: [...this.state[prop], event.target.value] });
		}else{
			const newArr = this.state[prop].filter(item => item !== event.target.value);
			this.setState({ [prop]: newArr })
		}
	};
	handleSubmit = (e) => {
		e.preventDefault();
		this.setState({awaitResponse: true});
		this.timer = setInterval(this.progress, 10);
		const headers = {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		}
		let generateID = String(parseInt(this.props.highestID.id)+1);
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
		.then(res => {
			this.setState({awaitResponse: false, hasResponse: true});
			// if(res.ok){
			// 	we could do validation here, but since the response is always the same,
			//  I'm currently not doing
			// }else{
			// 	//display error
			// }
		})
	}

	handleClickAway = () =>
		this.setState({awaitResponse: false, hasResponse: false});

	componentWillUnmount() {
    clearInterval(this.timer);
    document.removeEventListener("keydown", this.escFunction, false);
  }

	progress = () => {
		const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  resetForm = () => {
  	this.setState({
			classroom: [],
			teacher: [],
			name: '',
			start: '07:30',
			end: '08:30',
			completed: 0,
			awaitResponse: false,
			hasResponse: false,
			openAlert: false
		})
  }

  suggestVal = (e, arr, key) => {
  	if(e.keyCode > 64 && e.keyCode < 91){
  		let suggestion = String.fromCharCode(e.keyCode).toLowerCase()
  		suggestion = this.state.suggestion+suggestion;
	  	this.setState({suggestion: suggestion})
	  	let found = arr.filter(
	  			(item) => item[key].toLowerCase().indexOf(suggestion) === 0
	  		)
	  	if(found){
	  		arr = arr.sort((a,b) => found.includes(b) - found.includes(a))
	  	}else{
	  		this.cleanSuggestion();
	  	}
		}else{
  		this.cleanSuggestion();
  	}
  }

  cleanSuggestion = () => {
  	this.setState({suggestion: ''})
  }

  escFunction = (event) => {
    if(event.keyCode === 27) {
      this.props.toggleModal()
    }
  }

	render(){
		const {classes} = this.props;
		return(
			<div className="modal">
	      <div className="modal-content">
	      	<button 
      	  	onClick={this.props.toggleModal} 
      	  	className="close-button close-button--modal"
      	  >
      	  </button>
	      <ClickAwayListener onClickAway={this.handleClickAway}>
	      	<section>
		        <ValidatorForm
		        	id="form"
	            ref="form"
	            onSubmit={this.handleSubmit}
	            onError={errors => console.log(errors)}
	          >
		        	<MuiThemeProvider theme={theme}>
		        	  <h2 className="modal-title">Criar Curso</h2>
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
			              {teachers
			              	.map(teacher => (
			                <MenuItem 
			                	onKeyUp={
			                		(e, teacher) => this.suggestVal(e, teachers, 'nome')
			                	}
			                	style={getStyles('teacher', 
			                		teacher.nome, 
			                		this, 
			                		this.state.suggestion)}
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
			              {classrooms.sort((a,b)=>a.sala-b.sala).map(classroom => (
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
				            validators={['required','isAfterStart']}
				            value={this.state.end}
				            errorMessages={['Campo Obrigatório','Deve ser maior que início']}
				            onChange={this.handleChange('end')}
				            inputProps={{
				            	step: 300,
				            }}
				          />   
			          </div>
			          <Button variant="contained" type="submit" 
			          color="secondary">
			            {this.state.awaitResponse
			            	?
				            <CircularProgress
						          className={classes.progress}
						          variant="determinate"
						          value={this.state.completed}
						        />
						        : 'SALVAR'
						      }
			          </Button>
			        </MuiThemeProvider>
			      </ValidatorForm>
			      
			      <Dialog
		          open={this.state.hasResponse}
		          onClose={this.handleClose}
		          aria-labelledby="alert-dialog-title"
		          aria-describedby="alert-dialog-description"
		        >
		          <DialogTitle id="alert-dialog-title">
		          	Novo curso adicionado!
		          </DialogTitle>
		          
		          <DialogActions>
		          	<Button onClick={this.resetForm} color="primary">
		              Adicionar mais cursos
		            </Button>
		            <Button 
		            	onClick={() => {this.props.getCourses();this.props.toggleModal()} }
		            	color="primary" 
		            	autoFocus>
		              Voltar para Home
		            </Button>
		          </DialogActions>
		        </Dialog>
	        </section>
	        </ClickAwayListener>
		    </div>
		  </div>
		)
	}
}
export default withStyles(styles, { withTheme: true })(Modal);