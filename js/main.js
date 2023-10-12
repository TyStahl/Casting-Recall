/* global data */
const $actorToReplace = document.querySelector('#actor-to-replace');
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
const $peopleSearchDiv = document.querySelector('#people-search-div');
const $backFromCast = document.querySelector('#cast-go-b');
const $backFromPeople = document.querySelector('#people-go-b');

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
      const { id, original_title: title, poster_path: posterPath } = data.movies[i];
      const renderData = {
        id,
        title,
        posterPath
      };
      $renderMovieList.appendChild(renderMovies(renderData));
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
  if (renderData.poster_path !== null) {
    $moviePoster.setAttribute(
      'src',
    `https://image.tmdb.org/t/p/original${renderData.posterPath}`);
  } else {
    $moviePoster.setAttribute(
      'src',
      'images/placeholder-image-2-3.png'
    );
  }
  $moviePoster.setAttribute('alt', 'poster');
  $moviePosterBox.appendChild($moviePoster);
  return $movieListItem;
}

// end of movie functions
// start of cast functions

// click listener to show cast members of selected movie
$backFromCast.addEventListener('click', castGoBack);
function castGoBack(event) {
  if (event.target.tagName === 'A' && data.view === 'cast') {
    viewSwap('search');
  }
}

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
      const { id, name, character, profile_path: profilePath } = data.cast[i];
      const renderData = {
        id,
        name,
        character,
        profilePath
      };
      $renderCastList.appendChild(renderCast(renderData));
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

  if (renderData.profile_path !== null) {
    $castProfile.setAttribute(
      'src',
      `https://image.tmdb.org/t/p/original${renderData.profilePath}`
    );
  } else {
    $castProfile.setAttribute('src', 'images/placeholder-image-2-3.png');
  }
  $castProfile.setAttribute('alt', 'poster');
  $castProfileBox.appendChild($castProfile);

  return $castListItem;
}

// end of cast functions

// start of people functions
$backFromPeople.addEventListener('click', peopleGoBack);
function peopleGoBack(event) {
  if (event.target.tagName === 'A' && data.view === 'people' && event.target.textContent === 'go back') {
    viewSwap('cast');
  }
}

// click listener to move to people search page to swap actors
$renderCastList.addEventListener('click', showPeople);
function showPeople(event) {
  if (data.view === 'cast' && event.target.tagName === 'I') {
    data.swapOutLi = event.target.closest('li');
    const cTitle = data.swapOutLi.children[1].children[0].children[0].textContent;
    for (let i = 0; i < data.cast.length; i++) {
      if (data.cast[i].character === cTitle) {
        const { name, profile_path: profilePath, character } = data.cast[i];
        const newObj = {
          name,
          profilePath,
          character
        };
        data.swapOut = newObj;
        break;
      }
    }
    $actorToReplace.textContent = `replace ${data.swapOut.name} with: `;
    viewSwap('people');
  }
}

$renderPeopleList.addEventListener('click', replacePeople);
function replacePeople(event) {
  if (data.view === 'people' && event.target.tagName === 'A' && event.target.textContent === 'select') {
    const swapId = event.target.closest('li').getAttribute('id');
    for (let i = 0; i < data.people.length; i++) {
      if (data.people[i].id === Number(swapId)) {
        const { name, profile_path: profilePath, id } = data.people[i];
        const newObj = {
          name,
          profilePath,
          id
        };
        data.swapIn = newObj;
        break;
      }
    }
    const swapOutChar = data.swapOut.character;
    data.swapIn.character = swapOutChar;
    for (let i = 0; i < data.cast.length; i++) {
      if (data.cast[i].character === data.swapIn.character) {
        const { name, profile_path: profilePath, character, id } = data.swapIn;
        const newObj = {
          name,
          profilePath,
          character,
          id
        };
        data.cast[i] = newObj;
        break;
      }
    }
    const swapInLi = renderCast(data.swapIn);
    $renderCastList.replaceChild(swapInLi, data.swapOutLi);
    viewSwap('cast');
  }
}

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
      const { id, name, known_for: knownFor, profile_path: profilePath } = data.people[i];
      const renderData = {
        id,
        name,
        profilePath,
        knownFor
      };
      $renderPeopleList.appendChild(renderPeople(renderData));
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

// render list items of actors
function renderPeople(renderData) {
  const $peopleListItem = document.createElement('li');
  $peopleListItem.setAttribute(
    'class',
    'column-full column-half j-b no-wrap card'
  );
  $peopleListItem.setAttribute('id', renderData.id);
  $renderPeopleList.appendChild($peopleListItem);

  const $peopleProfileBox = document.createElement('div');
  $peopleProfileBox.setAttribute('class', 'poster a-center');
  $peopleListItem.appendChild($peopleProfileBox);

  const $peopleInfoDiv = document.createElement('div');
  $peopleInfoDiv.setAttribute('class', 'wrap a-center');
  $peopleListItem.appendChild($peopleInfoDiv);

  const $peopleEditDiv = document.createElement('div');
  $peopleEditDiv.setAttribute('class', 'a-center');
  $peopleListItem.appendChild($peopleEditDiv);

  const $selectIcon = document.createElement('a');
  $selectIcon.textContent = 'select';
  $selectIcon.setAttribute('class', 'w-t');
  $selectIcon.setAttribute('id', 'select');
  $peopleEditDiv.appendChild($selectIcon);

  const $peopleTitleBox = document.createElement('div');
  $peopleTitleBox.setAttribute('class', 'a-center j-center wrap');
  $peopleInfoDiv.appendChild($peopleTitleBox);

  const $peopleName = document.createElement('p');
  $peopleName.setAttribute('class', 'w-t');
  $peopleName.textContent = renderData.name;
  $peopleTitleBox.appendChild($peopleName);

  const $peopleProfile = document.createElement('img');

  if (renderData.profile_path !== null) {
    $peopleProfile.setAttribute(
      'src',
      `https://image.tmdb.org/t/p/original${renderData.profilePath}`
    );
  } else {
    $peopleProfile.setAttribute('src', 'images/placeholder-image-2-3.png');
    $peopleListItem.className = 'hidden';
  }
  $peopleProfile.setAttribute('alt', 'poster');
  $peopleProfileBox.appendChild($peopleProfile);

  return $peopleListItem;
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
      $peopleSearchDiv.setAttribute('class', 'a-center column-full hidden');
      data.view = 'landing';
      break;
    case 'search':
      $landingPage.className = 'hidden';
      $searchPage.className = '';
      $castPage.className = 'hidden';
      $peoplePage.className = 'hidden';
      $movieSearchInput.removeAttribute('disabled', 'false');
      $peopleSearchDiv.setAttribute('class', 'a-center column-full hidden');
      data.view = 'search';
      break;
    case 'cast':
      $landingPage.className = 'hidden';
      $searchPage.className = 'hidden';
      $castPage.className = '';
      $peoplePage.className = 'hidden';
      $movieSearchInput.setAttribute('disabled', 'true');
      $peopleSearchDiv.setAttribute('class', 'a-center column-full hidden');
      data.view = 'cast';
      break;
    case 'people':
      $landingPage.className = 'hidden';
      $searchPage.className = 'hidden';
      $castPage.className = 'hidden';
      $peoplePage.className = '';
      $peopleSearchDiv.setAttribute('class', 'a-center column-full');
      data.view = 'people';
      break;
  }
}
