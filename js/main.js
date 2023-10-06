/* global data */

const $submitMovie = document.querySelector('#film-search');
const $submitPeople = document.querySelector('#people-search');
const $movieSearchInput = document.querySelector('#film-search-input');
const $peopleSearchInput = document.querySelector('#people-search-input');
const $renderMovieList = document.querySelector('#render-movie-list');
const $renderCastList = document.querySelector('#render-cast-list');
const $renderPeopleList = document.querySelector('#render-people-list');
const $landingPage = document.querySelector("[data-view='landing']");
const $searchPage = document.querySelector("[data-view='search']");
const $castPage = document.querySelector("[data-view='cast']");
const $peoplePage = document.querySelector("[data-view='people']");

// input submit for movie search
$submitMovie.addEventListener('submit', captureMovieSearch);
function captureMovieSearch(event) {
  event.preventDefault();
  let term = '';
  $renderMovieList.textContent = '';
  $renderCastList.textContent = '';
  term = replaceSpaces($movieSearchInput.value);
  const searchURL = movieURIComponent(term);
  movieByTitle(searchURL);
}

function replaceSpaces(string) {
  const regex = / /gi;
  const newString = string.replace(regex, '%20');
  return newString;
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
    viewSwap('search');
  });
  xhr.send();
}

// render list items
function renderMovies(renderData) {
  const $movieListItem = document.createElement('li');
  $movieListItem.setAttribute('class', 'column-full column-half j-b no-wrap card');
  $movieListItem.setAttribute('id', renderData.id);
  $renderMovieList.appendChild($movieListItem);

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
  $lookIcon.setAttribute('class', 'fa-solid fa-magnifying-glass fa-2xl w-t');
  $lookIcon.setAttribute('id', 'look');
  $editBox.appendChild($lookIcon);

  const $movieTitle = document.createElement('h5');
  $movieTitle.setAttribute('class', 'w-t');
  $movieTitle.textContent = renderData.title;
  $movieTitleBox.appendChild($movieTitle);

  const $moviePoster = document.createElement('img');
  if (renderData.posterUrl !== null) {
    $moviePoster.setAttribute(
      'src',
    `https://image.tmdb.org/t/p/original${renderData.posterUrl}`);
  } else {
    $moviePoster.setAttribute(
      'src',
      'images/placeholder-image-2-3.png'
    );
  }
  $moviePoster.setAttribute('alt', 'poster');
  $moviePosterBox.appendChild($moviePoster);
  $renderMovieList.appendChild($movieListItem);
}
// end of movie functions

// start of cast functions

// click listener to show cast members of selected movie
$renderMovieList.addEventListener('click', showCast);
function showCast(event) {
  if (event.target.tagName === 'I') {
    const closestElement = event.target.closest('li');
    let movieId = closestElement.getAttribute('id');
    movieId.toString();
    movieId = castURIComponent(movieId);
    $renderMovieList.textContent = '';
    castById(movieId);
  }
}

// generates URL with selected movie id interpolated to pull cast api data
function castURIComponent(string) {
  const uri = 'https://lfz-cors.herokuapp.com/?url=';
  const targetURL =
    uri +
    `https://api.themoviedb.org/3/movie/${string}/credits?language=en-US`;
  return targetURL;
}

// api request function
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

// render list items of cast members
function renderCast(renderData) {
  const $castListItem = document.createElement('li');
  $castListItem.setAttribute('class', 'column-full column-half j-b no-wrap card');
  $castListItem.setAttribute('id', renderData.id);
  $renderCastList.appendChild($castListItem);

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
  $recycleIcon.setAttribute('class', 'fa-solid fa-recycle fa-2xl w-t');
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

  if (renderData.profileUrl !== null) {
    $castProfile.setAttribute(
      'src',
      `https://image.tmdb.org/t/p/original${renderData.profileUrl}`
    );
  } else {
    $castProfile.setAttribute('src', 'images/placeholder-image-2-3.png');
  }
  $castProfile.setAttribute('alt', 'poster');
  $castProfileBox.appendChild($castProfile);

  $renderCastList.appendChild($castListItem);
}

// end of cast functions

// start of people functions

// click listener to move to people search page to swap actors
$renderCastList.addEventListener('click', showPeople);
function showPeople(event) {
  if (event.target.tagName === 'I') {
    const closestElement = event.target.closest('li');
    const $actorToSwapId = closestElement.getAttribute('id');
    const $castMembers = document.querySelectorAll('li');
    for (let i = 0; i < $castMembers.length; i++) {
      const $castmemberID = $castMembers[i].getAttribute('id');
      if ($castmemberID !== $actorToSwapId) {
        $renderCastList.removeChild($castMembers[i]);
      }
    }
  }
}

// let movieId = closestElement.getAttribute('id');
// movieId.toString();
// movieId = castURIComponent(movieId);
// $renderMovieList.textContent = '';
// castById(movieId);

$submitPeople.addEventListener('submit', capturePeopleSearch);
function capturePeopleSearch(event) {
  event.preventDefault();
  let peopleTerm = '';
  $renderMovieList.textContent = '';
  $renderPeopleList.textContent = '';
  peopleTerm = replaceSpaces($peopleSearchInput.value);

  const searchURL = peopleNameURIComponent(peopleTerm);
  peopleByName(searchURL);
}

function peopleByName(string) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', string);
  xhr.responseType = 'json';
  xhr.setRequestHeader(
    'Authorization',
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZmQwZGQ1MGI5MzViZjM3NzkyMWE3ZTA2OGFjY2VjNSIsInN1YiI6IjY1MTViNzcyZWE4NGM3MDBhZWU4ODI0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1LFt7yZr-QHp66Wims95ri7xuVOFeHDZMj0tIYzLixY'
  );
  xhr.addEventListener('load', function () {
    const response = xhr.response;
    data.people = response.results;
    for (let i = 0; i < data.people.length; i++) {
      const renderData = {
        id: data.people[i].id,
        name: data.people[i].name,
        profileUrl: data.people[i].profile_path,
        knownFor: data.people[i].known_for
      };
      renderPeople(renderData);

    }
    viewSwap('people');
  });
  xhr.send();
}

function peopleNameURIComponent(string) {
  const uri = 'https://lfz-cors.herokuapp.com/?url=';
  const targetURL =
    uri +
    `https://api.themoviedb.org/3/search/person?query=${string}&include_adult=false&language=en-US&page=1`;
  return targetURL;
}

// function peopleById(string) {
//   const xhr = new XMLHttpRequest();
//   xhr.open('GET', string);
//   xhr.responseType = 'json';
//   xhr.setRequestHeader(
//     'Authorization',
//     'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZmQwZGQ1MGI5MzViZjM3NzkyMWE3ZTA2OGFjY2VjNSIsInN1YiI6IjY1MTViNzcyZWE4NGM3MDBhZWU4ODI0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1LFt7yZr-QHp66Wims95ri7xuVOFeHDZMj0tIYzLixY'
//   );
//   xhr.addEventListener('load', function () {
//     const response = xhr.response;
//     data.cast = response.cast;
//     for (let i = 0; i < data.cast.length; i++) {
//       const renderData = {
//         id: data.cast[i].id,
//         name: data.cast[i].name,
//         character: data.cast[i].character,
//         profileUrl: data.cast[i].profile_path
//       };
//       renderCast(renderData);
//     }
//     viewSwap('cast');
//   });
//   xhr.send();
// }

// render list items of actors
function renderPeople(renderData) {
  const $peopleListITem = document.createElement('li');
  $peopleListITem.setAttribute(
    'class',
    'column-full column-half j-b no-wrap card'
  );
  $peopleListITem.setAttribute('id', renderData.id);
  $renderPeopleList.appendChild($peopleListITem);

  const $peopleProfileBox = document.createElement('div');
  $peopleProfileBox.setAttribute('class', 'poster a-center');
  $peopleListITem.appendChild($peopleProfileBox);

  const $peopleInfoDiv = document.createElement('div');
  $peopleInfoDiv.setAttribute('class', 'wrap a-center');
  $peopleListITem.appendChild($peopleInfoDiv);

  const $peopleEditDiv = document.createElement('div');
  $peopleEditDiv.setAttribute('class', 'a-center');
  $peopleListITem.appendChild($peopleEditDiv);

  const $selectIcon = document.createElement('a');
  $selectIcon.textContent = 'select';
  $selectIcon.setAttribute('class', 'w-t');
  $selectIcon.setAttribute('id', 'select');
  $peopleEditDiv.appendChild($selectIcon);

  const $peopleTitleBox = document.createElement('div');
  $peopleTitleBox.setAttribute('class', 'a-center j-center wrap');
  $peopleInfoDiv.appendChild($peopleTitleBox);

  // const $castCharacter = document.createElement('p');
  // $castCharacter.setAttribute('class', 'w-t');
  // $castCharacter.textContent = renderData.character;
  // $peopleTitleBox.appendChild($castCharacter);

  const $peopleName = document.createElement('p');
  $peopleName.setAttribute('class', 'w-t');
  $peopleName.textContent = renderData.name;
  $peopleTitleBox.appendChild($peopleName);

  const $peopleProfile = document.createElement('img');

  if (renderData.profileUrl !== null) {
    $peopleProfile.setAttribute(
      'src',
      `https://image.tmdb.org/t/p/original${renderData.profileUrl}`
    );
  } else {
    $peopleProfile.setAttribute('src', 'images/placeholder-image-2-3.png');
    $peopleListITem.className = 'hidden';
  }
  $peopleProfile.setAttribute('alt', 'poster');
  $peopleProfileBox.appendChild($peopleProfile);

  $renderPeopleList.appendChild($peopleListITem);
}

// end of people functions

// viewSwap function
function viewSwap(viewname) {
  switch (viewname) {
    case 'landing':
      $landingPage.className = '';
      $searchPage.className = 'hidden';
      $castPage.className = 'hidden';
      $peoplePage.className = 'hidden';
      $movieSearchInput.setAttribute('disabled');
      data.view = 'landing';
      break;
    case 'search':
      $landingPage.className = 'hidden';
      $searchPage.className = '';
      $castPage.className = 'hidden';
      $peoplePage.className = 'hidden';
      $movieSearchInput.removeAttribute('disabled');
      data.view = 'search';
      break;
    case 'cast':
      $landingPage.className = 'hidden';
      $searchPage.className = 'hidden';
      $castPage.className = '';
      $peoplePage.className = 'hidden';
      $movieSearchInput.setAttribute('disabled', 'true');
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
