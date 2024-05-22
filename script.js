localStorage.getItem("favorite-heroes");

// const publicKey = "29f38fa9a046140d30f7b08171dd1ef9";
// const privateKey = "a9cc3279556e7415a3afd4ad3e2d453c0dd300ae";
const publicKey = "e7ce26847d426b68eb35e5fb5970816a";
const privateKey = "823b7ea7307d50500e57bfba3846842b6fdf667e";
const baseUrl = "https://gateway.marvel.com/v1/public/characters?limit=99&"

// console.log(authenticationKey);

const heroContainer = document.querySelector("#hero-container");
const searchButton = document.querySelector("#search-button");
const searchBox = document.querySelector("#search-box");

let heroNames = [];
const heroNameDropdown = document.getElementById('names-dropdown');


async function fetchAPI(url){
    const loadingSpinner = document.getElementById("loading");
    loadingSpinner.removeAttribute("hidden");

    try{
        const response = await fetch(url);
        const jsonData = await response.json();

        var resultsArr = jsonData.data["results"];
        shuffle(resultsArr);

        if(resultsArr.length!==0){
            resultsArr.forEach(element => {
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
    } catch {
        console.error("Error Fetching Data:",error)
    } finally{
        loadingSpinner.setAttribute("hidden", "");
    }
};



// redirecting to HERO PAGE
heroContainer.addEventListener('click', function(event) {
    // Access the clicked target
    const clickedElement = event.target;
    // Check if the clicked element is a hero card
    if (clickedElement.classList.contains('hero-card')) {
        // Access the hero ID from data attribute
        const heroId = clickedElement.getAttribute('data-hero-id');
        
        // Now you can do whatever you need with the hero ID
        console.log('Clicked hero ID:', heroId);
        
        // Redirect to the hero's page passing the heroId as a parameter
        localStorage.setItem("heroId",heroId);
        console.log(localStorage.getItem("heroId"))
        window.open(`hero page.html?id=${heroId}`, "_blank");
        
    }else if(clickedElement.classList.contains('add-to-favorites')){
        addToFavorites(event);
    }
});

// Function to add Heroes to Favorites List
function addToFavorites(event){
    var exsitingFavorites = localStorage.getItem("favorite-heroes");
    console.log("exsitingFavorites",exsitingFavorites);
    const clickedElement = event.target;
    console.log(clickedElement);
    clickedElement.innerHTML = "<i class='fa-solid fa-heart'></i>";
    let favoriteHeroID = clickedElement.getAttribute("data-favorite-hero-id");
    if(exsitingFavorites===""){
        // console.log(favoriteHeroesArray);
        localStorage.setItem("favorite-heroes",favoriteHeroID);
        console.log("localStorage:",localStorage.getItem("favorite-heroes"));
    }else{
        final = exsitingFavorites+","+(favoriteHeroID);
        localStorage.setItem("favorite-heroes",final);
    }
    
};


// Search Function(URL generated and sent to fetchAPI Function )
function search(){
    let searchInput = searchBox.value; 
    if(searchInput.trim()!==""){
        heroContainer.innerHTML = `<div id="loading" class="loading-spinner" hidden></div>`;
        let extra = `&nameStartsWith=${searchInput}`;
        let searchURL = createAuthenticator()+extra;
        fetchAPI(searchURL);
        searchBox.value = "";
    }else{
        alert("Empty Search Box.\nPlease Enter a Hero Name")
    }
    
};



function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
  

// adding event Listener to the search button and search box
searchButton.addEventListener("click",()=>{
    search();
    heroNameDropdown.innerHTML = "";
    searchBox.style.borderRadius = "20px 0 0 20px";
});

searchBox.addEventListener("keydown",(e)=>{
    if(e.key === "Enter"){
        search();
        heroNameDropdown.innerHTML = "";
        searchBox.style.borderRadius = "20px 0 0 20px";
    }
});


// Function to create Authenticator(to create a new url with a new timestamp for every request)
function createAuthenticator(){
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





function fetchHeroNames(){
    console.log("fetchHeroName ran")
    let searchInput = searchBox.value;
    let extra = `&nameStartsWith=${searchInput}`;
    let dropdownURL = createAuthenticator()+extra;
    fetch(dropdownURL)
    .then((response)=>response.json())
    .then((data)=>{
        heroNames = data.data.results.map(x => x.name);
        searchBox.style.borderRadius = "20px 0 0 0";
        loadData(heroNames,heroNameDropdown);
    })
}

function loadData(data,element){
    if(data){
        element.innerHTML = "";
        let innerElement = "";
        data.forEach((item)=>{
            innerElement +=`
            <li>${item}</li>
            `;
        });

        element.innerHTML = innerElement;
    }
}


searchBox.addEventListener("input",fetchHeroNames);


heroNameDropdown.addEventListener("click",(e)=>{
    searchBox.value = e.target.innerHTML;
    heroNameDropdown.innerHTML = "";
    searchBox.style.borderRadius = "20px 0 0 20px";
    search();
});