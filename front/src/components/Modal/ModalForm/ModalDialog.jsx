import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

class ModalDialog extends React.Component{	
	render(){
		return (
			<Dialog
		    open={this.props.hasResponse}
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
  	)
	}
}
export default ModalDialog;