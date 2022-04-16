import React from "react";

// creando componente usando funciones
// Se definen las propiedades
function UseState({ name }) {
    // Se crea un estado de error 
    const [error, setError] = React.useState(false);

    return (
        <div>
            {/* si el argumento es props usar props.name */}
            <h2>Eliminar {name}</h2>

            <p>Por favor escribe el código de seguridad</p>

            {/* Si error es verdadero renderiza */}

            {error && (
                <p>Error: El código es incorrecto</p>
            )}

            <input placeholder="Código de seguridad"/>
            <button
                // Actualizar estado con un evento onClick en el boton 
                // Funciones "prevState" dentro de los actualizadores del estado para la función setError
                // "setError(prevState => !prevState)"
                onClick={() => setError(!error)}
            >Comprobar</button>
        </div>
    );
}

export { UseState }