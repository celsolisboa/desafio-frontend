import React from 'react';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { SelectValidator} from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core/styles';
import {styles,MenuProps,getStyles} from '../../../common/MuiTheme.js';

class ModalSelects extends React.Component{
	render(){
		const {classes} = this.props;
		return(
			<section>
				<FormControl>
        	<FormHelperText>
        		{/*fixes style from Select Validator 
          	not accepting multiple values*/}
          	{
          		this.props.teacher.length > 1
          		? this.props.teacher.join(', ')
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
            value={this.props.teacher}
            onChange={this.props.handleSelectChange('teacher')}
            input={<OutlinedInput id="teacher" />}
            menuprops={MenuProps}
          >
            {this.props.teachers
            	.map(teacher => (
              <MenuItem 
              	onKeyUp={
              		(e, teacher) => 
              		this.props.suggestVal(e, this.props.teachers, 'nome')
              	}
              	style={getStyles('teacher', 
              		teacher.nome, 
              		this, 
              		this.props.suggestion)}
              	key={'professor'+teacher.id} 
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
          		this.props.classroom.length > 1 
          		? this.props.classroom.join(', ')
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
            value={this.props.classroom}
            onChange={this.props.handleSelectChange('classroom')}
            input={<OutlinedInput id="classroom" />}
            menuprops={MenuProps}
          >
            {this.props.classrooms.sort((a,b)=>a.sala-b.sala).map(classroom => (
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
      </section>
		)
	}
}
export default withStyles(styles, { withTheme: true })(ModalSelects);