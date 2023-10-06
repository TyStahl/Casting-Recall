/* global data */

const $submit = document.querySelector('#film-search');
const $searchTerm = document.querySelector('#film-search-input');
const $renderList = document.querySelector('#render-list');
const $landingPage = document.querySelector("[data-view='landing']");
const $searchPage = document.querySelector("[data-view='search']");
const $castPage = document.querySelector("[data-view='cast']");
const $peoplePage = document.querySelector("[data-view='people']");

$submit.addEventListener('submit', captureSearch);
function captureSearch(event) {
  event.preventDefault();
  let term = '';
  $renderList.textContent = '';
  term = replaceSpaces($searchTerm.value);
  const searchURL = movieURIComponent(term);
  movieByTitle(searchURL);
}

// render list items
function renderMovies(renderData) {
  const $movieListItem = document.createElement('li');
  $movieListItem.setAttribute('class', 'column-full column-half j-b no-wrap card');
  $movieListItem.setAttribute('id', renderData.id);
  $renderList.appendChild($movieListItem);

  const $moviePosterBox = document.createElement('div');
  $moviePosterBox.setAttribute('class', 'poster a-center');
  $movieListItem.appendChild($moviePosterBox);

  const $movieTitleBox = document.createElement('div');
  $movieTitleBox.setAttribute('class', 'column-half a-center j-center');
  $movieListItem.appendChild($movieTitleBox);

  const $editBox = document.createElement('div');
  $editBox.setAttribute('class', 'a-center');
  $movieListItem.appendChild($editBox);

  const $lookIcon = document.createElement('i');
  $lookIcon.setAttribute('class', 'fa-solid fa-magnifying-glass w-t');
  $lookIcon.setAttribute('id', 'look');
  $editBox.appendChild($lookIcon);

  const $movieTitle = document.createElement('h5');
  $movieTitle.setAttribute('class', 'w-t');
  $movieTitle.textContent = renderData.title;
  $movieTitleBox.appendChild($movieTitle);

  const $moviePoster = document.createElement('img');
  $moviePoster.setAttribute(
    'src',
    `https://image.tmdb.org/t/p/original${renderData.posterUrl}`
  );
  $moviePoster.setAttribute('alt', 'poster');
  $moviePosterBox.appendChild($moviePoster);
  $renderList.appendChild($movieListItem);
}

$renderList.addEventListener('click', showCast);
function showCast(event) {
  if (event.target.tagName === 'I') {
    const closestElement = event.target.closest('li');
    let movieId = closestElement.getAttribute('id');
    movieId.toString();
    movieId = castURIComponent(movieId);
    $renderList.textContent = '';
    castById(movieId);
  }
}

function renderCast(renderData) {
  const $castListItem = document.createElement('li');
  $castListItem.setAttribute('class', 'j-b no-wrap card');
  $castListItem.setAttribute('id', renderData.id);
  $renderList.appendChild($castListItem);

  const $castProfileBox = document.createElement('div');
  $castProfileBox.setAttribute('class', 'poster a-center');
  $castListItem.appendChild($castProfileBox);

  const $castInfoDiv = document.createElement('div');
  $castInfoDiv.setAttribute('class', 'wrap a-center');
  $castListItem.appendChild($castInfoDiv);

  const $castEditDiv = document.createElement('div');
  $castEditDiv.setAttribute('class', 'a-center');
  $castListItem.appendChild($castEditDiv);

  const $recycleIcon = document.createElement('i');
  $recycleIcon.setAttribute('class', 'fa-solid fa-recycle w-t');
  $recycleIcon.setAttribute('id', 'recycle');
  $castEditDiv.appendChild($recycleIcon);

  const $castTitleBox = document.createElement('div');
  $castTitleBox.setAttribute('class', 'a-center j-center wrap');
  $castInfoDiv.appendChild($castTitleBox);

  const $castCharacter = document.createElement('p');
  $castCharacter.setAttribute('class', 'w-t');
  $castCharacter.textContent = renderData.character;
  $castTitleBox.appendChild($castCharacter);

  const $castName = document.createElement('p');
  $castName.setAttribute('class', 'w-t');
  $castName.textContent = renderData.name;
  $castTitleBox.appendChild($castName);

  const $castProfile = document.createElement('img');
  $castProfile.setAttribute(
    'src',
    `https://image.tmdb.org/t/p/original${renderData.profileUrl}`
  );
  $castProfile.setAttribute('alt', 'poster');
  $castProfileBox.appendChild($castProfile);

  $renderList.appendChild($castListItem);
}

function castURIComponent(string) {
  const uri = 'https://lfz-cors.herokuapp.com/?url=';
  const targetURL =
    uri +
    `https://api.themoviedb.org/3/movie/${string}/credits?language=en-US`;
  return targetURL;

}

function castById(string) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', string);
  xhr.responseType = 'json';
  xhr.setRequestHeader(
    'Authorization',
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZmQwZGQ1MGI5MzViZjM3NzkyMWE3ZTA2OGFjY2VjNSIsInN1YiI6IjY1MTViNzcyZWE4NGM3MDBhZWU4ODI0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1LFt7yZr-QHp66Wims95ri7xuVOFeHDZMj0tIYzLixY'
  );
  xhr.addEventListener('load', function () {
    const response = xhr.response;
    data.cast = response.cast;
    for (let i = 0; i < data.cast.length; i++) {

      const renderData = {
        id: data.cast[i].id,
        name: data.cast[i].name,
        character: data.cast[i].character,
        profileUrl: data.cast[i].profile_path
      };
      renderCast(renderData);
    }
    viewSwap('cast');
  });
  xhr.send();
}

function movieURIComponent(string) {
  const uri = 'https://lfz-cors.herokuapp.com/?url=';
  const targetURL =
    uri +
    `https://api.themoviedb.org/3/search/movie?query=${string}&include_adult=true&language=en-US&page=1`;
  return targetURL;
}

function movieByTitle(string) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', string);
  xhr.responseType = 'json';
  xhr.setRequestHeader(
    'Authorization',
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZmQwZGQ1MGI5MzViZjM3NzkyMWE3ZTA2OGFjY2VjNSIsInN1YiI6IjY1MTViNzcyZWE4NGM3MDBhZWU4ODI0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1LFt7yZr-QHp66Wims95ri7xuVOFeHDZMj0tIYzLixY'
  );
  xhr.addEventListener('load', function () {
    const response = xhr.response;
    data.movies = response.results;
    for (let i = 0; i < data.movies.length; i++) {
      const renderData = {
        id: data.movies[i].id,
        title: data.movies[i].original_title,
        posterUrl: data.movies[i].poster_path
      };
      renderMovies(renderData);
    }
    viewSwap('landing');
  });
  xhr.send();
}

function replaceSpaces(string) {
  const regex = / /gi;
  const newString = string.replace(regex, '%20');
  return newString;
}

function viewSwap(viewname) {
  switch (viewname) {
    case 'landing':
      $landingPage.className = '';
      $searchPage.className = 'hidden';
      $castPage.className = 'hidden';
      $peoplePage.className = 'hidden';
      data.view = 'landing';
      break;
    case 'search':
      $landingPage.className = 'hidden';
      $searchPage.className = '';
      $castPage.className = 'hidden';
      $peoplePage.className = 'hidden';
      data.view = 'search';
      break;
    case 'cast':
      $landingPage.className = 'hidden';
      $searchPage.className = 'hidden';
      $castPage.className = '';
      $peoplePage.className = 'hidden';
      data.view = 'cast';
      break;
    case 'people':
      $landingPage.className = 'hidden';
      $searchPage.className = 'hidden';
      $castPage.className = 'hidden';
      $peoplePage.className = '';
      data.view = 'people';
      break;
  }
}
