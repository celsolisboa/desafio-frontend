import React from 'react';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import CircularProgress from '@material-ui/core/CircularProgress';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ModalDialog from './ModalDialog';
import ModalSelects from './ModalSelects';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import {styles,theme,MenuProps,getStyles} from '../../../common/MuiTheme.js';
import { ValidatorForm, TextValidator} 
	from 'react-material-ui-form-validator';

class ModalForm extends React.Component {
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

	handleChange = prop => event => {
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
		let beginFrom = this.props.highestID ? this.props.highestID.id : 0;
		let generateID = String(parseInt(beginFrom)+1);
		const body = {
			id: generateID,
			nome: this.state.name, 
			professores: this.props.teachers.filter(tc => this.state.teacher.includes(tc.nome)),
			salas: this.props.classrooms.filter(cl => this.state.classroom.includes(cl.sala)),
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
			//  I'm currently not
			// }else{
			// 	//display error
			// }
		})
	}

	handleClickAway = () =>
		this.setState({awaitResponse: false, hasResponse: false});

	componentDidMount(){
		ValidatorForm.addValidationRule('isAfterStart', (value) => {
			/*currently comparing strings! must change if logic changes*/
			if(value > this.state.start){
				return true
			}
			return false
		})
	}

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
	render(){
		const {classes} = this.props;
		return (
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
			         	<ModalSelects 
				         	classrooms={this.props.classrooms}
				         	teachers={this.props.teachers}
				         	classroom={this.state.classroom}
				         	teacher={this.state.teacher}
				         	suggestion={this.state.suggestion}
				         	handleSelectChange={this.handleSelectChange}
				         	suggestVal={this.suggestVal}
			         	/>
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
			          <Button 
			          	variant="contained" 
			          	type="submit" 
			          	color="secondary"
			          >
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
			      <ModalDialog 
			      	hasResponse={this.state.hasResponse}
			      	getCourses={this.props.getCourses}
	      			toggleModal={this.props.toggleModal}
			      />
	        </section>
	    </ClickAwayListener>
		)
	}
}
export default withStyles(styles, { withTheme: true })(ModalForm);