const xElem = document.querySelector("#x");
const yElem = document.querySelector("#y");

const getFibAtIndex = (x) => {
  if (x < 0) return;
  const fib = [0, 1];
  if (!x) return 0;
  for (let i = 1; i < x; i++) {
    fib.push(fib[0] + fib[1]);
    fib.shift();
  }
  return fib[1];
};

xElem.innerHTML = `&nbsp${3}&nbsp`;
yElem.innerHTML = `&nbsp${getFibAtIndex(3)}&nbsp`;
