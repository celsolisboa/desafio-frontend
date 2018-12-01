import React from 'react';
import Button from '@material-ui/core/Button';
import mediumLogo from '../images/logo_medium.png';
import CourseCard from '../CourseCard/CourseCard';
import Modal from '../Modal/Modal';

class Home extends React.Component{
	state = {
    	courses: []
	}
	componentDidMount(){
		fetch('http://localhost:3000/api/curso')
		.then(res => res.json())
		.then(data => this.setState({courses:data.cursos}))
	}
	
	render(){
		return(
			<div>	
		        <main className="home">
		          <div className="courses">
		            <h2 className="page-title">Cursos</h2>
		            {this.state.courses.map(
		            	(course) =>
		            		<CourseCard course={course} key={course.id} />
		            	)
								}
		          </div>
		        </main>
		        <Modal coursesLen={this.state.courses.length} />
	        </div>
		)
	}
}
export default Home