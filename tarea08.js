/*   Consumir el siguiente endpoint https://pokeapi.co/api/v2/pokemon/ y mostrar en el front lo siguiente:

a) Cards que contengan los 20 primeros pokemones (imagen y nombre del pokemon)
b) Utilizar Async / Await para trabajar las promesas de forma asíncrona
c) Usar Axios o Fetch para realizar la solicitud al endpoint mencionado
d) Ocupar Try / Catch para el manejo de errores
  */



// URL del endpoint
const API_URL = 'https://pokeapi.co/api/v2/pokemon/';
const container = document.getElementById('pokemon-container');

// Función para obtener los datos de los 20 primeros Pokémon
async function atrapaPokemon() {
    try {
        // Realiza la solicitud a la API
        const respuesta = await fetch(`${API_URL}?limit=20`);
        if (!respuesta.ok) {
            throw new Error(`Error en la solicitud: ${respuesta.status}`);
        }

        // respuesta en formato JSON
        const data = await respuesta.json();

        // Iteracion sobre los resultados y solicitud de más detalles
        const promises = data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return await res.json();
        });


        const detallePokemon = await Promise.all(promises);


        imagenPokemon(detallePokemon);
    } catch (error) {
        console.error('Ocurrió un error:', error.message);
        container.innerHTML = `<p style="color: red;">No se pudieron cargar los datos. Por favor, intenta más tarde.</p>`;
    }
}


function imagenPokemon(pokemons) {
    container.innerHTML = pokemons
        .map(
            (pokemon) => `
            <div class="card">
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <h3>${pokemon.name}</h3>
            </div>
        `
        )
        .join('');
}

// Llama a la función para cargar los datos
atrapaPokemon();
