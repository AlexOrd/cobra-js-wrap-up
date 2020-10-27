function cardConstructor(cardInfo, classOptions) {
  // 1. create div container | + class
  const cardContainer = document.createElement('div');
  if (classOptions.containerClass) {
    cardContainer.className = classOptions.containerClass;
  }
  // 2. create img | + class| + src | + alt
  const cardImg = document.createElement('img');
  if (classOptions.imgClass) {
    cardImg.className = classOptions.imgClass;
  }
  if (cardInfo.imgSrc) {
    cardImg.src = cardInfo.imgSrc;
  }
  if (cardInfo.imgAlt) {
    cardImg.alt = cardInfo.imgAlt;
  }
  // 3. create h5 title | + class| + innerText
  const cardTitle = document.createElement('h5');
  if (classOptions.titleClass) {
    cardTitle.className = classOptions.titleClass;
  }
  if (cardInfo.title) {
    cardTitle.innerText = cardInfo.title;
  }
  // 4. create div descriptions (iteration) | + class| + innerText
  const descriptionNodesList = Object.keys(cardInfo.description).map((descriptionKey) => {
    const cardDescriptionDiv = document.createElement('div');
    if (classOptions.descriptionClass) {
      cardDescriptionDiv.className = classOptions.descriptionClass;
    }
    const fullDescriptionString = `${descriptionKey}: ${cardInfo.description[descriptionKey]}`;
    cardDescriptionDiv.innerText = fullDescriptionString;

    return cardDescriptionDiv;
  });
  // 5. Add img, h5, divs in the container
  cardContainer.appendChild(cardImg);
  cardContainer.appendChild(cardTitle);
  descriptionNodesList
    .forEach((descriptionElement) => cardContainer.appendChild(descriptionElement));
  // 6. return card container

  console.log('cardContainer: ', cardContainer);
  return cardContainer;
}
// example
{/* <div class="card" style="width: 18rem;">
  <img class="card-img-top" src="..." alt="Card image cap">
  <h5 class="card-title">Card title</h5>
  <div class="card-text">name3: Affenpinscfdsfher</div>
  <div class="card-text">name2: jkjjkjk</div>
</div> */}

