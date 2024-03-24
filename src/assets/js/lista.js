var APU_POKEMON_URL = 'https://pokeapi.co/api/v2/'
var allPokemons = [];

document.addEventListener("DOMContentLoaded", function () {

  MostrarCardsPokemon();

});

async function ListaPokemon() {

  let listaPokemon = await fetch(APU_POKEMON_URL + "pokemon")
    .then(response => response.json())
    .catch(error => console.log(error));

  listaPokemon.results.sort((a, b) => a.name.localeCompare(b.name));

  return listaPokemon.results;
}

async function MostrarCardsPokemon() {

  let pokemons = await ListaPokemon();
  allPokemons = pokemons;


  // pokemons.forEach(async (pokemon) => {
  //   await fetch(pokemon.url)
  //     .then(response => response.json())
  //     .then(pokemonData => {
  //       const card = createPokemonCard(pokemonData);
  //       container.appendChild(card);
  //     });
  // });

  GenerarCards(pokemons);
}

async function GenerarCards(pokemons) {
  let container = document.getElementById('pokemon-container');

  container.innerHTML='';

  for (const pokemon of pokemons) {
    const response = await fetch(pokemon.url);
    const pokemonData = await response.json();
    const card = createPokemonCard(pokemonData);
    container.appendChild(card);
  }
}



function createPokemonCard(pokemon) {
  const card = document.createElement('div');
  card.classList.add('card');

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
  addButton.innerHTML = '<i class="fa fa-cart-plus"aria-hidden="true"></i>&nbsp; Agregar';
  addButton.classList.add('add-button');
  addButton.addEventListener('click', function () {
    // Aquí puedes agregar la lógica para agregar el Pokémon a alguna lista o realizar alguna acción
    console.log(`¡${pokemon.name} ha sido agregado!`);
  });
  card.appendChild(addButton);
  return card;
}

function Buscar() {

  try {
    let value = document.getElementById('txtBuscar').value;

    let pokemons = allPokemons.filter(x => x.name.toLowerCase().includes(value.toLowerCase()));

    GenerarCards(pokemons);
  } catch (error) {

    console.log(error);

  }


}