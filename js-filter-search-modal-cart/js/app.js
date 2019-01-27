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

// cart
(function() {
  const cartInfo = document.getElementById("cart-info");
  const cart = document.getElementById("cart");
  cartInfo.addEventListener("click", () => {
    cart.classList.toggle("show-cart");
  });
})();

(function() {
  const cartBtn = document.querySelectorAll(".store-item-icon");
  cartBtn.forEach(btn => {
    btn.addEventListener("click", e => {
      if (e.target.parentElement.classList.contains("store-item-icon")) {
        let fullPath = e.target.parentElement.previousElementSibling.src;
        let pos = fullPath.indexOf("img") + 3;
        let partPath = fullPath.slice(pos);

        let name =
          e.target.parentElement.parentElement.nextElementSibling.children[0]
            .children[0].textContent;
        let price = e.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent
          .slice(1)
          .trim();

        const item = {};
        item.img = `img-cart/${partPath}`;
        item.name = name;
        item.price = price;
        console.log(item);
        const cartItem = document.createElement("div");
        cartItem.classList.add(
          "cart-item",
          "d-flex",
          "justify-content-between",
          "text-capitalize",
          "my-3"
        );
        cartItem.innerHTML = `<img src="${
          item.img
        }" class="img-fluid rounded-circle" id="item-img" alt="">
            <div class="item-text">

              <p id="cart-item-title" class="font-weight-bold mb-0">${
                item.name
              }</p>cart item</p>
              <p id="cart-item-price" class="mb-0">${item.price}</p>
            </div>
            <a href="#" id='cart-item-remove' class="cart-item-remove">
              <i class="fas fa-trash"></i>
            </a>
            </div>`;
        const cart = document.getElementById("cart");
        const total = document.querySelector(".cart-total-container");
        cart.insertBefore(cartItem, total);
        alert("item added");
        showTotals();
      }
    });
  });

  function showTotals() {
    const total = [];
    const items = document.querySelectorAll("#cart-item-price");
    items.forEach(item => {
      total.push(parseFloat(item.textContent));
    });
    const totalMoney = total.reduce((total, item) => {
      total += item;
      return total;
    }, 0);
    const finalMoney = totalMoney.toFixed(2);
    document.getElementById("cart-total").textContent = finalMoney;
    document.querySelector(".item-total").textContent = finalMoney;
    document.getElementById("item-count").textContent = total.length;
  }
})();
