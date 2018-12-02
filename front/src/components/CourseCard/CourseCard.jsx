import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import './CourseCard.css';

const CourseCard = props => (
		<Card className="card">
      <CardContent style={{padding: '20px 15px'}}>
        <button 
        	onClick={() => props.deleteCourse(props.course.id)}
        	className="close-button close-button--card">
  	    </button>
        <h3 className="card-title">
          {props.course.nome}
        </h3>
        <p className="card-text">
          {props.course.professores.map(prof => prof.nome).join(', ')}
        </p>
        <div className="card-row">
          <p className="card-text">
	          {props.course.salas.map(sala => sala.sala).join(', ')}
	        </p>
          <p className="card-text">
            {props.course.inicio} às {props.course.fim}
        	</p>
      	</div>
      </CardContent>
	  </Card>
)

export default CourseCard