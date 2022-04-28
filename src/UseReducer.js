import React from "react";

const SECURITY_CODE = "paradigma"

// creando componente usando funciones
// Se definen las propiedades
function UseReducer({ name }) {

    // "React.useReducer" recibe el redcucer y el objeto con los eatdos iniciales
    // const [state, setState] = React.useReducer(reducer, {
        
    // });

    const [state, dispatch] = React.useReducer(reducer, initialState);

    // Funciones actualizadoras del estado, "action creators"

    const onConfirm = () => dispatch({ type: actionTypes.confirm });
    const onError = () => dispatch({ type: actionTypes.error });
    const onCheck = () => dispatch({ type: actionTypes.check });
    const onDelete = () => dispatch({ type: actionTypes.delete });
    const onReset = () => dispatch({ type: actionTypes.reset });
    const onWrite = (event) => dispatch({ type: actionTypes.write, payload: event.target.value });

    // const onWrite = ({ target: {value} }) => {
        // dispatch({ type: actionTypes.write, payload: value });
    // }
    
    React.useEffect(() => {
        console.log('Empezando el efecto')

        if(!!state.loading) {
            // Recibe dos argumentos la funcion y el intervalo de cada cuanto se ejecuta la misma
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
                    onChange={onWrite}
                />
                <button onClick={onCheck}>
                    Comprobar
                </button>
            </div>
        );
    } else if (!!state.confirmed && !state.deleted) {
        return (
            <React.Fragment>
                <p>Estado de confirmación</p>

                <button onClick={onDelete}>
                    Si, Eliminar
                </button>

                <button onClick={onReset}>
                    No, desistir
                </button>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <p>Eliminado con éxito</p>

                <button onClick={onReset}>
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

// actionTypes para evitar errores orotgráficos 

const actionTypes = {
    confirm: 'CONFIRM',
    error: 'ERROR',
    delete: 'DELETE',
    write: 'WRITE',
    check: 'CHECK',
    reset: 'RESET',
}

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
    [actionTypes.confirm]: {
        // Guarda el estado anterior
        ...state,
        loading: false,
        error: false,
        confirmed: true,
    },
    [actionTypes.error]: {
        ...state,
        error: true,
        loading: false,
    },
    [actionTypes.write]: {
        ...state,
        value: payload
    },
    [actionTypes.check]: {
        ...state,
        loading: true,
    },
    [actionTypes.delete]: { 
        ...state,
        deleted: true,
    },
    [actionTypes.reset]: { 
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