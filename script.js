let loadedPokemon = 0;
let loadPokemon = 30;
let results;
let infiniteScrollActive = "notActive";

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
    let card = await getPokemonData(pokemon.url);
    main.appendChild(card);
  }
  infiniteScrollActive = "active";
}

async function loadMorePokemon() {
  loadPokemon = loadPokemon + 200;
  await renderPokemon();
}

async function getPokemonData(url) {
  const response = await fetch(url);
  const responseAsJson = await response.json();
  const imgUrl = responseAsJson.sprites.other["official-artwork"].front_default;
  const name = responseAsJson.name;
  const id = responseAsJson.id;
  const type = responseAsJson.types[0].type.name;
  const card = getMiniCard(name, imgUrl, id, type);
  return card;
}

async function searchPokemon() {
  const searchInput = getSearchInput();
  let pokemonFound = false;
  resetSearchInput();
  showBackButton();
  setupSearch();

  for (let i = 0; i < results.length; i++) {
    const pokemon = results[i];
    const pokemonName = pokemon.name;
    if (pokemonName.includes(searchInput)) {
      loadedPokemon++;
      pokemonFound = true;
      await renderSearchedPokemon(pokemon);
    }
  }
  if (pokemonFound === false) {
    noPokemonFound();
  }
}

function resetSearchInput(searchInput) {
  const inputField = document.getElementById("search-input");
  inputField.value = "";
}

function getSearchInput() {
  return document.getElementById("search-input").value.toLowerCase();
}

function showBackButton() {
  const backButton = document.getElementById("back-button");
  backButton.classList.remove("d-none");
}

function setupSearch() {
  infiniteScrollActive = "notactive";
  main.innerHTML = ``;
  loadedPokemon = 0;
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
  const pokemon = await fetchPokemonData(id);
  const overlayBg = document.getElementById("overlay-bg");
  overlayBg.classList.remove("d-none");
  document.body.style = "overflow: hidden;";
  fillCard(pokemon);
  getTypes(pokemon);
  renderBars(id);
  setTimeout(showCard, 1);
}

async function fetchPokemonData(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  const pokemon = await response.json();
  return pokemon;
}

async function nextPokemon(id) {
  id = id + 1;
  hideCard();
  setTimeout(showOverview.bind(null, id), 600);
}

async function previousPokemon(id) {
  id = id - 1;
  hideCard();
  setTimeout(showOverview.bind(null, id), 600);
}

function showCloseButton() {
  const closeButton = document.getElementById("close-button");
  closeButton.classList.remove("d-none");
}

function showCard() {
  const card = document.getElementById("detailes-card");
  card.classList.add("show");
  setTimeout(showCloseButton, 500);
}

function hideCard() {
  const card = document.getElementById("detailes-card");
  const closeButton = document.getElementById("close-button");
  card.classList.remove("show");
  closeButton.classList.add("d-none");
}

function fillCard(pokemon) {
  const container = document.getElementById("overlay-bg");
  container.innerHTML = getDetailCard(pokemon);
  if (pokemon.id === 1) {
    let button = document.getElementById("previous-button");
    button.style = "opacity: 0; pointer-events: none;";
  }
  if (pokemon.id === 10271) {
    let button = document.getElementById("next-button");
    button.style = "opacity: 0; pointer-events: none;";
  }
}

async function renderBars(id) {
  const barContainer = document.getElementById("info-box");
  const pokemon = await fetchPokemonData(id);
  barContainer.innerHTML = "";

  for (let i = 0; i < pokemon.stats.length; i++) {
    const statName = pokemon.stats[i].stat.name;
    const statValue = pokemon.stats[i].base_stat;
    barContainer.innerHTML += getBar(statName, statValue);
  }
}

async function renderMoves(id) {
  const moveContainer = document.getElementById("info-box");
  const pokemon = await fetchPokemonData(id);
  moveContainer.innerHTML = "";

  for (let i = 0; i < pokemon.moves.length; i++) {
    let move = pokemon.moves[i];
    move = move.move.name;
    moveContainer.innerHTML += getMove(move);
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
    let typediv = document.createElement("span");
    typediv.textContent = typeName;
    typeBox.appendChild(typediv);
  }
}

function closeOverlay() {
  const overlayBg = document.getElementById("overlay-bg");
  document.body.style = "";
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
  }
}

function toggleScrollUpButton() {
  const scrollUpButton = document.getElementById("scroll-up-button");
  if (window.scrollY > 500) {
    scrollUpButton.classList.remove("d-none");
  } else {
    scrollUpButton.classList.add("d-none");
  }
}

window.addEventListener("scroll", infiniteScroll);
window.addEventListener("scroll", toggleScrollUpButton);
