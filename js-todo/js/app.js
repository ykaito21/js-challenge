const itemForm = document.getElementById("itemForm");
const itemInput = document.getElementById("itemInput");
const itemList = document.querySelector(".item-list");
const clearBtn = document.getElementById("clear-list");
const feedback = document.querySelector(".feedback");

let itemData = JSON.parse(localStorage.getItem("list")) || [];

if (itemData.length > 0) {
  console.log(itemData);
  itemData.forEach(item => {
    addItem(item);
    handleItem(item);
  });
}

itemForm.addEventListener("submit", e => {
  e.preventDefault();
  const textValue = itemInput.value;

  if (textValue == "") {
    showFeedback("please enter valid value", "danger");
  } else {
    addItem(textValue);
    showFeedback("Added", "success");
    itemInput.value = "";
    itemData.push(textValue);
    localStorage.setItem("list", JSON.stringify(itemData));
    handleItem(textValue);
  }
});

function showFeedback(text, action) {
  feedback.classList.add("showItem", `alert-${action}`);
  feedback.innerHTML = `<p>${text}</p>`;
  setTimeout(() => {
    feedback.classList.remove("showItem", `alert-${action}`);
  }, 3000);
}

function addItem(value) {
  const div = document.createElement("div");
  div.classList.add("item", "my-3");
  div.innerHTML = `
      <h5 class="item-name text-capitalize">${value}</h5>
      <div class="item-icons">
       <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
       <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
       <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
      </div>`;
  itemList.appendChild(div);
  itemInput.value = "";
}

function handleItem(textValue) {
  const items = itemList.querySelectorAll(".item");
  items.forEach(item => {
    if (item.querySelector(".item-name").textContent === textValue) {
      item
        .querySelector(".complete-item")
        .addEventListener("click", function() {
          item.querySelector(".item-name").classList.toggle("completed");
          this.classList.toggle("visibility");
        });
      item.querySelector(".edit-item").addEventListener("click", function() {
        itemInput.value = textValue;
        itemList.removeChild(item);
        itemData = itemData.filter(function(item) {
          return item !== textValue;
        });
        localStorage.setItem("list", JSON.stringify(itemData));
      });
      item.querySelector(".delete-item").addEventListener("click", function() {
        itemList.removeChild(item);

        itemData = itemData.filter(function(item) {
          return item !== textValue;
        });
        localStorage.setItem("list", JSON.stringify(itemData));
        showFeedback("Removed", "success");
      });
    }
  });
}

clearBtn.addEventListener("click", () => {
  itemData = [];
  localStorage.removeItem("list");

  const items = itemList.querySelectorAll(".item");
  if (items.length > 0) {
    items.forEach(item => itemList.removeChild(item));
  }
});
