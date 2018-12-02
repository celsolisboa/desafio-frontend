import React from 'react';
import axios from 'axios';

export default class CursosList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    axios
      .get(`http://localhost:3000/api/curso`)
      .then(res => {
        this.setState({ cursos: res.data.cursos });
        console.log(this.state.cursos);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <section className="hero">
        <div className="container theme-default">
          <h1 className="has-text-centered">Cursos</h1>
        </div>
      </section>
    );
  }
}
