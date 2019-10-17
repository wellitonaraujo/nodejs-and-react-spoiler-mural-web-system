import React, { Component } from "react";
import ListarSpoiler from "./components/spoilers/ListarSpoiler";
import CriarSpoiler from "./components/spoilers/CriarSpoiler";
import EditarSpoiler from "./components/spoilers/EditarSpoiler";
import ConfirmarRemoverSpoiler from "./components/spoilers/ConfirmarRemoverSpoiler";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <div className="jumbotron jumbotron-fluid">
            <div className="container">
              <Link to="/">
                <h1 className="display-4">#Spoilers</h1>
              </Link>
              <p className="lead">
                Não se preocupe, tudo aqui é brincadeira. Ou não :)
              </p>
              <Link to="/criar" className="btn btn-light">
                Criar
              </Link>
            </div>
          </div>
          <div className="container">
            <div className="row justify-content-md-center">
              <main className="col-xl-4" role="main">
                <Route path="/" exact component={ListarSpoiler} />
                <Route path="/criar/" component={CriarSpoiler} />
                <Route path="/editar/:id" component={EditarSpoiler} />
                <Route
                  path="/remover/:id"
                  component={ConfirmarRemoverSpoiler}
                />
              </main>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
