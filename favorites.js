let favoriteMovies = [];
const startingPoint = document.getElementById('favorites-container');

initiatePage();

//Read contents from localStorage (if any)
function initiatePage() {
    //If there is anything in localStorage, get it
    if (localStorage.getItem('favos') != null) {
        favoriteMovies = JSON.parse(localStorage.getItem("favos"));
    }
    buildFavoritesListStructure();
    createClickEventsForDeleteButtons();
    createClickEventsForEditButtons();
}

function buildFavoritesListStructure() {
    startingPoint.innerHTML = '';
    if (localStorage.length == 0) {
        let newDivTag = document.createElement('div');
        const headline = document.createElement('h2');
        headline.innerHTML = 'There are no movies to be found. Add some';
        newDivTag.appendChild(headline);
        startingPoint.appendChild(newDivTag);
        return;
    }
    for (let index = 0; index < favoriteMovies.length; index++) {

        //We need to build the HTML nodes for every movie in our favorites list
        let newDivTag = document.createElement('div');
        newDivTag.setAttribute('class', 'elementRow');
        createListRowContents(index, newDivTag);
        startingPoint.appendChild(newDivTag);
    }
}

function createListRowContents(id, myDiv) {
    createEditButton(id, myDiv);
    createMovieThumbnailImg(id, myDiv);
    createMovieInfo(id, myDiv);
    createDeleteButton(id, myDiv);
}

function createDeleteButton(id, myDiv) {
    //This is the delete button
    const delBtn = document.createElement('button');
    delBtn.innerHTML = '<img src="./images/delete-icon-png-red.png">';
    delBtn.setAttribute('id', 'del-id-' + id);
    myDiv.appendChild(delBtn);
}

function createEditButton(id, myDiv) {
    //This is the delete button
    const editBtn = document.createElement('button');
    editBtn.innerHTML = '<img src="./images/edit-button.png">';
    editBtn.setAttribute('id', 'edit-id-' + id);
    myDiv.appendChild(editBtn);
}
function createMovieInfo(id, myDiv) {
    //This is the delete button
    const infoEl = document.createElement('p');
    infoEl.innerHTML = `<strong>Title: </strong> ${favoriteMovies[id].title}<br>
    <strong>Actors: </strong> ${favoriteMovies[id].actors}<br>
    <strong>Rating: </strong> ${favoriteMovies[id].rating}<br>`;
    myDiv.appendChild(infoEl);
}

function createMovieThumbnailImg(id, myDiv) {
    const thumbDiv = document.createElement('div');
    thumbDiv.setAttribute('class', 'img-thumbs');
    const thumbImg = document.createElement('img');
    thumbImg.setAttribute('src', favoriteMovies[id].poster);
    thumbImg.setAttribute('alt', 'Movie poster');
    thumbDiv.appendChild(thumbImg);
    myDiv.appendChild(thumbDiv);
}

function removeFavoriteListElement(index) {
    if (index > -1) { // only splice array when item is found
        favoriteMovies.splice(index, 1); // 2nd parameter means remove one item only
        reIndexFavoritesListItems();
        
        //Show the new contents of our list
        updateStatus();
    }
}
function reIndexFavoritesListItems() {
    for (let index = 0; index < favoriteMovies.length; index++) {
        favoriteMovies[index].id = index;
    }
    localStorage.setItem('favos', JSON.stringify(favoriteMovies))
}
function updateStatus() {
    //We call the function every time we add or remove an item from the list.
    //and also when we load the page for the first time

    //Before we do the refresh, we need to remove the current children from our list,
    //otherwise we end up with duplicates
    startingPoint.innerHTML = '';
    initiatePage();
}
// -----------------------  Event listener(s) - start -------------------------
clearAll.addEventListener('click', (event) => {
    if (confirm("You are about to delete ALL your favorites")) {
        localStorage.clear();
        favoriteMovies = [];
        buildFavoritesListStructure();
    }
});
function createClickEventForDelete(id) {
    const delButton = document.getElementById('del-id-' + id);
    delButton.addEventListener('click', (event) => {
        if (confirm("Is it really ok to delete this item?")) {
            //Remove the corresponding item;
            //We will also need to re-index the list elements after the removed item,
            //as well as recreate the button events (to be in sync)
            removeFavoriteListElement(id);
          }
    });
}
function createClickEventForEdit(id) {
    const editButton = document.getElementById('edit-id-' + id);
    editButton.addEventListener('click', (event) => {
        //Remove tyhe corresponding item from the bucketListArr;
        window.location.href = `/editMovie.html?id=${encodeURIComponent(favoriteMovies[id].id)}`;
    });
}
function createClickEventsForDeleteButtons() {
    for (let index = 0; index < favoriteMovies.length; index++) {
        createClickEventForDelete(index);
    }
}

function createClickEventsForEditButtons() {
    for (let index = 0; index < favoriteMovies.length; index++) {
        createClickEventForEdit(index);
    }
}

// -----------------------  Event listener(s) - end -------------------------