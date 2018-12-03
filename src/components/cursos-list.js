import React from 'react';
import axios from 'axios';

import closeGrey from '../assets/close_grey.png';
import closeWhite from '../assets/close_white.png';
import logoMedium from '../assets/logo_medium.png';

export default class CursosList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      cursos: [],
      professores: [],
      salas: [],
      showProfessores: false,
      showSalas: false,
      error: false,
      cursoEditId: null,
    };
  }

  componentWillMount() {
    function getCursos() {
      return axios.get(`http://localhost:3000/api/curso`);
    }
    function getProfessores() {
      return axios.get(`http://localhost:3000/api/professor`);
    }
    function getSalas() {
      return axios.get(`http://localhost:3000/api/sala`);
    }
    axios
      .all([getCursos(), getProfessores(), getSalas()])
      .then(
        axios.spread((curso, professor, sala) => {
          let cursos = curso.data.cursos;
          let professores = professor.data;
          let salas = sala.data;
          this.setState({
            cursos,
            professores,
            salas,
          });
        })
      )
      .catch(error => console.log(error));
  }

  showModal = (id = null) => {
    id
      ? this.setState({
          cursoEditId: id,
        })
      : this.setState({
          cursoEditId: null,
        });
    this.setState({
      showModal: !this.state.showModal,
    });
  };
  showProfessores = () => {
    this.setState({
      showProfessores: true,
    });
  };
  showSalas = () => {
    this.setState({
      showSalas: true,
    });
  };
  hideOptions = () => {
    this.state.showProfessores == true
      ? this.setState({
          showProfessores: false,
        })
      : null;
    this.state.showSalas == true
      ? this.setState({
          showSalas: false,
        })
      : null;
  };

  cursoReset = () => {
    this.setState({
      cursoNome: null,
      cursoInicio: null,
      cursoFim: null,
      cursoSalas: null,
      cursoProfessores: null,
    });
  };

  delete = id => {
    axios
      .delete(`http://localhost:3000/api/curso/${id}`)
      .then(() => {
        this.setState({
          cursos: this.state.cursos.filter(curso => {
            return curso.id != id;
          }),
        });
      })
      .catch(() => {
        console.log('erro');
      });
  };

  handleChangeCurso = event => {
    this.setState({ cursoNome: event.target.value });
  };
  handleChangeProfessores = event => {
    var options = event.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push({
          id: options[i].value,
          nome: options[i].text,
        });
      }
    }
    this.setState({ cursoProfessores: value });
  };
  handleChangeSalas = event => {
    var options = event.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push({
          id: options[i].value,
          sala: options[i].text,
        });
      }
    }
    this.setState({ cursoSalas: value });
  };
  handleChangeInicio = event => {
    this.setState({ cursoInicio: event.target.value });
  };
  handleChangeFim = event => {
    this.setState({ cursoFim: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const curso = {
      nome: this.state.cursoNome,
      inicio: this.state.cursoInicio,
      fim: this.state.cursoFim,
      salas: this.state.cursoSalas,
      professores: this.state.cursoProfessores,
    };

    if (this.state.cursoEditId) {
      curso.id = this.state.cursoEditId;
    } else {
      curso.id = this.state.cursos.length + 1;
    }

    if (
      !curso.id ||
      !curso.nome ||
      !curso.inicio ||
      !curso.fim ||
      !curso.salas ||
      !curso.professores
    ) {
      this.setState({ error: true });
      console.log('error');
      return;
    }

    if (this.state.cursoEditId) {
      axios
        .patch(`http://localhost:3000/api/curso/${curso.id}`, { ...curso })
        .then(() => {
          this.setState({
            showModal: false,
            cursos: this.state.cursos.map(curso => {
              curso.id == this.curso.id ? (curso = this.curso) : null;
            }),
            error: false,
          });
          this.cursoReset();
        })
        .catch(() => {
          this.setState({ error: true });
        });
    } else {
      axios
        .post(`http://localhost:3000/api/curso`, { ...curso })
        .then(() => {
          this.setState({
            showModal: false,
            cursos: this.state.cursos.concat(curso),
            error: false,
          });
          this.cursoReset();
        })
        .catch(() => {
          this.setState({ error: true });
        });
    }
  };

  render() {
    const {
      showModal,
      cursos,
      professores,
      salas,
      showProfessores,
      showSalas,
      cursoEditId,
      error,
    } = this.state;
    return (
      <section className="hero">
        <div className="header">
          <div className="header-itens">
            <figure className="image">
              <img src={logoMedium} alt="Celso Lisboa" />
            </figure>
            <button
              type="button"
              tabIndex="0"
              className="button is-rounded is-primary button-default button-rounded"
            >
              <p onClick={() => this.showModal()}>Criar</p>
            </button>
          </div>
        </div>
        <div className="container theme-default cursos-page">
          <h1 className="has-text-centered">Cursos</h1>
          <div className="cursos-list">
            {cursos
              ? cursos.map(curso => (
                  <div className="cursos-item" key={curso.id}>
                    <div className="curso-excluir">
                      <a
                        className="has-text-right"
                        onClick={() => this.delete(curso.id)}
                      >
                        <figure className="image is-16x16">
                          <img src={closeGrey} alt="Excluir" />
                        </figure>
                      </a>
                    </div>
                    <div onClick={() => this.showModal(curso.id)}>
                      <div className="curso-nome">
                        <h3>{curso.nome}</h3>
                      </div>
                      <div className="curso-prof-sala">
                        <p>
                          {curso.professores.map((professor, i, arr) => (
                            <span key={professor.id}>
                              {i === 0 ? 'Prof. ' : ''} {professor.nome}
                              {i < arr.length - 1 ? ' e ' : ''}
                            </span>
                          ))}
                        </p>
                        <p>
                          {curso.salas.map((sala, i, arr) => (
                            <span key={sala.id}>
                              {i === 0 ? 'Sala ' : ''} {sala.sala}
                              {i < arr.length - 1 ? ' e ' : ''}
                            </span>
                          ))}
                        </p>
                      </div>
                      <div className="curso-horario">
                        <p className="has-text-right">{`${curso.inicio} às ${
                          curso.fim
                        }`}</p>
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
        <div className={showModal ? 'modal-criar' : 'is-invisible'}>
          <div className="modal-criar-itens">
            <a className="modal-fechar" onClick={this.showModal}>
              <figure className="image is-16x16">
                <img src={closeWhite} alt="Excluir" />
              </figure>
            </a>
            {cursoEditId ? <h2>Editar Curso</h2> : <h2>Criar Curso</h2>}
            <input
              onChange={this.handleChangeCurso}
              className="input is-medium input-default"
              type="text"
              placeholder="Nome do curso"
            />
            <button
              type="button"
              onClick={this.showProfessores}
              tabIndex="0"
              className="button is-medium is-fullwidth button-default button-option"
            >
              Professores
            </button>
            {showProfessores ? (
              <div>
                <a className="option-fechar" onClick={this.hideOptions}>
                  <figure className="image is-16x16">
                    <img src={closeWhite} alt="Fechar" />
                  </figure>
                </a>
                <div className="select is-multiple select-default">
                  <select
                    multiple
                    size="5"
                    onChange={this.handleChangeProfessores}
                  >
                    {professores
                      ? professores.map(professor => (
                          <option value={professor.id} key={professor.id}>
                            {professor.nome}
                          </option>
                        ))
                      : null}
                  </select>
                </div>
              </div>
            ) : null}
            <button
              type="button"
              onClick={this.showSalas}
              tabIndex="0"
              className="button is-medium is-fullwidth button-default button-option"
            >
              Salas
            </button>
            {showSalas ? (
              <div>
                <a className="option-fechar" onClick={this.hideOptions}>
                  <figure className="image is-16x16">
                    <img src={closeWhite} alt="Fechar" />
                  </figure>
                </a>
                <div className="select is-multiple select-default">
                  <select multiple size="5" onChange={this.handleChangeSalas}>
                    {salas
                      ? salas.map(sala => (
                          <option value={sala.id} key={sala.id}>
                            {sala.sala}
                          </option>
                        ))
                      : null}
                  </select>
                </div>
              </div>
            ) : null}

            <div className="modal-horario">
              <input
                onChange={this.handleChangeInicio}
                className="input is-medium input-default"
                type="text"
                placeholder="Início"
              />
              <input
                onChange={this.handleChangeFim}
                className="input is-medium input-default"
                type="text"
                placeholder="Fim"
              />
            </div>
            <button
              onClick={this.handleSubmit}
              type="button"
              tabIndex="0"
              className="button is-medium is-primary is-fullwidth button-default"
            >
              Salvar
            </button>
            <p className={error ? 'help has-text-centered' : 'is-invisible'}>
              Algo deu errado, tente novamente.
            </p>
          </div>
        </div>
      </section>
    );
  }
}
