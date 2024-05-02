const publicKey = "29f38fa9a046140d30f7b08171dd1ef9";
const privateKey = "a9cc3279556e7415a3afd4ad3e2d453c0dd300ae";
const baseUrl = "https://gateway.marvel.com/v1/public/characters?"



// Hero Page Fetch

const urlParams = new URLSearchParams(window.location.search);
const heroId = urlParams.get("id");
console.log("heroId:",heroId);
const heroPageContainer = document.getElementById("hero-page-container")


async function displayHeroInHeroPage(heroId){
    var timestamp = Date.now();
    var hash = md5(timestamp+privateKey+publicKey);
    var authenticationKey = `apikey=${publicKey}&hash=${hash}&ts=${timestamp}`;
    var baseHeroURL = `https://gateway.marvel.com/v1/public/characters/${heroId}?`
    var heroURL = baseHeroURL+authenticationKey;


    console.log("reeeeeeeeeeeedddddddddd");

    const response = await fetch(heroURL);
    const jsonData = await response.json();

    if(jsonData.data["results"].length!==0){
        jsonData.data["results"].forEach(element => {
            var imageURL = element.thumbnail.path+"."+element.thumbnail.extension;
            console.log(imageURL);

            heroPageContainer.innerHTML =`
            <img src="${imageURL}" alt="" id="hero-page-image">
            <div id="bio-container">
                <div>${element.name}</div>
                <div id="hero-page-description">${element.bio}</div>
            </div>
            
            `;
            document.title = element.name;
        });
    }else{
        alert("No Heroes Found")
    }
};


displayHeroInHeroPage(heroId);

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
