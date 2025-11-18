const baseUrl = "https://lanciweb.github.io/demo/api/pictures/";
const photosContainer = document.querySelector(".container");
axios
  .get("https://lanciweb.github.io/demo/api/pictures/")
  .then((resp) => {
    console.log(resp.data);
    const photoData = resp.data;
    photoData.forEach((photo) => {
      const title = photo.title;
      const imgUrl = photo.url;
      const photoCard = `
      <div class="col">
        <div class="card">
          <img src="${imgUrl}" alt="${title}">
          <h2>${title}</h2>
        </div>
      </div>
      `;
      photosContainer.innerHTML += photoCard;
    })
  });