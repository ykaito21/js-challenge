(function() {
  let customers = [];
  let index = 0;

  function Customer(name, img, text) {
    this.name = name;
    this.img = img;
    this.text = text;
  }
  function createCustomer(name, img, text) {
    let fullImg = `img/customer-${img}.jpg`;
    const customer = new Customer(name, fullImg, text);
    customers.push(customer);
  }

  createCustomer(
    "john",
    1,
    `Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, numquam. Velit, quae eaque quisquam doloribus, atque voluptas eligendi nobis molestias ducimus neque eos minima dolore adipisci maiores impedit dolor fuga.`
  );
  createCustomer(
    "bevis",
    2,
    `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae similique quasi magnam quibusdam soluta. Quod, vero unde quas dolore error maiores nobis odio laudantium excepturi facilis deleniti fugiat! Dolorem, asperiores.`
  );
  createCustomer(
    "tom",
    3,
    `Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam tenetur, dolor illum, provident exercitationem maxime amet delectus eligendi est aspernatur officiis autem nihil numquam mollitia fugit et placeat aliquid suscipit.`
  );
  createCustomer(
    "bob",
    4,
    `Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis quasi corrupti cum veniam cupiditate eligendi a consectetur doloremque earum fugiat nisi quisquam, laborum beatae hic, repellat autem doloribus excepturi aperiam.`
  );

  document.querySelectorAll(".btn").forEach(item => {
    item.addEventListener("click", e => {
      e.preventDefault;
      if (e.target.classList.contains("prevBtn")) {
        if (index === 0) {
          index = customers.length;
        }
        index--;
        document.getElementById("customer-img").src = customers[index].img;
        document.getElementById("customer-name").textContent =
          customers[index].name;
        document.getElementById("customer-text").textContent =
          customers[index].text;
      }
      if (e.target.classList.contains("nextBtn")) {
        if (index === customers.length - 1) {
          index = -1;
        }
        index++;
        document.getElementById("customer-img").src = customers[index].img;
        document.getElementById("customer-name").textContent =
          customers[index].name;
        document.getElementById("customer-text").textContent =
          customers[index].text;
      }
    });
  });
})();
