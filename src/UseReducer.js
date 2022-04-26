import React from "react";

const SECURITY_CODE = "paradigma"

// creando componente usando funciones
// Se definen las propiedades
function UseReducer({ name }) {

    // "React.useReducer" recibe el redcucer y el objeto con los eatdos iniciales
    // const [state, setState] = React.useReducer(reducer, {
        
    // });

    const [state, dispatch] = React.useReducer(reducer, initialState);

    //
    // const onWrite = (newValue) => {
    //     setState({
    //         ...state,
    //         value: newValue,
    //     });
    // }
    // Se utiliza el React Hook para el efecto de loading
    // El segundo argumento indica cunado se par generea el efecto o función
    React.useEffect(() => {
        console.log('Empezando el efecto')

        if(!!state.loading) {
            // Recibe dos argumentos la funcion y el intervalo de cafa cuanto s ejecuta la misma
            setTimeout(() => {
                console.log('Empezando validación')

                if (state.value === SECURITY_CODE){
                    // onConfirm();
                    dispatch({ type: 'CONFIRM' });
                } else {
                    // onError();
                    dispatch({ type: 'ERROR' });
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
                        // onWrite(event.target.value);
                        // dispatch({ type: 'WRITE', payload: { ...} });
                        dispatch({ type: 'WRITE', payload: event.target.value });
                    }}
                />
                <button
                    // Actualizar estado con   un evento onClick en el boton 
                    onClick={() => {
                        // onCheck();
                        dispatch({ type: 'CHECK' });
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
                        // onDelete();
                        dispatch({ type: 'DELETE' });
                    }}
                >
                    Si, Eliminar

                </button>

                <button
                    // Se llama al evento onClick
                    onClick={() => {
                        // onReset();
                        dispatch({ type: 'RESET' });
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
                        // onReset();
                        dispatch({ type: 'RESET' });
                    }}
                >
                    resetear, volver atras

                </button>
            </React.Fragment>
        );
    }
}

const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
};

// formas de crear un reducer

// const reducer = (state, action) => {

// }

// 1
// const reducer = (state, action) => {
//     if (action.type === 'ERROR'){
//         return {
//             ...state,
//             error: true,
//             loading: false,
//         };
//     } else if (action.type === 'CHECK') {
//         return{
//             ...state,
//             loading: true,
//         };
//     } else {
//         return {
//             ...state,
//         };
//     }
// };

// 2 forma comun de crear un reducer

// const reducerSwitch = (state, action) => {
//     switch (){
//         case 'ERROR':
//             return {
//                 ...state,
//                 error: true,
//                 loading: false,
//             };
//         case 'CHECK':
//             return {
//                 ...state,
//                 loading: true,
//             };
//         default:
//             return {
//                 ...state
//             };
//     }
// }

// 3 reducer de como objeto, arrow function para retornar se forma implicita

const reducerObject = (state, payload) => ({
    'CONFIRM': {
        // Guarda el estado anterior
        ...state,
        loading: false,
        error: false,
        confirmed: true,
    },
    'ERROR': {
        ...state,
        error: true,
        loading: false,
    },
    'WRITE': {
        ...state,
        value: payload
    },
    'CHECK': {
        ...state,
        loading: true,
    },
    'DELETE': { 
        ...state,
        deleted: true,
    },
    'RESET': { 
        ...state,
        confirmed: false,
        deleted: false,
        value: '',
    },
});

const reducer = (state, action) => {
    if (reducerObject(state)[action.type]) {
        return reducerObject(state, action.payload)[action.type]
    } else {
        return state;
    }
};

export { UseReducer };