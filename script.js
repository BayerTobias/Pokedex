async function getData() {
  let url = " https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
  let response = await fetch(url);
  let responseAsJson = await response.json();
  let results = responseAsJson.results;
  console.log("Pokemon Data", results);
  renderPokemon(results);
}

function renderPokemon(results) {
  let main = document.getElementById("main");
  main.innerHTML = ``;

  for (let i = 0; i < results.length; i++) {
    const pokemon = results[i];

    main.innerHTML += /*html*/ `
      ${pokemon.name}
    `;
  }
}
