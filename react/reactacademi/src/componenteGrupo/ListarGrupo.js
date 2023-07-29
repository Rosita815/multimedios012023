import React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
//imr

//ccc
class ListarGrupo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datosCargado:false,
            datosGrupo: [],
            stateModal: false,
            nombre:"",
            id:""
        }
    }

    cargarDatos(){
        
        fetch("https://paginas-web-cr.com/ApiPHP/apis/ListaGrupo.php")//url de peticion de datos
        .then(respuesta => respuesta.json())//recibe los datos en formato json
       .then((datosrepuesta) => {
            this.setState( {datosrepuesta:true, datosGrupo: datosrepuesta.data} )
            console.log('Datos',datosrepuesta.data)//Muestra el resultado de la peticion
       })
       .catch(console.log)//muestra errores
    }

    eliminar(id){
        var datosenviar = {
            id: id
        }        
        fetch("https://paginas-web-cr.com/ApiPHP/apis/BorrarGrupo.php",
        {
            method:"POST",
            body:JSON.stringify(datosenviar)
        })//url de peticion de datos
        .then(respuesta => respuesta.json())//recibe los datos en formato json
        .then((datosrepuesta) => {    
            window.location = "ListarGrupo"
            
        })
        .catch(console.log)//muestra errores
    }
    
    editar(objeto){
        this.openModal();
        this.setState({  nombre:objeto.nombre,
        id:objeto.id });
        console.log(objeto);
    }

    guardarDatos = (e) => {
        e.preventDefault();
        
        const { nombre,id } = this.state;

        var datosenviar = {
            id:id,
            nombre:nombre
        }
        console.log(datosenviar);

        fetch("https://paginas-web-cr.com/ApiPHP/apis/ActualizarGrupo.php",
        {
            method:"POST",
            body:JSON.stringify(datosenviar)
        })//url de peticion de datos
        .then(respuesta => respuesta.json())//recibe los datos en formato json
        .then((datosrepuesta) => {            
            window.location = "ListarGrupo"
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

        const { datosCargado, datosGrupo, stateModal, nombre, id} = this.state;

        return ( 
            <div className="bg-danger bg-opacity-50 ">
                <h1>Lista Grupo</h1>

      <Modal show = {stateModal}>
        <Modal.Header className="bg-success bg-opacity-50 ">
          <Modal.Title>Detalle Grupo</Modal.Title>
          <Button variant="secondary" onClick={() => this.closeModal()}>
                    ❌Close
        </Button>
        </Modal.Header>
        <Modal.Body className="container bg-danger bg-opacity-50 ">
            
        <form className="container bg-danger bg-opacity-50 " id="formulario" onSubmit={this.guardarDatos}>
            <div className="mb-3">
                <input type="hidden" id="id" name="id"></input>
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input type="text" required onChange={this.cambioValor} value={nombre}
                className="form-control" name="nombre" id="nombre" aria-describedby="helpId" placeholder="Nombre del curso"></input>
                <small id="helpId" className="form-text text-muted">Ingresa el nombre del curso</small>
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
                                <th>🕹️Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                datosGrupo.map (
                                    (datosExtraido)=>(
                                        <tr key={datosExtraido.id} className="table table-danger  table-bordered border-danger">
                                            <td>{datosExtraido.id}</td>
                                            <td>{datosExtraido.nombre}</td>
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
 
export default ListarGrupo;