const publicKey = "29f38fa9a046140d30f7b08171dd1ef9";
const privateKey = "a9cc3279556e7415a3afd4ad3e2d453c0dd300ae";
const baseUrl = "https://gateway.marvel.com/v1/public/characters?"

const heroPageContainer = document.getElementById("hero-page-container")
const comicsElement = document.getElementById("comics"); 
const seriesElement = document.getElementById("series"); 
const storiesElement = document.getElementById("stories"); 
const eventsElement = document.getElementById("events"); 
const linksElement = document.getElementById("urls"); 


// Hero Page Fetch

const urlParams = new URLSearchParams(window.location.search);
const heroId = urlParams.get("id");
console.log("heroId:",heroId);

heroPageContainer.parentElement.setAttribute("hidden", "");
comicsElement.parentElement.setAttribute("hidden", "");
seriesElement.parentElement.setAttribute("hidden", "");
storiesElement.parentElement.setAttribute("hidden", "");
eventsElement.parentElement.setAttribute("hidden", "");
linksElement.parentElement.setAttribute("hidden", "");

function authenticator(){
    var timestamp = Date.now();
    var hash = md5(timestamp+privateKey+publicKey);
    var authenticationKey = `apikey=${publicKey}&hash=${hash}&ts=${timestamp}`;
    return authenticationKey;
}

async function displayHeroInHeroPage(heroId){

    const loadingSpinner = document.getElementById("loading");
    // heroPageContainer.setAttribute("hidden", "");
    loadingSpinner.removeAttribute("hidden");
    
    var authenticationKey = authenticator()
    var baseHeroURL = `https://gateway.marvel.com/v1/public/characters/${heroId}?`
    var heroURL = baseHeroURL+authenticationKey;

    console.log(heroURL);

    try{
        let response = await fetch(heroURL);
        let jsonData = await response.json();
    
        if(jsonData.data["results"].length!==0){
            jsonData.data["results"].forEach(element => {
                document.title = element.name;
                let imageURL = element.thumbnail.path+"."+element.thumbnail.extension;
                heroPageContainer.innerHTML =`
                <img src="${imageURL}" alt="" id="hero-page-image">
                <div id="bio-container">
                    <div id="hero-name">${element.name}</div>
                    <div id="hero-page-description">${element.description}</div>
                </div>
                `;
                displayComics();
                displaySeries();
                displayEvents();
                displayStories();
                displayLinks();
                setFavicons(imageURL);
            });
        }else{
            alert("Hero Not Found")
        }
    }finally{
        loadingSpinner.setAttribute("hidden", "");
        heroPageContainer.parentElement.removeAttribute("hidden");
    }
};


displayHeroInHeroPage(heroId);


function setFavicons(favImg){
    let headTitle = document.querySelector('head');
    let setFavicon = document.createElement('link');
    setFavicon.setAttribute('rel','shortcut icon');
    setFavicon.setAttribute('href',favImg);
    headTitle.appendChild(setFavicon);
}


async function displayComics(){
    
    var authenticationKey = authenticator()
    var baseHeroURL = `https://gateway.marvel.com/v1/public/characters/${heroId}/comics?`
    var comicsURL = baseHeroURL+authenticationKey;
    
    try{
        let response = await fetch(comicsURL);
        let jsonData = await response.json();

        if(jsonData.data["results"].length!==0){
            jsonData.data["results"].forEach(element => {
                let imageURL = element.thumbnail.path+"."+element.thumbnail.extension;
                var card = document.createElement("div");
                card.innerHTML = `
                <img src="${imageURL}">
                <p style="">${element.title}</p>
                `;
                comicsElement.appendChild(card);
            });
        }else{
            comicsElement.parentElement.style.display = "none";
        };
    }finally{
        comicsElement.parentElement.removeAttribute("hidden");
    }
};

async function displaySeries(){
    var authenticationKey = authenticator()
    var baseHeroURL = `https://gateway.marvel.com/v1/public/characters/${heroId}/series?`
    var seriesURL = baseHeroURL+authenticationKey;

    seriesElement.parentElement.setAttribute("hidden", "");

    try{
        let response = await fetch(seriesURL);
        let jsonData = await response.json();

        if(jsonData.data["results"].length!==0){
            jsonData.data["results"].forEach(element => {
                let imageURL = element.thumbnail.path+"."+element.thumbnail.extension;
                var card = document.createElement("div");
                card.innerHTML = `
                <img src="${imageURL}">
                <p style="">${element.title}</p>
                `;
                seriesElement.appendChild(card);
            });
        }else{
            seriesElement.parentElement.style.display = "none";

        }
    }finally{
        seriesElement.parentElement.removeAttribute("hidden");
    }
};

async function displayEvents(){
    var authenticationKey = authenticator()
    var baseHeroURL = `https://gateway.marvel.com/v1/public/characters/${heroId}/events?`
    var eventsURL = baseHeroURL+authenticationKey;

    eventsElement.parentElement.setAttribute("hidden", "");
    try{  
        let response = await fetch(eventsURL);
        let jsonData = await response.json();

        if(jsonData.data["results"].length!==0){
            jsonData.data["results"].forEach(element => {
                let imageURL = element.thumbnail.path+"."+element.thumbnail.extension;
                var card = document.createElement("div");
                card.innerHTML = `
                <img src="${imageURL}">
                <p style="">${element.title}</p>
                `;
                eventsElement.appendChild(card);
            });
        }else{
            eventsElement.parentElement.style.display = "none";
        }
    }finally{
        eventsElement.parentElement.removeAttribute("hidden");
    }
};


async function displayStories(){
    var authenticationKey = authenticator()
    var baseHeroURL = `https://gateway.marvel.com/v1/public/characters/${heroId}/stories?`
    var storiesURL = baseHeroURL+authenticationKey;

    storiesElement.parentElement.setAttribute("hidden", "");
    try{
        let response = await fetch(storiesURL);
        let jsonData = await response.json();

        if(jsonData.data["results"].length!==0){
            jsonData.data["results"].forEach(element => {
                var card = document.createElement("li");
                card.innerHTML = `
                ${element.title}
                `;
                storiesElement.appendChild(card);
            });
        }else{
            storiesElement.parentElement.style.display = "none";
        };
    }finally{
        storiesElement.parentElement.removeAttribute("hidden");
    }
};


async function displayLinks(){
    var authenticationKey = authenticator()
    var baseHeroURL = `https://gateway.marvel.com/v1/public/characters/${heroId}?`
    var linksURL = baseHeroURL+authenticationKey;

    linksElement.parentElement.setAttribute("hidden", "");

    let response = await fetch(linksURL);
    let jsonData = await response.json();

    try{    
        if(jsonData.data["results"].length!==0){
            jsonData.data["results"].forEach(element => {
                element.urls.forEach(element =>{
                    var card = document.createElement("li");
                    card.innerHTML = `<a href="${element.url}">
                    ${element.type}
                    `;
                    linksElement.appendChild(card);
                })
            });
        }else{
            linksElement.parentElement.style.display = "none";
        }
    }finally{
        linksElement.parentElement.removeAttribute("hidden");
    }
};
