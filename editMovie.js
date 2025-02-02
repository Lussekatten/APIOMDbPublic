let moviesFromLS = [];
let currentMovie = {};

function onPageLoad() {
    // ta emot parametern från vår url
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
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
