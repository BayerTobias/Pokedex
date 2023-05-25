async function getData() {
  let url = " https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";
  let response = await fetch(url);
  let responseAsJson = await response.json();
  let results = responseAsJson.results;
  console.log("Pokemon Data", results);
  renderPokemon(results);
}

async function renderPokemon(results) {
  let main = document.getElementById("main");
  main.innerHTML = ``;

  for (let i = 0; i < results.length; i++) {
    const pokemon = results[i];

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
  return returnHTML(name, imgUrl);
}

function returnHTML(name, imgUrl) {
  return /*html*/ `
  <div><b>${name}<b></div>
  <img src="${imgUrl}" alt="">
  `;
}
