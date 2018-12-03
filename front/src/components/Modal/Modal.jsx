import React from 'react';
import PropTypes from 'prop-types';
import ModalForm from './ModalForm/ModalForm';
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';

import './Modal.css';

let classrooms = [];
let teachers = [];

class Modal extends React.Component{
	
	componentDidMount(){
		fetch('http://localhost:3000/api/sala')
		.then(res => res.json())
		.then(data => {classrooms = data})
		fetch('http://localhost:3000/api/professor')
		.then(res => res.json())
		.then(data => {teachers = data;})
		document.addEventListener("keydown", this.escFunction, false);
	}
	
  escFunction = (event) => {
    if(event.keyCode === 27) {
      this.props.toggleModal()
    }
  }

	render(){
		return(
			<div className="modal">
	      <div className="modal-content">
	      	<button 
      	  	onClick={this.props.toggleModal} 
      	  	className="close-button close-button--modal"
      	  >
      	  </button>
	      	
	      	<ModalForm 
	      		classrooms={classrooms} 
	      		teachers={teachers} 
	      		getCourses={this.props.getCourses}
	      		toggleModal={this.props.toggleModal}
	      		highestID={this.props.highestID}
	      	/>
	        
		    </div>
		  </div>
		)
	}
}
Modal.propTypes = {
  getCourses: PropTypes.func.isRequired,
  highestID: PropTypes.object,
  toggleModal: PropTypes.func.isRequired
};
export default Modal;
