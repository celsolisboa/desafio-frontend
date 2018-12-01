import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const CourseCard = props => (
		<Card style={{margin: '10px 0'}}>
	      <CardContent style={{padding: '20px 15px'}}>
	        <button className="close-button close-button--card">
    	    </button>
	        <h3 className="card-title">
	          {props.course.nome}
	        </h3>
	        <p style={{margin: 0}}>
	          {props.course.professores.map(prof => prof.nome).join(', ')}
	        </p>
	        <div style={{'display': 'flex', 'justifyContent': 'space-between'}}>
	          <p style={{margin: 0}}>
	          {props.course.salas.map(sala => sala.sala).join(', ')}
	        </p>
	          <p style={{margin: 0}}>
	            {props.course.inicio} às {props.course.fim}
	        </p>
	      </div>
	        
	      </CardContent>
	    </Card>
)

export default CourseCard