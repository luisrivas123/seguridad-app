import React from "react";

// Componente creado con clases

class ClassState extends React.Component {
    render() {
        return(
            <div>
                <h2>Eliminar ClassState</h2>

                <p>Por favor escribe el código de seguridad</p>

                <input placeholder="Código de seguridad"/>
                <button>Comprobar</button>
            </div>
        );
    }
}

export { ClassState }