const loading = document.querySelector(".loading");
const searchForm = document.getElementById("searchForm");
const output = document.querySelector(".output");
const search = document.getElementById("search");
const feedback = document.querySelector(".feedback");

const url = `https://www.mediawiki.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=`;

searchForm.addEventListener("submit", e => {
  e.preventDefault();

  const value = search.value;

  if (value.length === 0) {
    showFeedbcak("Please enter a valid value");
  } else {
    search.value === "";
    ajaxWiki(value);
  }
});

function showFeedbcak(text) {
  feedback.classList.add("showItem");
  feedback.textContent = text;
  setTimeout(() => {
    feedback.classList.remove("showItem");
  }, 3000);
}

function ajaxWiki(search) {
  loading.classList.add("showItem");
  const wikiURL = `${url}${search}`;
  fetch(wikiURL)
    .then(res => res.json())
    .then(data => showData(data))
    .catch(e => console.log(e));
}

function showData(data) {
  loading.classList.remove("showItem");
  const { search: results } = data.query;
  info = "";
  results.forEach(result => {
    const pageID = "http://en.wikipedia.org/?curid=";
    const { title, snippet, pageid: link } = result;
    info += `
      <div class="col-10 mx-auto col-md-6 col-lg-4 my-3">
        <div class="card card-body">
        <h1 class="card-title blueText">${title}</h1>
        <p>${snippet}</p>
        <a href="${pageID}${link}" target="_blank" class="my-2 text-capitalize">read
          more...</a>
        </div>
      </div>
    `;
  });
  output.innerHTML = info;
}
