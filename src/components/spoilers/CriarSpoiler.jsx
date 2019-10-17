import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class CriarSpoiler extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spoiler: {
        espoliador: "",
        descricao: "",
        titulo: ""
      },
      erro: null,
      redirect: false
    };
  }

  exibeErro() {
    const { erro } = this.state;

    if (erro) {
      return (
        <div className="alert alert-danger" role="alert">
          Erro de conexão com o servidor
        </div>
      );
    }
  }

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/" />;
    } else {
      return (
        <form onSubmit={this.handleSubmit}>
          {this.exibeErro()}

          <fieldset>
            <legend>Criar Spoiler</legend>
            <div className="form-group">
              <label htmlFor="espoliador">Espoliador</label>
              <input
                type="text"
                className="form-control"
                id="espoliador"
                name="espoliador"
                placeholder="zededeus"
                minLength="2"
                maxLength="40"
                value={this.state.spoiler.espoliador}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="titulo">Título</label>
              <input
                type="text"
                className="form-control"
                id="titulo"
                name="titulo"
                aria-describedby="tituloAjuda"
                placeholder="Hereditário"
                minLength="2"
                maxLength="255"
                value={this.state.spoiler.titulo}
                onChange={this.handleInputChange}
              />
              <small id="tituloAjuda" className="form-text text-muted">
                Um título pode ser um filme, série, livro...
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="descricao">Descrição</label>
              <textarea
                className="form-control"
                id="descricao"
                name="descricao"
                placeholder="Charlie é Paimon"
                minLength="2"
                maxLength="255"
                value={this.state.spoiler.descricao}
                onChange={this.handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Enviar
            </button>
          </fieldset>
        </form>
      );
    }
  }

  handleInputChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState(prevState => ({
      spoiler: { ...prevState.spoiler, [name]: value }
    }));

    fetch(`http://dominio/da/api/cursos`)
      .then(resposta => {
        this.setState(prevState => ({
          cursos: { ...prevState.spoiler, cursos }
        }));
      })
      .catch(erro => this.setState({ erro }));
  };

  handleSubmit = event => {
    fetch("http://localhost:3000/api/spoilers", {
      method: "post",
      body: JSON.stringify(this.state.spoiler),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(data => {
        if (data.ok) {
          this.setState({ redirect: true });
        } else {
          data.json().then(data => {
            if (data.error) {
              this.setState({ erro: data.error });
            }
          });
        }
      })
      .catch(erro => this.setState({ erro: erro }));

    event.preventDefault();
  };
}

export default CriarSpoiler;
