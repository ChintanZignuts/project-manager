<script setup lang="ts">
import { useCartStore } from "@/stores/cart";
const cartStore = useCartStore();
</script>
<template>
  <h1>hello{{ cartStore.cartItems }}</h1>
</template>
