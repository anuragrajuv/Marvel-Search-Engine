var favoriteHeroesArray = [];

const publicKey = "29f38fa9a046140d30f7b08171dd1ef9";
const privateKey = "a9cc3279556e7415a3afd4ad3e2d453c0dd300ae";
const baseUrl = "https://gateway.marvel.com/v1/public/characters?"

// console.log(authenticationKey);

const heroContainer = document.querySelector("#hero-container");
const searchButton = document.querySelector("#search-button");
const searchBox = document.querySelector("#search-box")



async function fetchAPI(url){
    heroContainer.innerHTML = "";
    const response = await fetch(url);
    const jsonData = await response.json();

    if(jsonData.data["results"].length!==0){
        jsonData.data["results"].forEach(element => {
            var heroCard = document.createElement("card");
            var imageURL = element.thumbnail.path+"."+element.thumbnail.extension;
            // console.log(imageURL);
            heroCard.innerHTML =`
            <div class="hero-card" data-hero-id="${element.id}">
                <div class="hero-image-container">
                    <img src="${imageURL}" class="hero-pic">
                    <button class="add-to-favorites" data-favorite-hero-id="${element.id}">
                        <i class="fa-regular fa-heart"></i>
                        <i class="fa-solid fa-heart" style="display: none;"></i>
                    </button>
                </div>
                <p class="hero-name">${element.name}</p>
            </div>
            `;
            if(element.thumbnail.path !== "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"){
                heroContainer.appendChild(heroCard);
                // console.log("added")
            }
        });
    }else{
        alert("No Heroes Found")
    }    
}



// redirecting to HERO PAGE
heroContainer.addEventListener('click', function(event) {
    // Access the clicked target
    const clickedElement = event.target;
    // console.log(clickedElement);

    // Check if the clicked element is a hero card
    if (clickedElement.classList.contains('hero-card')) {
        // Access the hero ID from data attribute
        const heroId = clickedElement.getAttribute('data-hero-id');
        
        // Now you can do whatever you need with the hero ID
        console.log('Clicked hero ID:', heroId);
        
        // Redirect to the hero's page passing the heroId as a parameter
        // window.location.href = `/hero/${heroId}`;
        // window.location.href = `hero.html/${heroId}`;
        window.open("hero.html", "_blank");
        displayHeroInHeroPage(heroId);
    }else if(clickedElement.classList.contains('add-to-favorites')){
        addToFavorites(event);
    }
});

// Function to add Heroes to Favorites List
function addToFavorites(event){
    const clickedElement = event.target;
    // console.log(clickedElement);
    clickedElement.innerHTML = "<i class='fa-solid fa-heart'></i>";
    let favoriteHeroID = clickedElement.getAttribute("data-favorite-hero-id");
    // console.log(favoriteHeroID);
    favoriteHeroesArray.push(favoriteHeroID);
    console.log(favoriteHeroesArray);
    localStorage.setItem("favorite-heroes",favoriteHeroesArray);
    console.log("localStorage:",localStorage.getItem("favorite-heroes"));
};


// Search Function(URL generated and sent to fetchAPI Function )
function search(){
    let searchInput = searchBox.value; 
    if(searchInput.trim()!==""){
        let extra = `&nameStartsWith=${searchInput}`;
        let searchURL = createAuthenticator()+extra;
        fetchAPI(searchURL);
        console.log("search")
    }else{
        alert("Empty Search Box.\nPlease Enter a Hero Name")
    }
    
};


// adding event Listener to the search button and search box
searchButton.addEventListener("click",search);
searchBox.addEventListener("keydown",(e)=>{
    if(e.key === "Enter"){
        search();
    }
});


// Function to create Authenticator(to create a new url with a new timestamp for every request)
function createAuthenticator(baseUrl){
    var timestamp = Date.now();
    var hash = md5(timestamp+privateKey+publicKey);
    var authenticationKey = `apikey=${publicKey}&hash=${hash}&ts=${timestamp}`
    var url = baseUrl+authenticationKey;
    return url;
}

// fucntion to create a new authenticator every time the fetchAPI function is called
async function fetchData() {
    const url = createAuthenticator();
    await fetchAPI(url);
}

// Call fetchData function to initiate fetching data
fetchData();




// Hero Page Fetch
const heroPageImage = document.getElementById("hero-page-image");
const heroPageDescription = document.getElementById("hero-page-description");



async function displayHeroInHeroPage(heroId){
    const heroURL = `https://gateway.marvel.com/v1/public/characters/${heroId}?`;


    
    const response = await fetch(url);
    const jsonData = await response.json();

    if(jsonData.data["results"].length!==0){
        jsonData.data["results"].forEach(element => {
            var imageURL = element.thumbnail.path+"."+element.thumbnail.extension;
            heroPageImage.getAttribute("src","sd")
            // console.log(imageURL);
            heroCard.innerHTML =`
            <div class="hero-card" data-hero-id="${element.id}">
                <div class="hero-image-container">
                    <img src="${imageURL}" class="hero-pic">
                    <button class="add-to-favorites" data-favorite-hero-id="${element.id}">
                        <i class="fa-regular fa-heart"></i>
                        <i class="fa-solid fa-heart" style="display: none;"></i>
                    </button>
                </div>
                <p class="hero-name">${element.name}</p>
            </div>
            `;
            if(element.thumbnail.path !== "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"){
                heroContainer.appendChild(heroCard);
                // console.log("added")
            }
        });
    }else{
        alert("No Heroes Found")
    }



};

// jsonData.data["comics"]
// element.items.resourceURI
// element.items.name


// jsonData.data["series"]
// element.items.resourceURI
// element.items.name


// jsonData.data["stories"]
// element.items.resourceURI
// element.items.name

// jsonData.data["events"]
// element.items.resourceURI
// element.items.name

// jsonData.data["urls"]
// element.type
// element.url

