import React from "react";
import { Loading } from './Loading';

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
            // Estado de error para generar efecto de carga
            loading: false,
        };
    }

    // metodos del ciclo de vida

    // Se ejecuta antes de renderizar el componente la primera vez
    //componentWillMount() {
    // UNSAFE_componentWillMount() {
    //     console.log("Component Will Mount")
    // }
    
    // componentDidMount() {
    //     console.log("componentDidMount")
    // }

    // se ejecuta cada que se actualiza el estado 
    componentDidUpdate(){
        console.log("Actualización")

        // Valida si loading es true

        if(!!this.state.loading) {
            // Recibe dos argumentos la funcion y el intervalo de cafa cuanto s ejecuta la misma
            setTimeout(() => {
                console.log('Empezando validación')

                // Actualiza el estado

                this.setState({ loading: false });

                console.log('Terminando validación')
            }, 3000);
        }
    }

    render() {
        return(
            <div>

                <h2>Eliminar {this.props.name}</h2>

                <p>Por favor escribe el código de seguridad</p>

                {this.state.error && (
                <p>Error: El código es incorrecto</p>
                )}

                
                {this.state.loading && (
                    // Componente loading
                    <Loading />
                )}

                <input placeholder="Código de seguridad"/>
                <button
                    // se utiliza la función "setSate" que viene del metodo "React.Compoent"
                    // Se crea un evento en el boton y se le envia la función con el actualizador del estado
                    // Se indica que estado actualizar enviando un objeto
                    onClick={() => 
                        // Actualizar el estado
                        // this.setState({ error: !this.state.error})
                        this.setState({ loading: true})
                    }
                >Comprobar</button>
            </div>
        );
    }
}

export { ClassState }