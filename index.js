const xElem = document.querySelector("#x");
const button = document.querySelector("#button");
const yElem = document.querySelector("#y");
const spinner = document.querySelector("#spinner");
const lgError = document.querySelector("#ln-error");

const toggleLoad = () => {
  yElem.classList.toggle("d-none");
  spinner.classList.toggle("d-none");
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
    toggleLoad();
    const rs = await fetch(`http://localhost:5050/fibonacci/${xElem.value}`);
    if (!rs.ok) throw new Error(await rs.text());
    const { result } = await rs.json();
    toggleLoad();
    yElem.innerText = result;
  } catch (err) {
    yElem.innerHTML = `<span style="color:red;">Server Error: ${err.message}<span>`;
    toggleLoad();
  }
});
