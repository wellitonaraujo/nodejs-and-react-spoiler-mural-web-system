import React, { Component } from "react";
import robot from "./../../assets/robot.png";
import { Link } from "react-router-dom";

class ListarSpoiler extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spoilers: [],
      erro: null
    };
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/spoilers`)
      .then(spoilers =>
        spoilers.json().then(spoilers => this.setState({ spoilers }))
      )
      .catch(erro => this.setState({ erro }));
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

  exibeSpoilers() {
    const { spoilers } = this.state;

    if (spoilers && spoilers.length) {
      return spoilers.map((item, indice) => (
        <div key={indice} className="card mb-4">
          <h5 className="card-header">{item.espoliador}</h5>
          <div className="card-body">
            <div className="media">
              <img className="mr-3" src={robot} alt="Spoiler" />
              <div className="media-body">
                <h5 className="mt-0 mb-1">{item.titulo}</h5>
                <p>{item.descricao}</p>
              </div>
            </div>
            <div className="text-right">
              <Link
                to={`/remover/${item.id}`}
                className="btn btn-danger mr-3"
                role="button"
              >
                Remover
              </Link>
              <Link
                to={`/editar/${item.id}`}
                className="btn btn-primary"
                role="button"
              >
                Editar
              </Link>
            </div>
          </div>
        </div>
      ));
    } else {
      return (
        <div className="alert alert-light" role="alert">
          Sem spoilers ainda. Faça spoilers não faça guerra :)
        </div>
      );
    }
  }

  render() {
    return <div>{this.exibeErro() || this.exibeSpoilers()}</div>;
  }
}

export default ListarSpoiler;
