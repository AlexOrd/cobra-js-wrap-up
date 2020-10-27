let searchInput = document.querySelector('.search__input');
let searchButton = document.querySelector('.search__button');
let historyList = document.querySelector('.history__list');
let historyClear = document.querySelector('.history__clear');
let newList = [];

function addTolist() {
    for (let i = 0; i < localStorage.length; i++) {
        let newListItem = document.createElement('li');
        newListItem.innerHTML = localStorage.getItem(`searchHistory${i + 1}`);
        historyList.appendChild(newListItem);
        newListItem.addEventListener('click', function () {
            searchInput.value = this.innerHTML
            searchButton.click()
        })
    }
}

function createListOfDog(breedsArray) {
    return breedsArray.map(element => element.name);
}

function createCardFromBreed(breed) {
    let newP = document.createElement('p')
    newP.innerHTML = `
    Name: ${breed.breed.name} <br>
    Bred for : ${breed.breed.bred_for} <br>
    Life span : ${breed.breed.life_span}
    <img src='${breed.img.url}' /img>`
    return newP
}

$(document).ready(() => {
    // getSavedQueries
    // createHistory
    const dogChoose = document.querySelector('.dog__choose');
    getAllBreedsPromise().then(breedsArray => {
        newList = createListOfDog(breedsArray);
        autocomplete(searchInput, newList);
    });

    searchButton.addEventListener('click', () => {
        // updateSavedQueries
        // updateHistory
        saveRequestQuery(searchInput.value);
        getBreedByStringPromise(searchInput.value)
            .then(breedInfo => {
                const customClasses = {
                    containerClass: 'card',
                    imgClass: 'card-img-top',
                    titleClass: 'card-title',
                    descriptionClass: 'card-text'
                };
                const cardInfo = {
                  imgSrc: breedInfo.img.url,
                  imgAlt: breedInfo.breed.name,
                  title: breedInfo.breed.name,
                  description: {
                    life_span: breedInfo.breed.life_span,
                    origin: breedInfo.breed.origin,
                    temperament:breedInfo.breed.temperament,
                    bred_for: breedInfo.breed.bred_for,
                    breed_group: breedInfo.breed.breed_group,
                  }
                };

                const breedCard = cardConstructor(cardInfo, customClasses);
                dogChoose.appendChild(breedCard);
                $('.dog__choose').slick("refresh");

                addTolist();
            })
    });
});

searchButton.addEventListener('click', function () {
    if (searchInput.value == null || searchInput.value == undefined || searchInput.value == '') {
        return
    } else {
        localStorage.setItem(`searchHistory${localStorage.length + 1}`, searchInput.value)
    }
})
historyClear.addEventListener('click', function () {
    localStorage.clear()
    historyList.remove()
})
