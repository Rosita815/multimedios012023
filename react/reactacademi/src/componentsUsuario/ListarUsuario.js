import React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
//imr

//ccc
class ListarUsuario extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datosCargado:false,
            datosUsuario: [],
            stateModal: false,
            name:"",
            email:"",
            password:"",
            id:"",
        }
    }

    cargarDatos(){
        
        fetch("https://paginas-web-cr.com/ApiPHP/apis/ListaUsuarios.php")//url de peticion de datos
        .then(respuesta => respuesta.json())//recibe los datos en formato json
       .then((datosrepuesta) => {
            this.setState( {datosrepuesta:true, datosUsuario: datosrepuesta.data} )
            console.log('Datos',datosrepuesta.data)//Muestra el resultado de la peticion
       })
       .catch(console.log)//muestra errores
    }

    
    editar(objeto){
        this.openModal();
        this.setState({  name:objeto.name,
        email:objeto.email,
        password:objeto.password,
        id:objeto.id   });
        console.log(objeto);
    }

    guardarDatos = (e) => {
        e.preventDefault();
        
        const { name, password ,id } = this.state;

        var datosenviar = {
            id:id,
            name:name,
            // email:email,
            password:password
        }
        console.log(datosenviar);

        fetch("https://paginas-web-cr.com/ApiPHP/apis/ActualizarUsuarios.php",
        {
            method:"POST",
            body:JSON.stringify(datosenviar)
        })//url de peticion de datos
        .then(respuesta => respuesta.json())//recibe los datos en formato json
        .then((datosrepuesta) => {            
            window.location = "ListarUsuario";
             //console.log('Datos',datosrepuesta)//Muestra el resultado de la peticion
        })
        .catch(console.log)//muestra errores
    }

    closeModal(){
        this.setState({stateModal:false});
    }

    openModal(){
        this.setState({stateModal:true});
    }

    cambioValor = (e) =>{
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState({state});
    }

    componentDidMount(){
        this.cargarDatos()
    }

    state = {  }
    render() { 

        const { datosCargado, datosUsuario, stateModal, name, email, password, id } = this.state;

        return ( 
            <div className="bg-danger bg-opacity-50 ">
                <h1>Lista Usuario</h1>

      <Modal show = {stateModal}>
        <Modal.Header className="bg-success bg-opacity-50 " >
          <Modal.Title>Detalle Usuario</Modal.Title>
        <Button variant="secondary" onClick={() => this.closeModal()}>
                    ❌Close
        </Button>
        </Modal.Header>
        <Modal.Body className="container bg-danger bg-opacity-50 " >
            
        <form className="container bg-danger bg-opacity-50 " id="formulario " onSubmit={this.guardarDatos}>
            <div className="mb-3">
                <input type="hidden" id="id" name="id"></input>
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" required onChange={this.cambioValor} value={name}
                className="form-control" name="name" id="name" aria-describedby="helpId" placeholder="Nombre del usuario"></input>
                <small id="helpId" className="form-text text-muted">Ingresa el nombre del usuario</small>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="text" required onChange={this.cambioValor} value={email}
                    className="form-control" name="email" id="email" aria-describedby="helpId" placeholder="Email del usuario"></input>
                <small id="helpId" className="form-text text-muted">Ingresa el email del usuario</small>
                </div>
                <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="text" required onChange={this.cambioValor} value={password}
                    className="form-control" name="password" id="password" aria-describedby="helpId" placeholder="Password del Usuario"></input>
                <small id="helpId" className="form-text text-muted">Ingresa el password del usuario</small>
                </div>                       
                <div className="mb-3">
                <button type="submit" className="btn btn-primary mb-3">✅Editar</button>
                </div>                         
        </form>

        </Modal.Body>
        <Modal.Footer className="bg-success bg-opacity-50 ">         
        </Modal.Footer>
      </Modal>
                <div className="table-responsive">
                    <table className="table table-success  table-bordered border-success">
                        <thead>
                            <tr>
                                <th scope="col">🔑Id</th>
                                <th scope="col">🎭Nombre</th>
                                <th scope="col">📧Email</th>
                                <th scope="col">🔒Password</th>
                                <th>🕹️Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                datosUsuario.map (
                                    (datosExtraido)=>(
                                        <tr key={datosExtraido.id} className="table table-danger  table-bordered border-danger">
                                            <td>{datosExtraido.id}</td>
                                            <td>{datosExtraido.name}</td>
                                            <td>{datosExtraido.email}</td>
                                            <td>{datosExtraido.password}</td>
                                            <td>
                                                <a name="" id="" className="btn btn-primary" onClick={()=>this.editar(datosExtraido)} role="button">✅Editar</a>
                                            </td>
                                        </tr> 
                                    )

                                )
                            }
        
                        </tbody>
                    </table>
                </div>
                
            </div>
         );
    }
}
 
export default ListarUsuario;