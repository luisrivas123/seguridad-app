import React from "react";

// Componente creado con clases

class ClassState extends React.Component {
    // Manejo del estdo con clases
    constructor(props){
        // Función super para modificar "this" en una clase se llama desde el costructoa a "super"
        // Se pasan las props a 
        super(props);
        // Objeto con cada uno de los estados
        this.state = {
            // Estado de error para la prueba del código de seguridad
            error: false,
        };
    }

    render() {
        return(
            <div>

                <h2>Eliminar {this.props.name}</h2>

                <p>Por favor escribe el código de seguridad</p>

                {this.state.error && (
                <p>Error: El código es incorrecto</p>
                )}

                <input placeholder="Código de seguridad"/>
                <button
                    // se utiliza la función "setSate" que viene del metodo "React.Compoent"
                    // Se crea un evento en el boton y se le envia la función con el actualizador del estado
                    // Se indica que estado actualizar enviando un objeto
                    onClick={() => 
                        // Actualizar el estado
                        this.setState({ error: !this.state.error})
                    }
                >Comprobar</button>
            </div>
        );
    }
}

export { ClassState }