function getAllBreedsPromise() {
    return superagent.get('https://api.thedogapi.com/v1/breeds')
        .then(response => response.body);
}

function getBreedByStringPromise(breedQuery) {
    return superagent.get(`https://api.thedogapi.com/v1/breeds/search?q=${breedQuery}`)
        .then((response) => {
            const breed = response.body[0];
            const promisesArray = response.body.map((breed) => superagent.get(`https://api.thedogapi.com/v1/images/search?breed_id=${breed.id}`));
            return Promise.all(promisesArray);
        })
        .then((response) => {
            debugger
            const fullBreedInfo = {
                breed: response.body[0].breeds[0],
                img: response.body[0]
            };
            //
            delete fullBreedInfo.img.breeds;
            return Promise.resolve(fullBreedInfo);
        });
}

