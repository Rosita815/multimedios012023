import React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
//imr

//ccc
class ListarCurso extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datosCargado:false,
            datosCurso: [],
            stateModal: false,
            nombre:"",
            descripcion:"",
            tiempo:"",
            id:"",
            usuario:""
        }
    }

    cargarDatos(){
        
        fetch("https://paginas-web-cr.com/ApiPHP/apis/ListaCurso.php")//url de peticion de datos
        .then(respuesta => respuesta.json())//recibe los datos en formato json
       .then((datosrepuesta) => {
            this.setState( {datosrepuesta:true, datosCurso: datosrepuesta.data} )
            console.log('Datos',datosrepuesta.data)//Muestra el resultado de la peticion
       })
       .catch(console.log)//muestra errores
    }

    eliminar(id){
        var datosenviar = {
            id: id
        }        
        fetch("https://paginas-web-cr.com/ApiPHP/apis/BorrarCursos.php",
        {
            method:"POST",
            body:JSON.stringify(datosenviar)
        })//url de peticion de datos
        .then(respuesta => respuesta.json())//recibe los datos en formato json
        .then((datosrepuesta) => {    
            window.location = "ListarCurso"
            
        })
        .catch(console.log)//muestra errores
    }
    
    editar(objeto){
        this.openModal();
        this.setState({  nombre:objeto.nombre,
        descripcion:objeto.descripcion,
        tiempo:objeto.tiempo,
        id:objeto.id,
        usuario:objeto.usuario   });
        console.log(objeto);
    }

    guardarDatos = (e) => {
        e.preventDefault();
        
        const { nombre, descripcion, tiempo,id,usuario } = this.state;

        var datosenviar = {
            id:id,
            nombre:nombre,
            descripcion:descripcion,
            tiempo:tiempo,
            usuario:usuario
        }
        console.log(datosenviar);

        fetch("https://paginas-web-cr.com/ApiPHP/apis/ActualizarCursos.php",
        {
            method:"POST",
            body:JSON.stringify(datosenviar)
        })//url de peticion de datos
        .then(respuesta => respuesta.json())//recibe los datos en formato json
        .then((datosrepuesta) => {            
            window.location = "ListarCurso"
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

        const { datosCargado, datosCurso, stateModal, nombre, descripcion, tiempo, id, usuario } = this.state;

        return ( 
            <div className="bg-danger bg-opacity-50 ">
                <h1>Lista Curso</h1>

      <Modal show = {stateModal}>
        <Modal.Header className="bg-success bg-opacity-50 ">
          <Modal.Title>Detalle Curso</Modal.Title>
          <Button variant="secondary" onClick={() => this.closeModal()}>
                    ❌Close
            </Button>
        </Modal.Header>
        <Modal.Body className="container bg-danger bg-opacity-50 " >
            
        <form className="container bg-danger bg-opacity-50 " id="formulario" onSubmit={this.guardarDatos}>
            <div className="mb-3">
                <input type="hidden" id="id" name="id"></input>
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input type="text" required onChange={this.cambioValor} value={nombre}
                className="form-control" name="nombre" id="nombre" aria-describedby="helpId" placeholder="Nombre del curso"></input>
                <small id="helpId" className="form-text text-muted">Ingresa el nombre del curso</small>
            </div>
            <div className="mb-3">
                <label htmlFor="descripcion" className="form-label">Descripcion</label>
                <input type="text" required onChange={this.cambioValor} value={descripcion}
                    className="form-control" name="descripcion" id="descripcion" aria-describedby="helpId" placeholder="Descripcion del curso"></input>
                <small id="helpId" className="form-text text-muted">Ingresa la Descripcion del curso</small>
                </div>
                <div className="mb-3">
                <label htmlFor="tiempo" className="form-label">Tiempo</label>
                <input type="text" required onChange={this.cambioValor} value={tiempo}
                    className="form-control" name="tiempo" id="tiempo" aria-describedby="helpId" placeholder="Tiempo del curso"></input>
                <small id="helpId" className="form-text text-muted">Ingresa el Tiempo del curso</small>
                </div>     
                <div className="mb-3">
                    <label htmlFor="usuario" className="form-label">Usuario</label>
                    <input type="text" required onChange={this.cambioValor} value={usuario}
                        className="form-control" name="usuario" id="usuario" aria-describedby="helpId" placeholder="Usuario"></input>
                    <small id="helpId" className="form-text text-muted">Ingresa el usuario</small>
                </div>                     
                <div className="mb-3">
                <button type="reset" className="btn btn-danger">Limpiar</button>
                <button type="submit" className="btn btn-primary">✅Editar</button>
               
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
                                <th scope="col">📚Descripcion</th>
                                <th scope="col">📆Tiempo</th>
                                <th scope="col">🧑🏼‍💼Usuario</th>
                                <th>🕹️Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                datosCurso.map (
                                    (datosExtraido)=>(
                                        <tr key={datosExtraido.id} className="table table-danger  table-bordered border-danger">
                                            <td>{datosExtraido.id}</td>
                                            <td>{datosExtraido.nombre}</td>
                                            <td>{datosExtraido.descripcion}</td>
                                            <td>{datosExtraido.tiempo}</td>
                                            <td>{datosExtraido.usuario}</td>
                                            <td>
                                                <a name="" id="" className="btn btn-danger mb-3" onClick={()=>this.eliminar(datosExtraido.id)} role="button">❌Borrar</a>
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
 
export default ListarCurso;