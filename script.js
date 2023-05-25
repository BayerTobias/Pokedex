let loadedPokemon = 0;
let loadPokemon = 30;
let lastExecution = 0;

async function getData() {
  let url = `https://pokeapi.co/api/v2/pokemon?limit=${loadPokemon}&offset=${loadedPokemon}`;
  let response = await fetch(url);
  let responseAsJson = await response.json();
  let results = responseAsJson.results;
  console.log("Pokemon Data", results);
  renderPokemon(results);
}

async function renderPokemon(results) {
  let main = document.getElementById("main");
  for (let i = 0; i < results.length; i++) {
    const pokemon = results[i];
    loadedPokemon++;
    main.innerHTML += /*html*/ `
      ${await getPokemonData(pokemon.url)}
    `;
  }
}

async function getPokemonData(url) {
  let response = await fetch(url);
  let responseAsJson = await response.json();
  let imgUrl = responseAsJson.sprites.other["official-artwork"].front_default;
  let name = responseAsJson.name;
  let id = responseAsJson.id;
  return returnHTML(name, imgUrl, id);
}

async function showOverview(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  const pokemon = await response.json();
  console.log(pokemon);
}

function infiniteScroll() {
  if (
    window.scrollY + window.innerHeight + 50 >=
    document.documentElement.scrollHeight
  ) {
    const delay = 2000; //anti-rebound 2second

    if (lastExecution + delay < Date.now()) {
      getData();
      lastExecution = Date.now();
    }
  }
}

window.addEventListener("scroll", infiniteScroll);
