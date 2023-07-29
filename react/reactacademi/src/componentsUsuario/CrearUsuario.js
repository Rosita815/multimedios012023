import React from 'react';
import ListarUsuario from './ListarUsuario';

class CrearUsuario extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
            name:"",
            email:"",
            password:"",
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
        
        const { name, email, password } = this.state;

        var datosenviar = {
            name:name,
            email:email,
            password:password
        }
        console.log(datosenviar);

        fetch("https://paginas-web-cr.com/ApiPHP/apis/InsertarUsuarios.php",
        {
            method:"POST",
            body:JSON.stringify(datosenviar)
        })//url de peticion de datos
        .then(respuesta => respuesta.json())//recibe los datos en formato json
        .then((datosrepuesta) => {            
            window.location = "ListarUsuario"
             //console.log('Datos',datosrepuesta)//Muestra el resultado de la peticion
        })
        .catch(console.log)//muestra errores
    }

    render() { 
        const { name, email, password, datosCargado } = this.state;
        return ( 

            <div>
                <h1>Crear Usuario</h1>
                <form className="container bg-danger bg-opacity-50 w-50 mt-5" id="formulario" onSubmit={this.guardarDatos}>
                    <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre</label>
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
                        className="form-control" name="password" id="password" aria-describedby="helpId" placeholder="Password del usuario"></input>
                        <small id="helpId" className="form-text text-muted">Ingresa el Password del usuario</small>
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
 
export default CrearUsuario; //