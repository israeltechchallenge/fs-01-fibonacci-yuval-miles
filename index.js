const xElem = document.querySelector("#x");
const button = document.querySelector("#button");
const yElem = document.querySelector("#y");

const getFibAtIndex = (x) => {
  const fib = [0, 1];
  if (!x) return 0;
  for (let i = 1; i < x; i++) {
    fib.push(fib[0] + fib[1]);
    fib.shift();
  }
  return fib[1];
};

button.addEventListener("click", () => {
  yElem.innerText = getFibAtIndex(parseInt(xElem.value));
});
