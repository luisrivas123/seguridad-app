import React from "react";

const SECURITY_CODE = "paradigma"

// creando componente usando funciones
// Se definen las propiedades
function UseState({ name }) {

    const [state, setState] = React.useState({
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false,
    });

    // const [value, setValue] = React.useState('');
    // // Se crea un estado de error 
    // const [error, setError] = React.useState(false);
    // const [loading, setLoading] = React.useState(false);

    console.log(state)

    // evento actualizador del estado
    const onConfirm = () => {
        setState({
            // Guarda el estado anterior
            ...state,
            loading: false,
            error: false,
            confirmed: true,
        });
    };
    //
    const onError = () => {
        setState({
            ...state,
            error: true,
            loading: false
        });
    };
    //
    const onWrite = (newValue) => {
        setState({
            ...state,
            value: newValue,
        });
    }
    //
    const onCheck = () => {
        setState({
            ...state,
            loading: true
        });
    }
    //
    const onDelete = () => {
        setState({ 
            ...state,
            deleted: true,
        });
    }
    //
    const onReset = () => {
        setState({ 
            ...state,
            confirmed: false,
            deleted: false,
            value: '',
        });
    }
    // Se utiliza el React Hook para el efecto de loading
    // El segundo argumento indica cunado se par generea el efecto o función
    React.useEffect(() => {
        console.log('Empezando el efecto')

        if(!!state.loading) {
            // Recibe dos argumentos la funcion y el intervalo de cafa cuanto s ejecuta la misma
            setTimeout(() => {
                console.log('Empezando validación')

                if (state.value === SECURITY_CODE){
                    onConfirm();
                } else {
                    onError();
                }
                
                console.log('Terminando validación')
            }, 3000)
        }
        
        console.log('Terminando el efecto')
    
    // Para que se ejecute el efecto solo cuando se actualiza el esato de carga
    }, [state.loading]);

    if (!state.deleted && !state.confirmed) {
        return (
            <div>
                {/* si el argumento es props usar props.name */}
                <h2>Eliminar {name}</h2>
    
                <p>Por favor escribe el código de seguridad</p>
    
                {/* Si error es verdadero renderiza */}
                {(state.error && !state.loading) && (
                    <p>Error: El código es incorrecto</p>
                )}
    
                {/* Si loading es verdadero */}
                {state.loading && (
                    <p>Cargando... </p>
                )}
    
                <input 
                    placeholder="Código de seguridad"
                    value={state.value}
                    // Actualizador del estado cuando los uarios cambien lo que escriben en el input
                    // se recibe el evento
                    onChange={(event) => {
                        onWrite(event.target.value);
                    }}
                />
                <button
                    // Actualizar estado con   un evento onClick en el boton 
                    onClick={() => {
                        onCheck();
                    }}
                >Comprobar</button>
            </div>
        );
    } else if (!!state.confirmed && !state.deleted) {
        return (
            <React.Fragment>
                <p>Estado de confirmación</p>

                <button
                    // Se llama al evento onClick
                    onClick={() => {
                        onDelete();
                    }}
                >
                    Si, Eliminar

                </button>

                <button
                    // Se llama al evento onClick
                    onClick={() => {
                        onReset();
                    }}
                >
                    No, desistir

                </button>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <p>Eliminado con éxito</p>

                <button
                    // Se llama al evento onClick
                    onClick={() => {
                        onReset();
                    }}
                >
                    resetear, volver atras

                </button>
            </React.Fragment>
        );
    }
}

export { UseState }