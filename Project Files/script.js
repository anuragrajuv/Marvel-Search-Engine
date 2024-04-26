
const publicKey = "29f38fa9a046140d30f7b08171dd1ef9";
const privateKey = "a9cc3279556e7415a3afd4ad3e2d453c0dd300ae";
const baseUrl = "https://gateway.marvel.com/v1/public/characters?"

// console.log(authenticationKey);

const heroContainer = document.querySelector("#hero-container");
const searchButton = document.querySelector("#search-button");
const searchBox = document.querySelector("#search-box")



function createAuthenticator(){
    var timestamp = Date.now();
    var hash = md5(timestamp+privateKey+publicKey);
    var authenticationKey = `apikey=${publicKey}&hash=${hash}&ts=${timestamp}`
    var url = baseUrl+authenticationKey;
    return url;
}


async function fetchAPI(url){
    heroContainer.innerHTML = "";
    const response = await fetch(url);
    const jsonData = await response.json();

    if(jsonData.data["results"].length!==0){
        jsonData.data["results"].forEach(element => {
            let heroCard = document.createElement("card");
            let imageURL = element.thumbnail.path+"."+element.thumbnail.extension;
            // console.log(imageURL);
            heroCard.innerHTML =`
            <div class="hero-card" id="${element.id}">
                <div class="hero-image-container">
                    <img src="${imageURL}" class="hero-pic">
                    <button>
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
    // console.log(jsonData.data["results"])
    
}


function heroPage(){
    console.log("click");
}

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
    
}


searchButton.addEventListener("click",search);
searchBox.addEventListener("keydown",(e)=>{
    if(e.key === "Enter"){
        search();
    }
})

async function fetchData() {
    const url = createAuthenticator();
    await fetchAPI(url);
}

// Call fetchData function to initiate fetching data
fetchData();



// window.addEventListener("click",()=>{
    
// })




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

