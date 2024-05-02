
const publicKey = "29f38fa9a046140d30f7b08171dd1ef9";
const privateKey = "a9cc3279556e7415a3afd4ad3e2d453c0dd300ae";
const baseUrl = "https://gateway.marvel.com/v1/public/characters"

const favoritesContainer = document.getElementById("favorites-container");


function createAuthenticator(){
    var timestamp = Date.now();
    var hash = md5(timestamp+privateKey+publicKey);
    var authenticationKey = `?apikey=${publicKey}&hash=${hash}&ts=${timestamp}`
    // var url = baseUrl+authenticationKey;
    // console.log(url);
    return authenticationKey;
}

async function fetchAPI(url){
    favoritesContainer.innerHTML = "";
    const response = await fetch(url);
    const jsonData = await response.json();

    if(jsonData.data["results"].length!==0){
        jsonData.data["results"].forEach(element => {
            var heroCard = document.createElement("card");
            var imageURL = element.thumbnail.path+"."+element.thumbnail.extension;
            heroCard.innerHTML =`
            <div class="favorite-hero-card" data-hero-id="${element.id}">
                <img src=${imageURL}>
                <div class="description-container">
                    <h2>${element.name}</h2>
                    <p>${element.description}</p>
                    <div class="remove-from-favs">
                        <button data-favorite-hero-id="${element.id}">Remove From Favorites</button>
                    </div>
                </div>
            </div>`;
            favoritesContainer.appendChild(heroCard);
        });
    }else{
        alert("You Have Not Added any Heroes to Your Favorites List")
    }    
}

// function to create a new authenticator every time the fetchAPI function is called
async function fetchData() {
    const url = baseUrl+createAuthenticator();
    await fetchAPI(url);
}


function displayFavoriteHeroes(){
    let favoriteHeroesArray = localStorage.getItem("favorite-heroes").split(",");
    console.log(favoriteHeroesArray);
    favoriteHeroesArray.forEach(element=>{
        let favID = element;
        let favUrl = baseUrl+"/"+favID+createAuthenticator();
        fetchAPI(favUrl);
        console.log(favUrl)
    })
}

displayFavoriteHeroes();