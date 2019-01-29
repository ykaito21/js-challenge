class GITHUB {
  constructor() {
    this.client_id = "646a5fa32ac55eaf08b6";
    this.client_secret = "5fd5261608863109a03cbf5cecbdba21a81a93ef";
    this.base = "https://api.github.com/users/";
  }
  async ajaxUser(userValue) {
    const userURL = `${this.base}${userValue}?client_id=${
      this.client_id
    }&client_secret=${this.client_secret}`;

    const reposURL = `${this.base}${userValue}/repos?client_id=${
      this.client_id
    }&client_secret=${this.client_secret}`;

    const userData = await fetch(userURL);
    const user = await userData.json();

    const reposData = await fetch(reposURL);
    const repos = await reposData.json();

    return {
      user,
      repos
    };
  }
}

class UI {
  constructor() {}

  showFeedbcak(text) {
    const feedback = document.querySelector(".feedback");

    feedback.classList.add("showItem");
    feedback.textContent = text;
    setTimeout(() => {
      feedback.classList.remove("showItem");
    }, 3000);
  }
  getUser(user) {
    const {
      avatar_url: image,
      html_url: link,
      public_repos: repos,
      name,
      login,
      message
    } = user;
    if (message === "Not Found") {
      this.showFeedbcak("Please make sure username");
    } else {
      // this.displayUser(image, link, repos, name, login, message);
      this.displayUser(image, link, repos, name, login);
    }
  }
  displayUser(image, link, repos, name, login) {
    const usersList = document.getElementById("github-users");
    const div = document.createElement("div");
    div.classList.add("row", "single-user", "my-3");
    div.innerHTML = `
    <div class=" col-sm-6 col-md-4 user-photo my-2">
       <img src="${image}" class="img-fluid" alt="">
      </div>
      <div class="col-sm-6 col-md-4 user-info text-capitalize my-2">
       <h6>name : <span>${name}</span></h6>
       <h6>github : <a href="${link}" class="badge badge-primary">link</a> </h6>
       <h6>public repos : <span class="badge badge-success">${repos}</span> </h6>
      </div>
      <div class=" col-sm-6 col-md-4 user-repos my-2">
       <button type="button" data-id="${login}" id="getRepos" class="btn reposBtn text-capitalize mt-3">
        get repos
       </button>
      </div>
    `;
    usersList.appendChild(div);
  }

  displayRepos(userID, repos) {
    const reposBtn = document.querySelectorAll("[data-id]");
    reposBtn.forEach(btn => {
      if (btn.dataset.id === userID) {
        const parent = btn.parentNode;
        repos.forEach(repo => {
          const p = document.createElement("p");
          p.innerHTML = `
          <a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
          parent.appendChild(p);
        });
      }
    });
  }
}

(function() {
  const ui = new UI();
  const github = new GITHUB();

  const searchForm = document.getElementById("searchForm");
  const searchUser = document.getElementById("searchUser");
  const userList = document.getElementById("github-users");

  searchForm.addEventListener("submit", e => {
    e.preventDefault();
    const textValue = searchUser.value;
    if (textValue.length === 0) {
      ui.showFeedbcak("Please enter a valid username");
    } else {
      searchUser.value = "";
      github
        .ajaxUser(textValue)
        .then(data => ui.getUser(data.user))
        .catch(error => console.log(error));
    }
  });

  userList.addEventListener("click", e => {
    e.preventDefault();
    if (e.target.classList.contains("reposBtn")) {
      const userID = e.target.dataset.id;
      github
        .ajaxUser(userID)
        .then(data => ui.displayRepos(userID, data.repos))
        .catch(error => console.log(error));
    }
  });
})();
