import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import type { Items, CartItem } from "@/Productlist";
import { toast, type ToastOptions } from "vue3-toastify";

//store for cart
export const useCartStore = defineStore("cart", () => {
  // states
  const cartItems = ref<CartItem[]>(loadCartItemsFromLocalStorage());
  const date = new Date();
  const currentDate = ref<string>(
    localStorage.getItem("currentDate") || new Date().toDateString()
  );
  const currentCartItem = ref<CartItem[]>([]);
  const ItemsInCart = computed(() => currentCartItem.value.length);

  // Function to add item to cart
  function addToCart(item: Items) {
    const existingItem = cartItems.value.find(
      (cartItem) =>
        cartItem.Item.id === item.id && cartItem.orderDate === currentDate.value
    );
    if (existingItem) {
      existingItem.quantity++;
    } else {
      const newItem = {
        orderDate: currentDate.value,
        Item: item,
        quantity: 1,
      };
      cartItems.value.push(newItem);
    }
    updateCartItemsInLocalStorage();
    localStorage.setItem("currentDate", currentDate.value);
    toast.success(`${item.title} added to cart`, toastOptions);
  }

  // Function to get the current cart items
  const getCurrentCartItem = computed(() => {
    return cartItems.value.filter(
      (item) => item.orderDate === currentDate.value
    );
  });
  watch(getCurrentCartItem, (newValue) => {
    currentCartItem.value = newValue;
  });

  // Function to increment the quantity of an item in the cart
  function incrementQuantity(item: CartItem) {
    const cartItem = cartItems.value.find((cartItem) => cartItem === item);
    if (cartItem) {
      cartItem.quantity++;
      updateCartItemsInLocalStorage();
    }
  }

  // Function to decrement the quantity of an item in the cart
  function decrementQuantity(item: CartItem) {
    const cartItem = cartItems.value.find((cartItem) => cartItem === item);
    if (cartItem && cartItem.quantity > 1) {
      cartItem.quantity--;
      updateCartItemsInLocalStorage();
    }
  }

  // Function to calculate the subtotal of the cart
  const subtotal = computed(() => {
    let subtotal = 0;
    currentCartItem.value.forEach((item) => {
      subtotal += item.quantity * item.Item.price;
    });
    return subtotal;
  });

  // Function to remove item from cart
  function removeFromCart(id: number) {
    const index = cartItems.value.findIndex(
      (item) => item.Item.id === id && item.orderDate === currentDate.value
    );
    if (index !== -1) {
      cartItems.value.splice(index, 1);
      updateCartItemsInLocalStorage();
      toast.success(`Item removed from cart`, toastOptions);
    } else {
      toast.error(`Item not found in cart`, toastOptions);
    }
  }

  // Function to clear the cart
  function clearCart() {
    cartItems.value = cartItems.value.filter(
      (item) => item.orderDate !== currentDate.value
    );
    updateCartItemsInLocalStorage();
  }

  // Function to update cart items in local storage
  function updateCartItemsInLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cartItems.value));
  }

  // Function to load cart items from local storage
  function loadCartItemsFromLocalStorage(): CartItem[] {
    const storedItems = localStorage.getItem("cart");
    return storedItems ? JSON.parse(storedItems) : [];
  }
  const toastOptions: ToastOptions = {
    autoClose: 1500,
    type: "success",
    pauseOnFocusLoss: false,
    hideProgressBar: true,
    position: toast.POSITION.BOTTOM_RIGHT,
  };
  return {
    cartItems,
    ItemsInCart,
    currentDate,
    currentCartItem: getCurrentCartItem,
    addToCart,
    removeFromCart,
    clearCart,
    incrementQuantity,
    decrementQuantity,
    subtotal,
  };
});
