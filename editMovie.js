let moviesFromLS = [];
let currentMovie = {};

function onPageLoad() {
    // Read the url parameters
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    // Read the LS
    moviesFromLS = JSON.parse(localStorage.getItem('favos'));
    // spara undan filmen vi är på i den globala variabeln currentMovie
    currentMovie = moviesFromLS.find((element) => element.id == id); //Creates problems with ===
    renderMovieDataToUI();
};
onPageLoad();

function renderMovieDataToUI() {
    const movieImageEl = document.getElementById('movie-image');
    movieImageEl.setAttribute("src", currentMovie.poster);
    movieImageEl.setAttribute("alt", `Movie poster of ${currentMovie.title}`);
    document.getElementById("header-title").innerText = currentMovie.title;
    document.getElementById("genre").value = currentMovie.genre;
    document.getElementById("actors").value = currentMovie.actors;
    document.getElementById("movie-rating-select").value = currentMovie.rating;
};

const chosenGenre = document.getElementById('genre');
chosenGenre.addEventListener('change', (event) => {
});
const chosenCast = document.getElementById('actors');
chosenCast.addEventListener('change', (event) => {
});
const chosenRating = document.getElementById('movie-rating-select');
chosenRating.addEventListener('change', (event) => {
});
editMovieForm.addEventListener('submit', (event) => {
    event.preventDefault(); // förhindrar att sidan laddas om
    //1. Change the data 
    moviesFromLS[currentMovie.id].genre = chosenGenre.value;
    moviesFromLS[currentMovie.id].actors = chosenCast.value;
    moviesFromLS[currentMovie.id].rating = chosenRating.value;

    //2. Save the data
    localStorage.setItem('favos', JSON.stringify(moviesFromLS));

    //3. Redirect to favorites page
    window.location.href = `/favorites.html`;

});