// 1. Seleccionamos el tbody de la tabla de adopciones
const contenido = document.querySelector("#contenido");

// 2. Función asíncrona para buscar los perritos
async function consumirApiAdopciones() {
    // NOTA: Cambia esta URL por la de tu API real de adopciones cuando la tengas.
    // Por ahora uso esta de prueba que devuelve datos simulados de mascotas.
    const url = "https://mocki.io/v1/de368143-4cc0-4966-9964-b49dcaefd5e7"; 
    
    const tipoApi = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        contenido.innerHTML = ''; // Limpiamos el cargando
        
        const respuesta = await fetch(url, tipoApi);
        
        if (!respuesta.ok) {
            contenido.innerHTML = `
                <tr>
                    <td colspan="5" class="error-state">No se pudo cargar el listado de adopciones</td>
                </tr>
            `;
            return;
        }

        const listaPerritos = await respuesta.json();

        // Iteramos sobre nuestra lista de mascotas
        listaPerritos.forEach(perrito => {
            
            // Evaluamos el estado para darle un color bonito en el HTML
            const claseEstado = perrito.estado.toLowerCase() === 'disponible' ? 'disponible' : 'en-proceso';

            // Construimos la fila con los 5 datos solicitados
            const fila = `
                <tr>
                    <td><strong>${perrito.nombre}</strong></td>
                    <td>${perrito.especie}</td>
                    <td>${perrito.edad} ${perrito.edad === 1 ? 'año' : 'años'}</td>
                    <td>${perrito.tamano}</td>
                    <td><span class="badge ${claseEstado}">${perrito.estado}</span></td>
                </tr>
            `;
            
            // Sumamos la fila a la tabla
            contenido.innerHTML += fila;
        });

    } catch (error) {
        contenido.innerHTML = `
            <tr>
                <td colspan="5" class="error-state">Error de conexión al buscar las adopciones</td>
            </tr>
        `;
    }
}

// 3. Inicializamos la carga de mascotas
consumirApiAdopciones();
