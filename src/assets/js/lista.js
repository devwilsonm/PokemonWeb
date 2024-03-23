document.addEventListener("DOMContentLoaded", function() {
    fetch('https://pokeapi.co/api/v2/pokemon')
      .then(response => response.json())
      .then(data => {
        const pokemons = data.results;
        const container = document.getElementById('pokemon-container');
        
        pokemons.forEach(pokemon => {
          fetch(pokemon.url)
            .then(response => response.json())
            .then(pokemonData => {
              const card = createPokemonCard(pokemonData);
              container.appendChild(card);
            });
        });
      })
      .catch(error => console.log(error));
  
    function createPokemonCard(pokemon) {
      const card = document.createElement('div');
      card.classList.add('card');
    
 
    //   const name = document.createElement('h3');
    //   name.textContent = pokemon.name;
    //   card.appendChild(name);
  
      const image = document.createElement('img');
      image.src = pokemon.sprites.front_default;
      image.alt = pokemon.name;
      card.appendChild(image);
  
      const textArea = document.createElement('div');

  textArea.classList.add('txt');
  const text = document.createElement('p');
  text.innerHTML = `
    Nombre: ${pokemon.name} <br>
    Habilidades: ${pokemon.abilities.map(ability => ability.ability.name).join(', ')} <br>
    Tipo: ${pokemon.types.map(type => type.type.name).join(', ')}
  `;
  textArea.appendChild(text);
  card.appendChild(textArea);
  const addButton = document.createElement('button');
  addButton.textContent = 'Agregar';
  addButton.classList.add('add-button');
  addButton.addEventListener('click', function() {
    // Aquí puedes agregar la lógica para agregar el Pokémon a alguna lista o realizar alguna acción
    console.log(`¡${pokemon.name} ha sido agregado!`);
  });
  card.appendChild(addButton);
      return card;
    }
  });