import reddit from "./redditapi";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

searchForm.addEventListener("submit", e => {
  e.preventDefault();
  const searchTerm = searchInput.value;
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  const limit = document.getElementById("limit").value;

  if (searchTerm == "") {
    showMessage("Please add search term", "alert-danger");
  }

  searchInput.value = "";

  reddit.search(searchTerm, limit, sortBy).then(results => {
    let output = '<div class="card-columns">';
    results.forEach(post => {
      let image = post.preview
        ? post.preview.images[0].source.url
        : "https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg";
      output += `
      <div class="card mb-2">
      <img class="card-img-top" src="${image}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${post.title}</h5>
        <p class="card-text">${truncateString(post.selftext, 100)}</p>
        <a href="${post.url}" target="_blank
        " class="btn btn-primary">Read More</a>
        <hr>
        <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
        <span class="badge badge-dark">Score: ${post.score}</span>
      </div>
    </div>`;
    });
    output += "</div>";
    document.getElementById("results").innerHTML = output;
  });
});

function showMessage(message, className) {
  const div = document.createElement("div");
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));
  const searchContainer = document.getElementById("search-container");
  const search = document.getElementById("search");
  searchContainer.insertBefore(div, search);
  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 3000);
}

function truncateString(text, limit) {
  const shortened = text.indexOf(" ", limit);
  if (shortened == -1) return text;
  return text.substring(0, shortened);
}
