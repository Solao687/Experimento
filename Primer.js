// 1. Seleccionamos el elemento de la tabla por su ID (en minúsculas para coincidir con el HTML)
const contenido = document.querySelector("#contenido");

// 2. Función asíncrona para consumir la API de usuarios
async function consumirApi() {
    const url = "https://jsonplaceholder.typicode.com/users";
    
    // Configuración de la petición HTTP
    const tipoApi = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        // Limpiamos el texto de "Cargando..." justo antes de renderizar los datos nuevos
        contenido.innerHTML = ''; 
        
        // Realizamos la petición asíncrona
        const respuesta = await fetch(url, tipoApi);
        
        // Verificamos si la respuesta del servidor fue exitosa (status 200-299)
        if (!respuesta.ok) {
            contenido.innerHTML = `
                <tr>
                    <td colspan="4" class="error-state">No pude extraer los datos</td>
                </tr>
            `;
            return;
        }

        // Convertimos la respuesta a un objeto JSON utilizable
        const lista = await respuesta.json();

        // Iteramos sobre el arreglo de usuarios usando un iterador de arreglos (forEach)
        lista.forEach(dato => {
            // Construimos la estructura de la fila de forma limpia usando Template Literals
            const fila = `
                <tr>
                    <td>${dato.id}</td>
                    <td>${dato.name}</td>
                    <td>${dato.email}</td>
                    <td>${dato.company.name}</td>
                </tr>
            `;
            
            // Concatenamos cada fila usando el operador += para acumularlas en el tbody
            contenido.innerHTML += fila;
        });

    } catch (error) {
        // En caso de que ocurra una falla de red (ej. sin conexión a internet)
        contenido.innerHTML = `
            <tr>
                <td colspan="4" class="error-state">Error inesperado en el sistema</td>
            </tr>
        `;
    }
}

// 3. Ejecutamos la función para inicializar la carga automática al abrir la página
consumirApi();
