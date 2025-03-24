import createCharacterCard from "./components/CharacterCard/CharacterCard.js";

// States
let maxPage = 1;
let page = 1;
const searchQuery = "";

//console.log(newCharacterCard);

const cardContainer = document.querySelector('[data-js="card-container"]');
//cardContainer.append(newCharacterCard);

async function fetchCharacters() {
  const response = await fetch(
    "https://rickandmortyapi.com/api/character?page=" + page
  );
  const data = await response.json();
  //console.log(data);
  let characterData = data.results;
  maxPage = data.info.pages;
  //console.log(characterData);
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

prevButton.addEventListener("click", () => {
  if (page > 1) {
    page--;
    fetchCharacters();
  }
});

nextButton.addEventListener("click", () => {
  if (page < maxPage) {
    page++;
    fetchCharacters();
  }
});

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
