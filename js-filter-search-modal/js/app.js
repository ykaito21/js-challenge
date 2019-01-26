//filter
(function() {
  const filterBtn = document.querySelectorAll(".filter-btn");

  filterBtn.forEach(btn =>
    btn.addEventListener("click", e => {
      e.preventDefault();
      const value = e.target.dataset.filter;
      const items = document.querySelectorAll(".store-item");
      items.forEach(item => {
        if (value == "all") {
          item.style.display = "block";
        } else {
          if (item.classList.contains(value)) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        }
      });
    })
  );
})();
//search
(function() {
  const search = document.getElementById("search-item");
  search.addEventListener("keyup", e => {
    let value = search.value.toLowerCase().trim();
    items = document.querySelectorAll(".store-item");
    items.forEach(item => {
      let type = item.dataset.item;
      let length = value.length;
      let match = type.slice(0, length);
      if (value === match) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
})();

//modal
(function() {
  let imageList = [];
  let counter = 0;

  const images = document.querySelectorAll(".store-img");
  const container = document.querySelector(".lightbox-container");
  const item = document.querySelector(".lightbox-item");
  const closeIcon = document.querySelector(".lightbox-close");
  const btnLeft = document.querySelector(".btnLeft");
  const btnRight = document.querySelector(".btnRight");

  images.forEach(img => {
    imageList.push(img.src);
  });

  images.forEach(img =>
    img.addEventListener("click", e => {
      container.classList.add("show");
      let src = e.target.src;
      counter = imageList.indexOf(src);
      item.style.backgroundImage = `url(${src})`;
    })
  );

  closeIcon.addEventListener("click", () => {
    container.classList.remove("show");
  });

  window.addEventListener("click", e => {
    if (e.target == container) {
      container.classList.remove("show");
    }
  });

  btnLeft.addEventListener("click", () => {
    if (counter === 0) {
      counter = images.length;
    }
    counter--;
    item.style.backgroundImage = `url(${imageList[counter]})`;
  });

  btnRight.addEventListener("click", () => {
    if (counter === images.length) {
      counter = -1;
    }
    counter++;
    item.style.backgroundImage = `url(${imageList[counter]})`;
  });
})();
