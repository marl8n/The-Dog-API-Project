(async () => {
    const URI = `https://api.thedogapi.com/v1`;
    const RANDOM_URI = `${URI}/images/search`;
    const FAVORITES_URI = `${URI}/favourites`;
    const API_KEY = 'f7426506-4352-4b24-b794-4bb4f011a691'

    const printDogs = async ({
        idContainerElement = 'app',
        numberOfDogs = 1,
        areFavorites = false,
        URI = RANDOM_URI,
        apiKey = false,
    }) => {
        const app = document.querySelector(`#${idContainerElement}`);
        const dogs = await getDogs({uri: `${URI}`, numberOfDogs, apiKey: apiKey});
        if (dogs.length > 0) {
            const fullDogs = dogs.map((dog) => addFavoritesProperty(dog, areFavorites))
            const htmlDogs = await parseDogToHtmlStr(fullDogs);
            app.innerHTML += htmlDogs;
        }
    }

    // DOM manipulation
    const showCompleteDogImage = async (event) => {
        const image = event.target;
        const modalPhoto = document.querySelector('.modal-dog-photo__photo')
        modalPhoto.src = image.src;
        const modal = document.querySelector('.modal-dog-photo')
        modal.classList.add('modal-dog-photo--active')
    }

    const hideCompleteDogImage = async (event) => {
        const modal = document.querySelector('.modal-dog-photo')
        modal.classList.remove('modal-dog-photo--active')
    }

    const deleteDogItem = async ({idContainerElement}) => {
        const dogsContainer = document.querySelector(`#${idContainerElement}`)
        if (!!dogsContainer.children[0]) {
            dogsContainer.removeChild(dogsContainer.children[0])
        }
    }

    const addDogToFavorites = async (button) => {
        const response = await fetch(`${FAVORITES_URI}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY,
            },
            body: JSON.stringify({
                image_id: button.dataset['id'],
            }),
        })
        const favsContainer = document.querySelector('#favorite-dogs-container')
        const dogItem = document.getElementById(button.dataset['id'])
        favsContainer.appendChild(dogItem.cloneNode(true))
        dogItem.remove()
    }

    const removeDogToFavorites = async (button) => {
        const response = await fetch(`${FAVORITES_URI}/${button.dataset['id']}`, {
            method: 'DELETE',
            headers: {
                'x-api-key': API_KEY,
            },
        })
    }

    const dogHeartButtonOnClick = async (event, buttonClass) => {
        const button = event.target;
        button.classList.toggle(`${buttonClass}--active`)
        if (button.classList.contains(`${buttonClass}--active`)) {
            await addDogToFavorites(button)
        } else {
            removeDogToFavorites(button)
        }
    }
    // DOM manipulation

    // Events
    document.body.addEventListener('pointerdown', async (event) => {
        if (event.target.id === 'button-load') {
            await printDogs({
                idContainerElement: 'random-dogs-container',
            })
        } else if(event.target.classList.contains('dog-image')) {
            await showCompleteDogImage(event);
        } else if (event.target.classList.contains('close-modal') || event.target.classList.contains('modal-dog-photo')) {
            await hideCompleteDogImage(event)
        } else if (event.target.classList.contains('dog-favorites-button')) {
            await dogHeartButtonOnClick(event, 'dog-favorites-button');
        }
    })

    document.body.addEventListener('keyup', (event) => {
        if(event.key === 'Escape') {
            const modal = document.querySelector('.modal-dog-photo')
            if(modal.classList.contains('modal-dog-photo--active')){
                modal.classList.remove('modal-dog-photo--active')
            }
        }
    })

    document.body.addEventListener('keypress', async (event) => {
        if(event.key === 'N' && event.shiftKey) {
            await printDogs({
                idContainerElement: 'random-dogs-container',
            })
        } else if(event.key === 'D' && event.shiftKey) {
            await deleteDogItem({
                idContainerElement: 'random-dogs-container',
            })
        }
    })

    // Events

    // Initialize
    await printDogs({
        idContainerElement: 'favorite-dogs-container',
        numberOfDogs: 12,
        areFavorites: true,
        URI: FAVORITES_URI,
        apiKey: API_KEY,
    });
    await printDogs({
        idContainerElement: 'random-dogs-container',
        numberOfDogs: 3,
    });

})();
