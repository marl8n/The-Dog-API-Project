(async () => {
    const getDog = async () => {
        const uri = "https://api.thedogapi.com/v1/images/search";
        const dogApiResponse = await fetch(uri);
        return dogApiResponse.json();
    }

    const parseDogToHtmlStr = async (dogs) => {
        return dogs.map(dog => {
            return `
            <div class="dog-item">
                <figure class="inner-img-container dog-image-container">
                    <img src="${dog.url}" class="inner-img dog-image" alt="Random dog" />
                </figure>
                <div class="dog-info">
                    <h3 class="dog-title">Id dog: ${dog.id}</h3>
                </div>
            </div>
            `
        }).join();
    }

    const printDog = async (idContainerElement) => {
        const app = document.querySelector(`#${idContainerElement}`);
        const dog = await getDog();
        const htmlDog = await parseDogToHtmlStr(dog);
        app.innerHTML += htmlDog;
    }
    

    document.body.addEventListener('pointerdown', async (event) => {
        if (event.target.id === 'button-load') {
            await printDog('app')
        } else if(event.target.classList.contains('dog-image')) {
            const image = event.target;
            const modalPhoto = document.querySelector('.modal-dog-photo__photo')
            modalPhoto.src = image.src;
            
            const modal = document.querySelector('.modal-dog-photo')
            modal.classList.add('modal-dog-photo--active')
        } else if (event.target.classList.contains('close-modal')) {
            const modal = document.querySelector('.modal-dog-photo')
            modal.classList.remove('modal-dog-photo--active')
        }
    })

    printDog()

})();
