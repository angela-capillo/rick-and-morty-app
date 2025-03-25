export default function NavPagination() {
  const pagination = document.createElement("span");
  pagination.textContent = "1/42";
  pagination.className = "navigation__pagination";
  return pagination;
}
