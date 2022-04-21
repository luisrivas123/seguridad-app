import React from "react";

const SECURITY_CODE = "paradigma"

// creando componente usando funciones
// Se definen las propiedades
function UseState({ name }) {
    const [value, setValue] = React.useState('');
    // Se crea un estado de error 
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    console.log(value)

    // Se utiliza el React Hook para el efecto de loading
    // El segundo argumento indica cunado se par generea el efecto o función
    React.useEffect(() => {
        console.log('Empezando el efecto')

        if(!!loading) {
            // Recibe dos argumentos la funcion y el intervalo de cafa cuanto s ejecuta la misma
            setTimeout(() => {
                console.log('Empezando validación')

                if (value === SECURITY_CODE){
                    setLoading(false);
                    // setError(false);
                } else {
                    setError(true);
                    setLoading(false);
                }
                
                console.log('Terminando validación')
            }, 3000)
        }
        
        console.log('Terminando el efecto')
    
    // Para que se ejecute el efecto solo cuando se actualiza el esato de carga
    }, [loading]);

    return (
        <div>
            {/* si el argumento es props usar props.name */}
            <h2>Eliminar {name}</h2>

            <p>Por favor escribe el código de seguridad</p>

            {/* Si error es verdadero renderiza */}
            {(error && !loading) && (
                <p>Error: El código es incorrecto</p>
            )}

            {/* Si loading es verdadero */}
            {loading && (
                <p>Cargando... </p>
            )}

            <input 
                placeholder="Código de seguridad"
                value={value}
                // Actualizador del estado cuando los uarios cambien lo que escriben en el input
                // se recibe el evento
                onChange={(event) => {
                    // setError(false);
                    // el nuevo valor
                    setValue(event.target.value);
                }}
            />
            <button
                // Actualizar estado con un evento onClick en el boton 
                // Funciones "prevState" dentro de los actualizadores del estado para la función setError
                // "setError(prevState => !prevState)"
                onClick={() => {
                    // setError(false)
                    setLoading(true);
                }}
            >Comprobar</button>
        </div>
    );
}

export { UseState }