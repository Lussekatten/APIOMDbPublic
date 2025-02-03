let moviesFromLS = [];
let currentMovie = {};

function onPageLoad() {
    // ta emot parametern från vår url
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    console.log(id);
    // hämta filmerna från LS
    moviesFromLS = JSON.parse(localStorage.getItem('favos'));
    // spara undan filmen vi är på i den globala variabeln currentMovie
    currentMovie = moviesFromLS.find((element) => element.id == id); //Creates problems with ===
    renderMovieToUI();
};
onPageLoad();

function renderMovieToUI() {
    // skriva ut bilden på sidan
    console.log(currentMovie);
    const movieImageEl = document.getElementById('movie-image');
    movieImageEl.setAttribute("src", currentMovie.poster);
    movieImageEl.setAttribute("alt", `Movie poster of ${currentMovie.title}`);
    document.getElementById("header-title").innerText = currentMovie.title;
    document.getElementById("actors").innerText = currentMovie.description;
};

const chosenGenre = document.getElementById('genre');
chosenGenre.addEventListener('change', (event) => {
    console.log(event.target.value);
});
const chosenCast = document.getElementById('actors');
chosenCast.addEventListener('change', (event) => {
    console.log(event.target.value);
});
const chosenRating = document.getElementById('movie-rating-select');
chosenRating.addEventListener('change', (event) => {
    console.log(event.target.value);
});
editMovieForm.addEventListener('submit', (event) => {
    event.preventDefault(); // förhindrar att sidan laddas om
    //1. Change the data 
    moviesFromLS[currentMovie.id].genre = chosenGenre.value;
    moviesFromLS[currentMovie.id].actors = chosenCast.value;
    moviesFromLS[currentMovie.id].rating = chosenRating.value;
    //console.log(moviesFromLS[currentMovie.id]);
    //2. Save the data
    localStorage.setItem('favos', JSON.stringify(moviesFromLS));

    //3. Redirect to favorites page
    window.location.href = `/favorites.html`;

});