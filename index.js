const xElem = document.querySelector("#x");
const button = document.querySelector("#button");
const yElem = document.querySelector("#y");

const getFibAtIndex = (x) => {
  if (x < 2) return x;
  else return getFibAtIndex(x - 1) + getFibAtIndex(x - 2);
};

button.addEventListener("click", () => {
  yElem.innerText = getFibAtIndex(parseInt(xElem.value));
});
