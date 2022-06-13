const parseDogToHtmlStr = async (dogs) => {
  return dogs
    .map((dog) => {
      return `
            <article id="${dog.id}" class="dog-item">
                <figure class="inner-img-container dog-image-container">
                    <img data-id="${dog.id}" src="${
        !!dog.image ? dog.image.url : dog.url
      }" class="inner-img dog-image" alt="Random dog" />
                </figure>
                <div class="dog-info">
                    <h3 class="dog-title">Id dog: ${dog.id}</h3>
                </div>
                <div class="dog-buttons">
                    <button data-id="${dog.id}" class="dog-favorites-button ${
        dog.isFavorite ? "dog-favorites-button--active" : ""
      } heart"></button>
                </div>
            </article>
            `;
    })
    .join("");
};
