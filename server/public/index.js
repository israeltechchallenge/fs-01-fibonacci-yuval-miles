const xElem = document.querySelector("#x");
const button = document.querySelector("#button");
const yElem = document.querySelector("#y");
const spinner = document.querySelector("#spinner");
const lgError = document.querySelector("#ln-error");
const rSpinner = document.querySelector("#r-spinner");
const resultsElm = document.querySelector("#results");
const checkbox = document.querySelector("#checkbox");
const sort = document.querySelector("#sort");

let resArr = [];

const getFibAtIndex = (x, hashmap) => {
  hashmap = hashmap || {};
  if (hashmap.hasOwnProperty(x)) return hashmap[x];
  if (x > 50) {
    toggleLargeNumError();
    return;
  }
  if (x < 2) return x;
  else
    return (hashmap[x] =
      getFibAtIndex(x - 1, hashmap) + getFibAtIndex(x - 2, hashmap));
};

const updateResElm = (arr) => {
  switch (sort.value) {
    case "Sort By":
      break;
    case "1":
      arr.sort((a, b) => a.number - b.number);
      break;
    case "2":
      arr.sort((a, b) => b.number - a.number);
      break;
    case "3":
      arr.sort((a, b) => a.createdDate - b.createdDate);
      break;
    case "4":
      arr.sort((a, b) => b.createdDate - a.createdDate);
      break;
  }
  const formattedArr = arr.map(
    (el) =>
      `<div class="border-bottom border-1 py-1 border-dark">The Fibonacci of <b>${
        el.number
      }</b> is <b>${el.result}</b>. Calculated at: ${new Date(
        el.createdDate
      )}</div>`
  );
  resultsElm.innerHTML = "";
  for (el of formattedArr) resultsElm.innerHTML += el;
};

const getPrevFib = async () => {
  try {
    toggleLoad({ cal: true });
    const rs = await fetch(`http://localhost:5050/getFibonacciResults`);
    if (!rs.ok) throw new Error(await rs.text());
    const { results } = await rs.json();
    resArr = results;
    updateResElm(resArr);
    toggleLoad({ cal: true });
  } catch (err) {
    console.log(err);
    toggleLoad({ cal: true });
  }
};

const toggleLoad = ({ cal, res }) => {
  switch (true) {
    case res:
      yElem.classList.toggle("d-none");
      spinner.classList.toggle("d-none");
      break;
    case cal:
      results.classList.toggle("d-none");
      rSpinner.classList.toggle("d-none");
      break;
    default:
      throw new Error("ToggleLoad flag undefined");
  }
};

const toggleLargeNumError = async () => {
  lgError.classList.toggle("d-none");
  setTimeout(() => {
    lgError.classList.toggle("d-none");
  }, 3000);
};

button.addEventListener("click", async () => {
  if (xElem.value > 50) return toggleLargeNumError();
  try {
    if (checkbox.checked) {
      toggleLoad({ res: true });
      const rs = await fetch(`http://localhost:5050/fibonacci/${xElem.value}`);
      if (!rs.ok) throw new Error(await rs.text());
      const { result } = await rs.json();
      toggleLoad({ res: true });
      yElem.innerText = result;
      getPrevFib();
    } else {
      yElem.innerText = getFibAtIndex(xElem.value);
    }
  } catch (err) {
    yElem.innerHTML = `<span style="color:red;">Server Error: ${err.message}<span>`;
    toggleLoad({ res: true });
  }
});

sort.addEventListener("change", async () => {
  updateResElm(resArr);
});

//Helper function for testing
const clearDB = async () => {
  try {
    await fetch(`http://localhost:5050/clearDB`);
  } catch (err) {
    console.log(err);
  }
};
//clearDB();

getPrevFib();
