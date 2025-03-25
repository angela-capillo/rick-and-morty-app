function NavButton(name, className, onClick,) {
    const button = document.createElement("button");
    button.textContent = name;
    button.className = className;
    button.addEventListener("click", onClick);
    return button;
  };

export default NavButton;