import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import type { Items, CartItem } from "@/Productlist";
import { toast, type ToastOptions } from "vue3-toastify";

export const useCartStore = defineStore("cart", () => {
  // states
  const cartItems = ref<CartItem[]>([]);
  const date = new Date();
  const currentDate = ref<string>(date.toDateString());
  const currentCartItem = ref<CartItem[]>([]);
  const ItemsInCart = computed(() => currentCartItem.value.length);

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
    toast.success(`${item.title} added to cart`, {
      autoClose: 1500,
      type: "success",
      pauseOnFocusLoss: false,
      hideProgressBar: true,
      position: toast.POSITION.BOTTOM_RIGHT,
    } as ToastOptions);
  }

  const getCurrentCartItem = computed(() => {
    return cartItems.value.filter(
      (item) => item.orderDate === currentDate.value
    );
  });

  watch(getCurrentCartItem, (newValue) => {
    currentCartItem.value = newValue;
  });
  function incrementQuantity(item: CartItem) {
    const cartItem = cartItems.value.find((cartItem) => cartItem === item);
    if (cartItem) {
      cartItem.quantity++;
    }
  }

  // Function to decrement the quantity of an item in the cart
  function decrementQuantity(item: CartItem) {
    const cartItem = cartItems.value.find((cartItem) => cartItem === item);
    if (cartItem && cartItem.quantity > 1) {
      cartItem.quantity--;
    }
  }
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
      toast.success(`Item removed from cart`, {
        autoClose: 1500,
        type: "success",
        pauseOnFocusLoss: false,
        hideProgressBar: true,
        position: toast.POSITION.BOTTOM_RIGHT,
      } as ToastOptions);
    } else {
      toast.error(`Item not found in cart`, {
        autoClose: 1500,
        type: "error",
        pauseOnFocusLoss: false,
        hideProgressBar: true,
        position: toast.POSITION.BOTTOM_RIGHT,
      } as ToastOptions);
    }
  }

  // Function to clear the cart
  function clearCart() {
    cartItems.value = cartItems.value.filter(
      (item) => item.orderDate !== currentDate.value
    );
  }

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
