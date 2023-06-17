function getMiniCard(name, imgUrl, id, type) {
  const div = document.createElement("div");
  div.classList.add("mini-card", type);
  div.onclick = function () {
    showOverview(id);
  };

  const textBoxDiv = document.createElement("div");
  textBoxDiv.classList.add("mini-card-text-box");

  const nameElement = document.createElement("b");
  nameElement.textContent = name;

  const idElement = document.createElement("i");
  idElement.classList.add("pokemon-id");
  idElement.textContent = `#${id}`;

  textBoxDiv.appendChild(nameElement);
  textBoxDiv.appendChild(idElement);

  const img = document.createElement("img");
  img.src = imgUrl;
  img.alt = "pokemon img";

  div.appendChild(textBoxDiv);
  div.appendChild(img);

  return div;
}

function getDetailCard(pokemon) {
  return /*html*/ `
    <div  onclick="doNotClose(event)" id="detailes-card" class="${pokemon.types[0].type.name}">
      <img onclick="closeOverlay()" id="close-button" class="d-none "src="./img/circle-xmark.svg" alt="">
      <div class="uppper-card">
      <h3 id="card-header">${pokemon.name}</h3>
        <div class="img-type-box">
          <div id="card-types"></div>
          <img id="card-img" src="${pokemon.sprites.other["official-artwork"].front_default}" alt="pokemon-img" />
        </div>
      </div>
      <div class="lower-card">
        <div class="lower-card-header" ><span onclick="renderBars(${pokemon.id})">Stats</span><span onclick="renderMoves(${pokemon.id})">Moves</span></div>
        <div id="info-box"></div>   
        <div class="arrow-box">
          <img id="previous-button" onclick="previousPokemon(${pokemon.id})" src="./img/arrow-left-solid.svg" alt="left">
          <img id="next-button" onclick="nextPokemon(${pokemon.id})" src="./img/arrow-right-solid.svg" alt="right">
        </div>     
    </div>
`;
}

function getBar(statName, statValue) {
  return /*html*/ `
  <div><span> ${statName}:</span>
  <div class="myProgress">
    <div id="${statName}-bar" class="myBar" style="width: ${getPercent(
    statValue
  )}%">${statValue}</div>
  </div>
  </div>
`;
}

function getMove(move) {
  return /*html*/ `
   <div class="move">${move}</div> 
  `;
}
