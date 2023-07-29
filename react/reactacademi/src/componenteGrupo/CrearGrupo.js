import React from 'react';
import ListarGrupo from './ListarGrupo';

class CrearGrupo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
            nombre:"",
            datosCargado:false
        }
    }

    cambioValor = (e) =>{
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState({state});
    }

    guardarDatos = (e) => {
        e.preventDefault();
        
        const { nombre } = this.state;

        var datosenviar = {
            nombre:nombre,
        }
        console.log(datosenviar);

        fetch("https://paginas-web-cr.com/ApiPHP/apis/InsertarGrupo.php",
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

    render() { 
        const { nombre, datosCargado } = this.state;
        return ( 

            <div>
                <h1>Crear Grupo</h1>
                <form className="container bg-danger bg-opacity-50 w-50 mt-5" id="formulario" onSubmit={this.guardarDatos}>
                    <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input type="text" required onChange={this.cambioValor} value={nombre}
                        className="form-control" name="nombre" id="nombre" aria-describedby="helpId" placeholder="Nombre del curso"></input>
                    <small id="helpId" className="form-text text-muted">Ingresa el nombre del curso</small>
                    </div>      
                    <div className="mb-3">
                        <button type="reset" className="btn btn-danger">Limpiar</button>
                        <button type="submit" className="btn btn-primary">✅Crear</button>

                    </div>                         
            </form>

            </div>

         );
    }
}
 
export default CrearGrupo;