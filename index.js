import createCharacterCard from "./components/CharacterCard/CharacterCard.js";

//console.log(newCharacterCard);

const cardContainer = document.querySelector('[data-js="card-container"]');
//cardContainer.append(newCharacterCard);

async function fetchCharacters() {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  const data = await response.json();
  let characterData = data.results;
  //console.log(characterData);
  cardContainer.innerHTML = "";
  characterData.forEach(character => {
    let newCharacterCard = createCharacterCard(character);
    cardContainer.append(newCharacterCard);
  });
  return data;
};

fetchCharacters();

const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
const maxPage = 1;
const page = 1;
const searchQuery = "";

