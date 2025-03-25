import createCharacterCard from "./components/CharacterCard/CharacterCard.js";
import NavButton from "./components/NavButton/NavButton.js";
import NavPagination from "./components/NavPagination/NavPagination.js";
import SearchBar from "./components/SearchBar/SearchBar.js";

// States
let maxPage = 1;
let page = 1;
let searchQuery = "";

const cardContainer = document.querySelector('[data-js="card-container"]');

async function fetchCharacters() {
  let searchFullName = searchQuery ? "&name=" + encodeURIComponent(searchQuery) : "";
  const response = await fetch(
    "https://rickandmortyapi.com/api/character?page=" + page + searchFullName
  );
  const data = await response.json();
  let characterData = data.results;
  maxPage = data.info.pages;
  updatePagination();
  cardContainer.innerHTML = "";
  characterData.forEach((character) => {
    let newCharacterCard = createCharacterCard(character);
    cardContainer.append(newCharacterCard);
  });
  return data;
}

fetchCharacters();

const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
//const prevButton = document.querySelector('[data-js="button-prev"]');
//const nextButton = document.querySelector('[data-js="button-next"]');
//const pagination = document.querySelector('[data-js="pagination"]');
//const form = document.querySelector('[data-js="search-bar-container"]');

// prevButton.addEventListener("click", () => {
//   if (page > 1) {
//     page--;
//     fetchCharacters();
//   }
// });

// nextButton.addEventListener("click", () => {
//   if (page < maxPage) {
//     page++;
//     fetchCharacters();
//   }
// });

// creating the functions that need to happen "onClick"

function previousPage() {
  if (page > 1) {
    page--;
    fetchCharacters();
  }
};

function nextPage() {
    if (page < maxPage) {
    page++;
    fetchCharacters();
  }
};

// rendering the buttons:

const prevButton = NavButton("previous", "button button--prev", previousPage);
const nextButton = NavButton("next", "button button--next", nextPage);


const pagination = NavPagination();

// appending buttons and pagination to navigation:

navigation.append(prevButton, pagination, nextButton);


// creating the function that needs to happen "onSubmit"

function search(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  searchQuery = data.query;
  page = 1;
  console.log(searchQuery);
  fetchCharacters();
};

// rendering the search form in index.js

const form = SearchBar(search);

// appending the form to the search bar div

searchBarContainer.append(form);


// form.addEventListener("submit", (event) => {
//   event.preventDefault();
//   const formData = new FormData(event.target);
//   const data = Object.fromEntries(formData);
//   searchQuery = data.query;
//   page = 1;
//   console.log(searchQuery);
//   fetchCharacters();
// });

function updatePaginationNumbers() {
  pagination.textContent = page + "/" + maxPage;
};

function updatePagination() {
  prevButton.disabled = page === 1;
  nextButton.disabled = page === maxPage;
  updatePaginationNumbers();
};