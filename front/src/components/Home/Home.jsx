import React from 'react';
import PropTypes from 'prop-types';
import CourseCard from '../CourseCard/CourseCard';
import Modal from '../Modal/Modal';
import './Home.css';

class Home extends React.Component{
	state = {
    	courses: []
	}
	componentDidMount(){
		this.getCourses();
	}
	getCourses = () => {
		fetch('http://localhost:3000/api/curso')
		.then(res => res.json())
		.then(data => this.setState({courses:data.cursos}))
	}
	deleteCourse(course){
			const headers = {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			}
			fetch('http://localhost:3000/api/curso/'+course,
				{
					method: 'DELETE',
					headers: headers
				}
			)
			.then(res => {
				if(res.ok){
					const newArr = this.state.courses.filter(curr => curr.id !== course)
					this.setState({courses: newArr})
				}
			})
	}
	
	render(){
		return(
			<div>	
        <main className="home">
          <div className="courses">
            <h2 className="page-title home-title">Cursos</h2>
            <div className="cards-grid">
            {this.state.courses.map(
            	(course) =>
            		<CourseCard 
            			deleteCourse={(course) => this.deleteCourse(course)} 
            			course={course} 
            			key={course.id} />
            	)
						}
						</div>
          </div>
        </main>
        { this.props.isModalOpen 
        	&& <Modal 
        			getCourses={this.getCourses}
		        	toggleModal={this.props.toggleModal} 
		        	highestID={this.state.courses.slice().sort( (a,b) => b.id - a.id)[0]} 
		        />
        }
      </div>
		)
	}
}
Home.propTypes = {
	isModalOpen: PropTypes.bool.isRequired,
 	toggleModal: PropTypes.func.isRequired
};
export default Home