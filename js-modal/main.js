var modal = document.getElementById("my-modal");
var modalBtn = document.getElementById("modal-btn");
var closeBtn = document.querySelector(".close");

modalBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
window.addEventListener("click", clickOutside);

function openModal() {
  modal.style.display = "block";
}
function closeModal() {}

function clickOutside(e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
}
