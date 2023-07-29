import React from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

class Menu extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return (
            <Navbar expand="lg" className="bg-info fs-5 ">
            <Container>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="index">🏠Home</Nav.Link>
                   <NavDropdown  title="📚Cursos" id="basic-nav-dropdown">
                    <NavDropdown.Item className="bg-info fs-5 "href="/ListarCurso">🗒️Listar Curso</NavDropdown.Item>
                     <NavDropdown.Item className="bg-info fs-5" href="/CrearCurso">📝Crear Curso</NavDropdown.Item>
                  </NavDropdown>
                   <NavDropdown title="👥Grupos" id="basic-nav-dropdown">
                    <NavDropdown.Item className="bg-info fs-5" href="/ListarGrupo">🗒️Listar Grupos</NavDropdown.Item>
                     <NavDropdown.Item className="bg-info fs-5" href="/CrearGrupo">📝Crear Grupo</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="🧑🏼‍💼Usuarios" id="basic-nav-dropdown">
                    <NavDropdown.Item className="bg-info fs-5" href="/ListarUsuario">🗒️Listar Usuarios</NavDropdown.Item>
                     <NavDropdown.Item className="bg-info fs-5"  href="/CrearUsuario">🪪Crear Usuario</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>              
           
          );
    }
}
 
export default Menu;