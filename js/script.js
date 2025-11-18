

const baseUrl = "https://lanciweb.github.io/demo/api/pictures/";
const photosContainer = document.querySelector(".container");

const createCard = (photo) => {
  const { title, url, date } = photo;
  const colElem = document.createElement('div');
  colElem.classList.add("col");
  colElem.innerHTML = `
      <div class="card">
        <div class="card-content">
          <img src="${url}" alt="${title}">
          <time datetime="datetime">${date}</time>
          <h2 class="card-title">${title}</h2>
        </div>
      </div>
        `;
  return colElem
}

axios
  .get("https://lanciweb.github.io/demo/api/pictures/")
  .then((resp) => {
    const photoData = resp.data;
    photoData.forEach((photo) => {
      const photoCard = createCard(photo);
      photosContainer.append(photoCard);
    })
  });

