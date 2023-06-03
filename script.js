let loadedPokemon = 0;
let loadPokemon = 30;
let results;
let infiniteScrollActive = "active";

/*todo 
- funktionen kürzen
- neue anzeige keine pokemon gefunden
- scrollen bei overlaxy deaktivieren
- vorheriges / nächstes Pokemon
- moves reiter

css 
animation hover karte
animation pokemon karte und wechsel (vorhang)
 */

async function getData() {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
  const response = await fetch(url);
  const responseAsJson = await response.json();
  results = responseAsJson.results;
  renderPokemon();
}

async function renderPokemon() {
  const main = document.getElementById("main");
  const loadedPokemonsContainer = document.getElementById("loaded-Pokemons");

  for (let i = loadedPokemon; i < loadPokemon; i++) {
    const pokemon = results[i];
    loadedPokemon++;
    loadedPokemonsContainer.innerHTML = loadedPokemon;
    main.innerHTML += /*html*/ `
      ${await getPokemonData(pokemon.url)}
    `;
  }
}

async function loadMorePokemon() {
  loadPokemon = loadPokemon + 30;
  await renderPokemon();
}

async function getPokemonData(url) {
  const response = await fetch(url);
  const responseAsJson = await response.json();
  const imgUrl = responseAsJson.sprites.other["official-artwork"].front_default;
  const name = responseAsJson.name;
  const id = responseAsJson.id;
  const type = responseAsJson.types[0].type.name;
  return getMiniCard(name, imgUrl, id, type);
}

async function searchPokemon() {
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase();
  const backButton = document.getElementById("back-button");
  backButton.classList.remove("d-none");
  infiniteScrollActive = "notactive";
  main.innerHTML = ``;
  loadedPokemon = 0;
  for (let i = 0; i < results.length; i++) {
    const pokemon = results[i];
    const pokemonName = pokemon.name;
    if (pokemonName.includes(searchInput)) {
      loadedPokemon++;
      await renderSearchedPokemon(pokemon);
    }
  }
}

async function renderSearchedPokemon(pokemon) {
  const main = document.getElementById("main");
  const loadedPokemonsContainer = document.getElementById("loaded-Pokemons");
  loadedPokemonsContainer.innerHTML = loadedPokemon;
  main.innerHTML += await getPokemonData(pokemon.url);
}

function noPokemonFound() {
  const main = document.getElementById("main");
  main.innerHTML = "leider keine Pokemon gefunden";
}

async function showOverview(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  const pokemon = await response.json();
  const overlayBg = document.getElementById("overlay-bg");
  overlayBg.classList.remove("d-none");
  fillCard(pokemon);
  getTypes(pokemon);
  renderBars(pokemon);
  setTimeout(showCard, 1);
}

async function nextPokemon(id) {
  id = id + 1;
  hideCard();
  setTimeout(showOverview.bind(null, id), 1200);
}

function showCard() {
  const card = document.getElementById("detailes-card");
  card.classList.add("show");
}

function hideCard() {
  const card = document.getElementById("detailes-card");
  card.classList.remove("show");
}

function fillCard(pokemon) {
  const container = document.getElementById("overlay-bg");
  container.innerHTML = getDetailCard(pokemon);
}

function renderBars(pokemon) {
  const barContainer = document.getElementById("info-box");

  for (let i = 0; i < pokemon.stats.length; i++) {
    const statName = pokemon.stats[i].stat.name;
    const statValue = pokemon.stats[i].base_stat;
    barContainer.innerHTML += getBar(statName, statValue);
  }
}

function getPercent(statValue) {
  const maxStat = 200;
  const percent = (statValue / maxStat) * 100;
  return percent;
}

function getTypes(pokemon) {
  const types = pokemon.types;
  const typeBox = document.getElementById("card-types");

  for (let i = 0; i < types.length; i++) {
    const type = types[i];
    typeName = type.type.name;
    let typediv = document.createElement("div");
    typediv.textContent = typeName;
    typeBox.appendChild(typediv);
  }
}

function closeOverlay() {
  const overlayBg = document.getElementById("overlay-bg");
  overlayBg.classList.add("d-none");
}

function doNotClose(event) {
  event.stopPropagation();
}

function reloadPage() {
  location.reload();
}

async function infiniteScroll() {
  if (
    window.scrollY + window.innerHeight + 50 >=
      document.documentElement.scrollHeight &&
    infiniteScrollActive == "active"
  ) {
    infiniteScrollActive = "notactive";
    await loadMorePokemon();
    infiniteScrollActive = "active";
  }
}

window.addEventListener("scroll", infiniteScroll);
