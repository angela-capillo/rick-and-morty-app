export default function SearchBar(onSubmit) {
  const form = document.createElement("form");
  form.action = "";
  form.className = "search-bar";

  const input = document.createElement("input");
  input.name = "query";
  input.className = "search-bar__input";
  input.type = "text";
  input.placeholder = "search characters";
  input.ariaLabel = "character name";

  const image = document.createElement("img");
  image.className = "search-bar__icon";
  image.src = "assets/magnifying-glass.png";
  image.alt = "";

  const button = document.createElement("button");
  button.className = "search-bar__button";
  button.ariaLabel = "search for character";
  button.append(image);

  form.append(input, button);
  form.addEventListener("submit", onSubmit);
  return form;
};