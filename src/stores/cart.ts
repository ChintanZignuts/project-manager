import { defineStore } from "pinia";
import { ref } from "vue";
import type { Items, CartItem } from "@/Productlist";
export const useCartStore = defineStore("cart", () => {
  //states
  const cartItems = ref<CartItem[]>([]);
  const ItemsInCart = ref<number>(0);
  const date = new Date();
  const currentDate = ref<string>(date.toDateString());
  function addToCart(item: Items) {
    const existingItem = cartItems.value.find(
      (cartItem) => cartItem.Item.id === item.id
    );

    if (existingItem) {
      // If item already exists, update its quantity
      existingItem.quantity++;
    } else {
      // If item does not exist, add it to the cart with quantity 1
      const newItem = {
        orderDate: currentDate.value,
        Item: item,
        quantity: 1,
      };
      cartItems.value.push(newItem);
    }
  }

  function removeFromCart(id: number) {}

  function clearCart() {
    cartItems.value = [];
  }

  return {
    cartItems,
    ItemsInCart,
    currentDate,
    addToCart,
    removeFromCart,
    clearCart,
  };
});
