function returnHTML(name, imgUrl, id) {
  return /*html*/ `
  <div onclick="showOverview(${id})" class="mini-card">
    <div><b>${name}<b></div>
    <img src="${imgUrl}" alt="">
  </div>
  `;
}
