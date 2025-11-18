

const baseUrl = "https://lanciweb.github.io/demo/api/pictures/";
const photosContainer = document.querySelector(".container");

 const myCreateElement = (tagType, className) => {
  const newElem = document.createElement(tagType);
  newElem.classList.add(className);
  return newElem
 }

const createCard = (photo) => {
  const { title, url, date } = photo;
  const colElem = myCreateElement('div', "col");
  const cardElem = myCreateElement('div', "card");
  colElem.append(cardElem);
  const cardContent = myCreateElement('div', "card-content");
  cardElem.append(cardContent);
  cardContent.append(img)
  cardContent.innerHTML = `
          <img src="${url}" alt="${title}">
          <time datetime="datetime">${date}</time>
          <h2 class="card-title">${title}</h2>
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

