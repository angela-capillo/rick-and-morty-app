import createCharacterCard from "./components/CharacterCard/CharacterCard.js";

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
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');
const form = document.querySelector('[data-js="search-bar-container"]');

pagination.textContent = page + "/" + maxPage; //this needs to be dynamic? how?

prevButton.addEventListener("click", () => {
  if (page > 1) {
    page--;
    fetchCharacters();
    pagination.textContent = page + "/" + maxPage;
  }
});

nextButton.addEventListener("click", () => {
  if (page < maxPage) {
    page++;
    fetchCharacters();
    pagination.textContent = page + "/" + maxPage;
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  //console.log(data);
  //console.log(data.query);
  searchQuery = data.query;
  page = 1;
  console.log(searchQuery);
  fetchCharacters();
});

// this has to happen before the event listener
// function disablePrevButton() {
//   if (page === 1) {
//     prevButton.disabled = true;
//   } else {
//     prev.disabled = false;
//   }
// }
// disablePrevButton();

// function disableNextButton() {
//   if (page === maxPage) {
//     nextButton.disabled = true;
//   } else {
//     next.disabled = false;
//   }
// }
// disableNextButton();