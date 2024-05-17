const publicKey = "29f38fa9a046140d30f7b08171dd1ef9";
const privateKey = "a9cc3279556e7415a3afd4ad3e2d453c0dd300ae";
const baseUrl = "https://gateway.marvel.com/v1/public/characters?"



// Hero Page Fetch

const urlParams = new URLSearchParams(window.location.search);
const heroId = urlParams.get("id");
console.log("heroId:",heroId);
const heroPageContainer = document.getElementById("hero-page-container")

function authenticator(){
    var timestamp = Date.now();
    var hash = md5(timestamp+privateKey+publicKey);
    var authenticationKey = `apikey=${publicKey}&hash=${hash}&ts=${timestamp}`;
    return authenticationKey;
}

async function displayHeroInHeroPage(heroId){
    var authenticationKey = authenticator()
    var baseHeroURL = `https://gateway.marvel.com/v1/public/characters/${heroId}?`
    var heroURL = baseHeroURL+authenticationKey;

    console.log(heroURL);

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
            displayStories();
            displayEvents();
            displayLinks();
            function setFavicons(favImg){
                let headTitle = document.querySelector('head');
                let setFavicon = document.createElement('link');
                setFavicon.setAttribute('rel','shortcut icon');
                setFavicon.setAttribute('href',favImg);
                headTitle.appendChild(setFavicon);
            }
            setFavicons(imageURL);
        });
    }else{
        alert("Hero Not Found")
    }
};


displayHeroInHeroPage(heroId);



const comicsElement = document.getElementById("comics"); 
const seriesElement = document.getElementById("series"); 
const storiesElement = document.getElementById("stories"); 
const eventsElement = document.getElementById("events"); 
const linksElement = document.getElementById("urls"); 



async function displayComics(){
    var authenticationKey = authenticator()
    var baseHeroURL = `https://gateway.marvel.com/v1/public/characters/${heroId}/comics?`
    var comicsURL = baseHeroURL+authenticationKey;

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
        comicsElement.innerHTML = "No Comics Found"
    }
};

async function displaySeries(){
    var authenticationKey = authenticator()
    var baseHeroURL = `https://gateway.marvel.com/v1/public/characters/${heroId}/series?`
    var seriesURL = baseHeroURL+authenticationKey;

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
        seriesElement.innerHTML = "No Comics Found";
    }
};

async function displayEvents(){
    var authenticationKey = authenticator()
    var baseHeroURL = `https://gateway.marvel.com/v1/public/characters/${heroId}/events?`
    var eventsURL = baseHeroURL+authenticationKey;

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
        eventsElement.innerHTML = "No events Found"
    }
};


async function displayStories(){
    var authenticationKey = authenticator()
    var baseHeroURL = `https://gateway.marvel.com/v1/public/characters/${heroId}/stories?`
    var storiesURL = baseHeroURL+authenticationKey;

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
        storiesElement.innerHTML = "No Stories Found"
    }
};


async function displayLinks(){
    var authenticationKey = authenticator()
    var baseHeroURL = `https://gateway.marvel.com/v1/public/characters/${heroId}?`
    var linksURL = baseHeroURL+authenticationKey;

    let response = await fetch(linksURL);
    let jsonData = await response.json();

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
        linksElement.innerHTML = "No links Found"
    }
};
