document.addEventListener("DOMContentLoaded", function () {
  class Product {
    constructor(id, name, price, imgUrl) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.imgUrl = imgUrl;
    }
  }

  class ShoppingCartItem {
    constructor(product, quantity) {
      this.product = product;
      this.quantity = quantity;
    }

    getTotalPrice() {
      return this.product.price * this.quantity;
    }
  }

  class ShoppingCart {
    constructor() {
      this.items = [];
    }

    addItem(product, quantity = 1) {
      const existingItem = this.items.find(item => item.product.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push(new ShoppingCartItem(product, quantity));
      }
      this.renderCart();
    }

    removeItem(itemId) {
      this.items = this.items.filter(item => item.product.id !== itemId);
      this.renderCart();
    }

    updateQuantity(itemId, change) {
      const item = this.items.find(item => item.product.id === itemId);
      if (item) {
        item.quantity += change;
        if (item.quantity < 1) {
          this.removeItem(itemId);
        }
        this.renderCart();
      }
    }

    getTotal() {
      return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }

    renderCart() {
      const cardContainer = document.querySelector(".cart");
      cardContainer.innerHTML = "";
      this.items.forEach(item => {
        const itemElement = this.createItemElement(item);
        cardContainer.appendChild(itemElement);
      });
      document.querySelector(".totalAmount").textContent = `XOF ${this.getTotal()}`;
    }

    createItemElement(cartItem) {
      const itemElement = document.createElement("div");
      itemElement.classList.add("item");
      itemElement.innerHTML = `
        <img src="${cartItem.product.imgUrl}" alt="${cartItem.product.name}" />
        <div class="details">
          <h3>${cartItem.product.name}</h3>
          <p>Prix: XOF ${cartItem.product.price}</p>
        </div>
        <div class="actions">
          <button class="like-btn"><span class="material-symbols-outlined"> favorite </span></button>
          <button class="remove-btn" data-id="${cartItem.product.id}"><span class="material-symbols-outlined"> delete_forever </span></button>
          <div class="quantity">
            <button class="decrement-btn" data-id="${cartItem.product.id}"><span class="material-symbols-outlined"> remove </span></button>
            <span class="quantity-value">${cartItem.quantity}</span>
            <button class="increment-btn" data-id="${cartItem.product.id}"><span class="material-symbols-outlined"> add </span></button>
          </div>
        </div>
      `;

      itemElement.querySelector(".remove-btn").addEventListener("click", () => {
        this.removeItem(cartItem.product.id);
      });

      itemElement.querySelector(".decrement-btn").addEventListener("click", () => {
        this.updateQuantity(cartItem.product.id, -1);
      });

      itemElement.querySelector(".increment-btn").addEventListener("click", () => {
        this.updateQuantity(cartItem.product.id, 1);
      });

      return itemElement;
    }
  }

  const cart = new ShoppingCart();

  const products = [
    new Product(1, "BT-103 Casque Bluetooth Sportif", 5130, "https://ci.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/34/471002/1.jpg?4137"),
    new Product(2, "Chargeur Macbook Pro 61W / Type-C", 45000, "https://ci.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/40/894991/1.jpg?8963"),
    new Product(3, "Ola Tablet PC - Dual SIM - 4Go + 256Go", 150000, "https://ci.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/50/330972/1.jpg?1734"),
  ];

  products.forEach(product => cart.addItem(product, product.id === 1 ? 5 : 2));
  cart.renderCart();
});
