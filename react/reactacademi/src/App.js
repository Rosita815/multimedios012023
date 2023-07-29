import logo from './logo.svg';
import ListarCurso from './componentsCurso/ListarCurso';
import CrearCurso from './componentsCurso/CrearCurso';
import ListarGrupo from './componenteGrupo/ListarGrupo';
import CrearGrupo from './componenteGrupo/CrearGrupo';
import ListarUsuario from './componentsUsuario/ListarUsuario';
import CrearUsuario from './componentsUsuario/CrearUsuario';
import Menu from './componentsPlantilla/Menu';
import 'bootstrap/dist/css/bootstrap.css';

import {Route, BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import Container from 'react-bootstrap/esm/Container';

function App() {
  return (
    <div className="App">
      <Menu></Menu>
      <Router>
        <Route exact path="/"></Route>
        <Route path="/ListarCurso" component={ListarCurso}></Route>
        <Route path="/CrearCurso" component={CrearCurso}></Route>
        <Route path="/ListarGrupo" component={ListarGrupo}></Route>
        <Route path="/CrearGrupo" component={CrearGrupo}></Route>
        <Route path="/ListarUsuario" component={ListarUsuario}></Route>
        <Route path="/CrearUsuario" component={CrearUsuario}></Route>
      </Router>      
    </div>
  );
}


export default App;



