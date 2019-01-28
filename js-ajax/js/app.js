//get elements
const itemList = document.querySelector(".items");
const httpForm = document.getElementById("httpForm");
const itemInput = document.getElementById("itemInput");
const imageInput = document.getElementById("imageInput");
const feedback = document.querySelector(".feedback");
// const items = document.querySelector(".items");
const submtiBtn = document.getElementById("submitBtn");
let editedItemID = 0;

const url = "https://5c4ef6d8d87cab001476efe4.mockapi.io/api/v1/items";

httpForm.addEventListener("submit", submitItem);

function submitItem(e) {
  e.preventDefault();
  const itemValue = itemInput.value;
  const imageValue = imageInput.value;

  if (itemValue.length === 0 || imageValue.length === 0) {
    showFeedback("please enter valid values");
  } else {
    postItemApi(itemValue, imageValue);
    itemInput.value = "";
    imageInput.value = "";
  }
}

document.addEventListener("DOMContentLoaded", function() {
  getApi(showItems);
});

function showFeedback(text) {
  feedback.classList.add("showItem");
  feedback.textContent = text;
  setTimeout(() => {
    feedback.classList.remove("showItem");
  }, 3000);
}

function getApi(cb) {
  const url = "https://5c4ef6d8d87cab001476efe4.mockapi.io/api/v1/items";
  const ajax = new XMLHttpRequest();

  ajax.open("GET", url, true);
  ajax.onload = function() {
    if (this.status === 200) {
      cb(this.responseText);
    } else {
      console.log("something went wrong");
    }
  };

  ajax.onerror = function() {
    console.log("there was an error");
  };
  ajax.send();
}

function showItems(data) {
  const items = JSON.parse(data);
  let info = "";

  items.forEach(item => {
    info += `
    <li class="list-group-item d-flex align-items-center justify-content-between flex-wrap item my-2">
       <img src="${
         item.avatar
       }" id='itemImage' class='itemImage img-thumbnail' alt="">
       <h6 id="itemName" class="text-capitalize itemName">${item.name}</h6>
       <div class="icons">

        <a href='#' class="itemIcon mx-2 edit-icon" data-id=${item.id}>
         <i class="fas fa-edit"></i>
        </a>
        <a href='#' class="itemIcon mx-2 delete-icon" data-id=${item.id}>
         <i class="fas fa-trash"></i>
        </a>
       </div>
      </li>
    `;
    itemList.innerHTML = info;
    getIcons();
  });
}

function postItemApi(itemName, image) {
  const avatar = `img/${image}.jpeg`;
  const name = itemName;
  const url = "https://5c4ef6d8d87cab001476efe4.mockapi.io/api/v1/items";

  const ajax = new XMLHttpRequest();

  ajax.open("POST", url, true);
  ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  ajax.onload = function() {
    if (this.status === 201) {
      // console.log(this.responseText);
      getApi(showItems);
    } else {
      console.log("something went wrong");
    }
  };

  ajax.onerror = function() {
    console.log("there was an error");
  };
  ajax.send(`avatar=${avatar}&name=${name}`);
}

function getIcons() {
  const editIcon = document.querySelectorAll(".edit-icon");
  const deleteIcon = document.querySelectorAll(".delete-icon");

  deleteIcon.forEach(icon => {
    const itemID = icon.dataset.id;
    icon.addEventListener("click", e => {
      e.preventDefault();
      deleteItemApi(itemID);
    });
  });

  editIcon.forEach(icon => {
    const itemID = icon.dataset.id;
    icon.addEventListener("click", e => {
      e.preventDefault();
      const parent = e.target.parentElement.parentElement.parentElement;
      const image = parent.querySelector(".itemImage").src;
      const itemName = parent.querySelector(".itemName").textContent;

      editItemUI(parent, itemID, image, itemName);
    });
  });
}

function deleteItemApi(id) {
  const url = `https://5c4ef6d8d87cab001476efe4.mockapi.io/api/v1/items/${id}`;
  const ajax = new XMLHttpRequest();

  ajax.open("DELETE", url, true);
  ajax.onload = function() {
    if (this.status === 200) {
      console.log(this.responseText);
      getApi(showItems);
    } else {
      console.log("something went wrong");
    }
  };

  ajax.onerror = function() {
    console.log("there was an error");
  };
  ajax.send();
}

function editItemUI(parent, id, image, itemName) {
  itemList.removeChild(parent);
  const imgIndex = image.indexOf("img/");
  const jpegIndex = image.indexOf(".jpeg");
  const img = image.slice(imgIndex + 4, jpegIndex);

  itemInput.value = itemName.trim();
  imageInput.value = img;
  editedItemID = id;
  submtiBtn.innerHTML = "Edit item";
  httpForm.removeEventListener("submit", submitItem);
  httpForm.addEventListener("submit", editItem);
}

function editItem(e) {
  e.preventDefault();
  const id = editedItemID;
  const itemValue = itemInput.value;
  const imageValue = imageInput.value;

  if (itemValue.length === 0 || imageValue.length === 0) {
    showFeedback("please enter valid values");
  } else {
    editItemApi(id, itemValue, imageValue);
    itemInput.value = "";
    imageInput.value = "";
    submtiBtn.innerHTML = "Add item";
    httpForm.removeEventListener("submit", editItem);
    httpForm.addEventListener("submit", submitItem);
  }
}

function editItemApi(id, itemName, image) {
  const avatar = `img/${image}.jpeg`;
  const name = itemName;
  const url = `https://5c4ef6d8d87cab001476efe4.mockapi.io/api/v1/items/${id}`;
  const ajax = new XMLHttpRequest();
  ajax.open("PUT", url, true);
  ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  ajax.onload = function() {
    if (this.status === 200) {
      // console.log(this.responseText);
      getApi(showItems);
    } else {
      console.log("something went wrong");
    }
  };
  ajax.onerror = function() {
    console.log("there was an error");
  };
  ajax.send(`avatar=${avatar}&name=${name}`);
}
