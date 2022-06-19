const xElem = document.querySelector("#x");
const button = document.querySelector("#button");
const yElem = document.querySelector("#y");

button.addEventListener("click", async () => {
  const rs = await fetch(`http://localhost:5050/fibonacci/${xElem.value}`);
  const { result } = await rs.json();
  yElem.innerText = result;
});
