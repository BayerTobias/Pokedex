function getMiniCard(name, imgUrl, id, type) {
  return /*html*/ `
  <div onclick="showOverview(${id})" class="mini-card ${type}">
    <div><b>${name}</b></div>
    <div>#${id}</div>
    <img src="${imgUrl}" alt="">
  </div>
  `;
}

function getDetailCard(pokemon) {
  return /*html*/ `
  <div id="card-header">${pokemon.name}</div>
      <div>
        <div id="card-types"></div>
        <img id="card-img" src="${pokemon.sprites.other["official-artwork"].front_default}" alt="pokemon-img" />
      </div>
      <div class="lower-card">
        <div><a href="">Stats</a><a href="">Moves</a></div>
        <div id="info-box"></div>        
`;
}

function getBar(statName, statValue) {
  return /*html*/ `
  <div><span> ${statName}</span>
  <div class="myProgress">
    <div id="${statName}-bar" class="myBar" style="width: ${getPercent(
    statValue
  )}%">${statValue}</div>
  </div>
  </div>
`;
}
