export default function NavButton(name, className, onClick) {
  const button = document.createElement("button");
  button.textContent = name.toUpperCase();
  button.className = className;
  button.addEventListener("click", onClick);
  return button;
}
