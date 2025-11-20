

const baseUrl = "https://lanciweb.github.io/demo/api/pictures/";
const photosContainer = document.querySelector(".container");
const centerPhoto = document.querySelector(".clicked-post");
const overlay = document.querySelector(".overlay");
const closeCenterPhotoBtn = document.querySelector(".close-btn");
const loadingScreen = document.querySelector(".loading-screen");

const myCreateElement = (
  tagType,
  className = [],
  content = [],
  callback = false
) => {
  // tag 
  const newElem = document.createElement(tagType);
  // class 
  if (className.length > 0) {
    for (let i = 0; i < className.length; i++) {
      newElem.classList.add(className[i]);
    }
  }
  // content
  if (Array.isArray(content)) {
    for (let i = 0; i < content.length; i++) {
      newElem.appendChild(content[i]);
    }
    // } else if (content instanceof HTMLElement) {
    //   newElem.appendChild(content);
  } else if (typeof content === "string") {
    newElem.innerHTML = content;
  } else {
    console.log("Non posso aggiungere l'elemento");
  }
  // callback 
  if (callback) {
    callback(newElem);
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
const removeOverlay = (overlay, parent, child) => {
  overlay.classList.remove("d-flex");
  overlay.classList.add("d-none");
  if (parent.contains(child)) {
    parent.removeChild(child);
    centerPhoto.removeChild(centerPhotoContent)
  }
}

const openOverlay = (card, array) => {
  let clickedCardId = parseInt(card.id);
  const clickedCard = array.find(({ id }) => id === clickedCardId);
  overlay.classList.remove("d-none");
  overlay.classList.add("d-flex");
  const centerPhotoContent = myCreateElement('img', ["center-img"], [], (element) => {
    element.src = clickedCard.url;
  })
  centerPhoto.appendChild(centerPhotoContent);
  overlay.addEventListener("click", () => {
    removeOverlay(overlay, centerPhoto, centerPhotoContent);
  })
  closeCenterPhotoBtn.addEventListener("click", () => {
    removeOverlay(overlay, centerPhoto, centerPhotoContent);
  })
}

const addCardClick = (cardsArray, dataArray) => {
  cardsArray.forEach((card) => {
    card.addEventListener("click", () => {
      openOverlay(card, dataArray);
    })
  })
}


axios
  .get(baseUrl)
  .then((resp) => {
    const photoData = resp.data;
    photoData.forEach((photo) => {
      const photoCard = createCard(photo);
      photosContainer.appendChild(photoCard);
    })
    // remove loading screen 
    loadingScreen.classList.add("d-none");
    const cards = document.querySelectorAll(".col");
    addCardClick(cards, photoData);
  })