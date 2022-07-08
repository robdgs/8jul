const formEl = document.querySelector(".todo-form");
const inputEl = formEl.querySelector("input");
const listEl = document.querySelector(".task-list");
const SITE_URL = "https://openlibrary.org";
const BASE_API_URL = "https://openlibrary.org/search.json?q=";

formEl.addEventListener("submit", function (event) {
  event.preventDefault();

  const inputValue = inputEl.value;
  const searchFormatted = inputValue.replaceAll(" ", "+");
  const apiURL = `${BASE_API_URL}/${searchFormatted}`;

  console.log("sto chiamando:", apiURL);

  fetch(apiURL)
    .then((response) => {
      console.log({ response });
      const json = response.json();
      console.log({ json });
      return json;
    })

    .then((json) => {
      console.log(json);
      listEl.innerHTML = json.docs
        .map((doc) => {
          return `<li>${doc.title} </li>`;
        })
        .join("");
    })

    .catch((err) => {
      console.error(err);
      listEl.innerHTML = `<li>C'è stato un piccolo errore, riprovare!</li>`;
      return [];
    })
    .finally(console.log);
});
