

const baseUrl = "https://lanciweb.github.io/demo/api/pictures/";
const photosContainer = document.querySelector(".container");
const centerPhoto = document.querySelector(".clicked-post");
const overlay = document.querySelector(".overlay");
const closeCenterPhotoBtn = document.querySelector(".close-btn");


function myCreateElement(
  tagType,
  className = [],
  content = [],
  callback = false
) {
  // tag 
  const newElem = document.createElement(tagType);
  // class 
  if (className.length > 0) {
    for (let i = 0; i < className.length; i++) {
      newElem.classList.add(className[i]);
    }
  }
  // callback 
  if (callback) {
    callback(newElem);
  }
  // content
  if (Array.isArray(content)) {
    for (let i = 0; i < content.length; i++) {
      newElem.appendChild(content[i]);
    }
  } else if (content instanceof HTMLElement) {
    newElem.appendChild(content);
  } else if (typeof content === "string") {
    newElem.innerHTML = content;
  } else {
    console.log("Non posso aggiungere l'elemento");
  }



  return newElem
}

const createCard = (photo) => {
  const { title, url, date, id } = photo;
  const colElem = myCreateElement('div', ["col"],
    [
      myCreateElement('div', ["card"],
        [
          myCreateElement('div', ["card-content"],
            [
              myCreateElement('img', ["img"], [], (element) => {
                element.src = url;
                element.alt = title;
              }),
              myCreateElement('time', ["date"], date, (element) => {
                element.datetime = "datetime";
              }),
              myCreateElement('h2', ["card-title"], title)
            ],
          )
        ])
    ], (element) => {
      element.id = id;
    })
  return colElem
}

const openOverlay = (card, array) => {
    const clickedCardId = parseInt(card.id);
          const clickedCard = array.find(({ id }) => id === clickedCardId);
          overlay.classList.remove("d-none");
          overlay.classList.add("d-flex");
          centerPhoto.innerHTML = `
          <img src="${clickedCard.url}" alt="">
          `;
          closeCenterPhotoBtn.addEventListener("click", () => {
            overlay.classList.remove("d-flex");
            overlay.classList.add("d-none");
          })
}

axios
  .get("https://lanciweb.github.io/demo/api/pictures/")
  .then((resp) => {
    const photoData = resp.data;
    photoData.forEach((photo) => {
      const photoCard = createCard(photo);
      photosContainer.appendChild(photoCard);

      const cards = document.querySelectorAll(".col");
      cards.forEach((card) => {
        card.addEventListener("click", () => {
          openOverlay(card, photoData);
          // const clickedCardId = parseInt(card.id);
          // const clickedCard = photoData.find(({ id }) => id === clickedCardId);
          // console.log(clickedCard);
          // overlay.classList.remove("d-none");
          // overlay.classList.add("d-flex");
          // centerPhoto.innerHTML = `
          // <img src="${clickedCard.url}" alt="">
          // `;
          // closeCenterPhotoBtn.addEventListener("click", () => {
          //   overlay.classList.remove("d-flex");
          //   overlay.classList.add("d-none");
          // })
        })
      })
    })
  })