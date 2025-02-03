const ACCESS_KEY = "YOUR KEY GOES HERE"; // My personal access key från OMDb Movies

let latestQuery = "";
let latestFetched = [];
let favoriteMovies = [];
//localStorage.clear(); //Used when we test things with localStorage content

// DOM-referenser
const formEl = document.getElementById("search-form");
const inputEl = document.getElementById("search-input");
const searchedContainerEl = document.getElementById("searched-container");

initiatePage();

formEl.addEventListener("submit", (event) => {
    event.preventDefault();

    const query = inputEl.value.trim();
    
    if (query) {
        fetchMovies(query);
        // spara undan query ifall vi ska använda senaste sökningen med next/prev-knapparna
        latestQuery = query;
        inputEl.value = "";
    }
});

function initiatePage(){
    //If there is anything in localStorage, get it
    if (localStorage.getItem('favos') != null) {
        favoriteMovies = JSON.parse(localStorage.getItem("favos"));
    }
}

async function fetchMovies(query) {
    const endpoint = `http://www.omdbapi.com/?s=${query}&apikey=${ACCESS_KEY}`; //Request using a movie title
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        displayImages(data.Search);
        //The click events must be created AFTERWARDS (due to async call)
        createClickEventsForAddToFavoriteButtons();
    } catch (error) {
        console.error(error);
    }
};

function displayImages(movies) {
    // rendera ut bilderna till UI:t
    searchedContainerEl.innerHTML = ""; // töm tidigare innehåll
    // Show the new movies:
    for (let index = 0; index < movies.length; index++) {
        createNewMovieItem(index, movies[index]);
        createDivContentsForFetched(index);
        //Create add-click event for this button. All button clicks will add the movie to the favorites
    }
};

function createNewMovieItem(index, movie) {
    latestFetched[index] = {
        id: index,
        imdb: movie.imdbID,
        title: movie.Title,
        genre: "", //Something to be filled in edit mode
        poster: movie.Poster,
        year: movie.Year,
        actors: "", //Something to be filled in edit mode
        rating: 4   //No movies will be selected in the favorites unless they have at least a rating of 4 (out of 5).
    }
}

function createDivContentsForFetched(id) {
    //Create outer div
    const outerDiv = document.createElement('div'); //Outer div element containing both poster and button 

    //Create the 2 divs making up the movies we just fetched
    createPosterDiv(outerDiv, latestFetched[id]);
    createButtonDiv(id, outerDiv);
    searchedContainerEl.appendChild(outerDiv);
}

function createPosterDiv(outerDiv, movie) {
    const imgDiv = document.createElement('div');
    imgDiv.classList.add('image-item');
    imgDiv.innerHTML = `<img src="${movie.poster}" alt="${movie.title}">`;
    outerDiv.appendChild(imgDiv);
}

function createButtonDiv(id, outerDiv) {
    const btnDiv = document.createElement('div');
    //Create click-event for this button
    const addToFavoritesBtn = document.createElement('button');
    addToFavoritesBtn.innerHTML = 'Add to favorites';
    addToFavoritesBtn.setAttribute('id', 'add-id-' + id);
    btnDiv.appendChild(addToFavoritesBtn);
    outerDiv.appendChild(btnDiv);
}

function createClickEventsForAddToFavoriteButtons() {
    for (let index = 0; index < latestFetched.length; index++) {
        createEventForAddToFavoriteButton(index);
    }
}
function createEventForAddToFavoriteButton(id) {
    const addToFavBtn = document.getElementById('add-id-' + id);
    addToFavBtn.addEventListener('click', (event) => {
        //We add the item to favorites, but only if it was not added previously
        if (favoriteMovies.length==0) {
            addMovieToFavorites(id);
        }
        else{
            if (!alreadyInFavorites(latestFetched[id])) {
                addMovieToFavorites(id);
                reIndexFavoritesListItems(); //A re-indexing seems necessary
            }
        }
    });
}

function reIndexFavoritesListItems() {
    for (let index = 0; index < favoriteMovies.length; index++) {
        favoriteMovies[index].id = index;
    }
    localStorage.setItem('favos', JSON.stringify(favoriteMovies))
}

function alreadyInFavorites(movie){
    for (let index = 0; index < favoriteMovies.length; index++) {
        if (favoriteMovies[index].imdb == movie.imdb) {
            return true;
        }
        
    }
    return false;
}

function addMovieToFavorites(index){
    //We need to add the movie to our list and then update the localStorage
    favoriteMovies.push(latestFetched[index]);
    localStorage.setItem('favos', JSON.stringify(favoriteMovies));
}