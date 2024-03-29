<script setup lang="ts">
//imports
import { useCartStore } from "@/stores/cart";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { toast, type ToastOptions } from "vue3-toastify";

//variable
const cartStore = useCartStore();
const tab = ref<string | null>(null);
const router = useRouter();
const headers = ref<Array<any>>([
  {
    title: "Product",
    align: "start",
    key: "product",
    width: "30%",
    sortable: false,
  },
  { title: "Price", align: "end", key: "Item.price", sortable: false },
  { title: "Quantity", align: "center", key: "quantity", sortable: false },
  { title: "Total", align: "end", key: "total", sortable: false },
  { title: "", align: "center", key: "delete", sortable: false },
]);
const items = [
  {
    title: "Dashboard",
    disabled: true,
  },
  {
    title: "Cart",
    disabled: true,
  },
];
const AddressData = ref({
  name: "",
  buildingNo: "",
  street: "",
  city: "",
  areaCode: "",
  contact: "",
});

//validation rules for
const validationRules = {
  nameRules: [(v: string) => !!v || "Name is required"],
  buildingNoRules: [(v: string) => !!v || "Building No is required"],
  cityRules: [(v: string) => !!v || "City is required"],
  areaCodeRules: [(v: number) => !!v || "Area code is required"],
  contactRules: [
    (v: string) =>
      (v && v.length <= 10) || "Contact must be 10 characters or less",
  ],
};

//functions
const handlePlaceOrder = () => {
  cartStore.clearCart();
  toast.success(`Order placed successfully`, {
    autoClose: 1500,
    type: "success",
    pauseOnFocusLoss: false,
    hideProgressBar: true,
    position: toast.POSITION.BOTTOM_RIGHT,
  } as ToastOptions);
  AddressData.value = {
    name: "",
    buildingNo: "",
    street: "",
    city: "",
    areaCode: "",
    contact: "",
  };
};
const routeToMarketplace = () => {
  router.push("/marketplace");
};
</script>
<template>
  <!-- main container -->
  <vContainer class="pb-sm-15 pb-10 h-100 overflow-y-auto" fluid>
    <div>
      <!-- hading -->
      <div class="mt-3 mb-6">
        <div class="d-flex justify-space-between">
          <div class="d-flex py-0 align-center">
            <div>
              <h3 class="text-h5 mb-2">Checkout</h3>
              <v-breadcrumbs :items="items" class="pa-0 ml-n1">
                <template v-slot:divider>
                  <v-icon icon="mdi-chevron-right"></v-icon>
                </template>
              </v-breadcrumbs>
            </div>
          </div>
        </div>
      </div>
      <!-- main card  -->
      <VCard variant="outlined" class="bg-surface border">
        <VCardText>
          <!-- tab heading -->
          <VTabs v-model="tab" color="primary" height="68px" class="rounded-lg">
            <VTab value="one" height="70px" class="rounded-lg">
              <VIcon>mdi-cart-variant</VIcon>
              <div>
                <div class="ma-0 pa-0"><Span>Item Cart</Span></div>
                <span
                  class="text-subtitle-2 text-lightText text-medium-emphasis font-weight-medium d-block ml-5"
                >
                  Product Summary
                </span>
              </div>
            </VTab>
            <v-tab
              value="two"
              height="70px"
              class="rounded-lg"
              :disabled="cartStore.currentCartItem.length === 0"
            >
              <VIcon>mdi-note-text-outline</VIcon>
              <div>
                <div class="ma-0 pa-0"><Span>Billing</Span></div>
                <span
                  class="text-subtitle-2 text-lightText text-medium-emphasis font-weight-medium d-block ml-5"
                >
                  Billing Information
                </span>
              </div>
            </v-tab>
          </VTabs>

          <v-card-text>
            <v-window v-model="tab">
              <v-window-item value="one">
                <div>
                  <h3 class="my-4">
                    Cart Item of {{ cartStore.currentDate }}({{
                      cartStore.ItemsInCart
                    }})
                  </h3>
                  <VDivider />
                  <v-data-table-virtual
                    :headers="headers"
                    :items="cartStore.currentCartItem"
                    item-key="id"
                    class="text-subtitle-1 font-weight-bold"
                  >
                    <template v-slot:item.product="{ item }">
                      <div class="d-flex align-center">
                        <v-avatar size="70" class="ma-5 rounded-lg">
                          <v-img
                            :src="item.Item.images[0]"
                            alt="Product Image"
                            cover
                          />
                        </v-avatar>
                        <p>{{ item.Item.title }}</p>
                      </div>
                    </template>
                    <template v-slot:item.Item.price="{ item }">
                      ${{ item.Item.price }}
                    </template>
                    <template v-slot:item.quantity="{ item }">
                      <v-btn-toggle width="100px">
                        <v-btn
                          @click="cartStore.decrementQuantity(item)"
                          class="border"
                        >
                          <VIcon>mdi-minus</VIcon>
                        </v-btn>
                        <v-btn class="border">{{ item.quantity }}</v-btn>
                        <!-- Display current value -->
                        <v-btn
                          @click="cartStore.incrementQuantity(item)"
                          class="border"
                        >
                          <!-- Plus Button -->
                          <VIcon>mdi-plus</VIcon>
                        </v-btn>
                      </v-btn-toggle>
                    </template>
                    <template v-slot:item.total="{ item }">
                      ${{ item.quantity * item.Item.price }}
                    </template>
                    <template v-slot:item.delete="{ item }">
                      <v-btn
                        icon="mdi-trash-can-outline"
                        class="elevation-0 text-orange-darken-1"
                        @click="cartStore.removeFromCart(item.Item.id)"
                      ></v-btn>
                    </template>
                  </v-data-table-virtual>
                </div>
                <VCard class="elevation-0 border rounded-lg">
                  <VCardTitle>
                    <h5 class="text-h5 mb-6">Order Summery</h5>
                  </VCardTitle>
                  <VCardText>
                    <div class="d-flex align-center justify-space-between my-5">
                      <h6 class="text-subtitle-1 font-weight-regular">
                        Sub Total
                      </h6>
                      <h6 class="font-weight-semibold text-subtitle-1">
                        $ {{ cartStore.subtotal }}
                      </h6>
                    </div>
                    <div class="d-flex align-center justify-space-between my-5">
                      <h6 class="text-subtitle-1 font-weight-regular">
                        Discount 5%
                      </h6>
                      <h6
                        class="font-weight-semibold text-subtitle-1 text-error"
                      >
                        - {{ (cartStore.subtotal / 100) * 5 }}
                      </h6>
                    </div>
                    <div class="d-flex align-center justify-space-between my-5">
                      <h6 class="text-subtitle-1 font-weight-regular">
                        Shipping Charges
                      </h6>
                      <h6 class="font-weight-semibold text-subtitle-1">-</h6>
                    </div>
                    <div class="d-flex align-center justify-space-between my-5">
                      <h6 class="text-subtitle-1">Total</h6>
                      <h6 class="font-weight-semibold text-subtitle-1">
                        $
                        {{
                          cartStore.subtotal - (cartStore.subtotal / 100) * 5
                        }}
                      </h6>
                    </div>
                  </VCardText>
                </VCard>
                <VRow class="mt-3">
                  <VCol cols="12" sm="6">
                    <VBtn variant="tonal" @click.stop="routeToMarketplace">
                      Continue Shopping
                    </VBtn>
                  </VCol>
                  <VCol class="text-sm-right" cols="12" sm="6">
                    <VBtn
                      class="bg-orange-accent-2 text-white"
                      @click.stop="tab = 'two'"
                    >
                      CheckOut
                    </VBtn>
                  </VCol>
                </VRow>
              </v-window-item>

              <v-window-item value="two">
                <!-- //address form  -->
                <VRow>
                  <VCol cols="12" lg="6" class="mt-4">
                    <h4 class="text-h5 mb-5">Billing Address</h4>
                    <form @submit.prevent="handlePlaceOrder">
                      <VTextField
                        v-model="AddressData.name"
                        variant="outlined"
                        label="Name"
                        placeholder="First Name"
                        :rules="validationRules.nameRules"
                        required
                      />
                      <VTextField
                        v-model="AddressData.buildingNo"
                        variant="outlined"
                        label="Building No"
                        placeholder="Building No"
                        :rules="validationRules.buildingNoRules"
                        required
                      />
                      <VTextField
                        v-model="AddressData.street"
                        variant="outlined"
                        label="Street"
                        placeholder="Street"
                      />

                      <VTextField
                        v-model="AddressData.city"
                        variant="outlined"
                        label="City"
                        :rules="validationRules.cityRules"
                        placeholder="City"
                        required
                      />
                      <VRow>
                        <VCol cols="12" md="6" class="ma-sm-0">
                          <VTextField
                            v-model="AddressData.areaCode"
                            variant="outlined"
                            label="Area code"
                            placeholder="Area code"
                            :rules="validationRules.areaCodeRules"
                            type="number"
                            required
                          />
                        </VCol>
                        <VCol cols="12" md="6">
                          <VTextField
                            v-model="AddressData.contact"
                            variant="outlined"
                            label="Contact"
                            :rules="validationRules.contactRules"
                            placeholder="Contact"
                            type="tel"
                          />
                        </VCol>
                      </VRow>
                      <VRow>
                        <VCol cols="12" md="6">
                          <VBtn
                            class="w-100 text-none text-orange-accent-3 elevation-0"
                            @click.stop="tab = 'one'"
                          >
                            Back
                          </VBtn>
                        </VCol>
                        <VCol cols="12" md="6">
                          <VBtn
                            type="submit"
                            class="w-100 text-none text-white bg-orange-accent-2 elevation-0"
                          >
                            Place Order
                          </VBtn>
                        </VCol>
                      </VRow>
                    </form>
                  </VCol>
                  <VCol cols="12" lg="6">
                    <VCard class="elevation-0 border rounded-lg">
                      <VCardTitle>
                        <h5 class="text-h5 mb-6">Order Summery</h5>
                      </VCardTitle>
                      <VCardText>
                        <div
                          class="d-flex align-center justify-space-between my-5"
                        >
                          <h6 class="text-subtitle-1 font-weight-regular">
                            Sub Total
                          </h6>
                          <h6 class="font-weight-bold text-subtitle-1">
                            $ {{ cartStore.subtotal }}
                          </h6>
                        </div>
                        <div
                          class="d-flex align-center justify-space-between my-5"
                        >
                          <h6 class="text-subtitle-1 font-weight-regular">
                            Discount 5%
                          </h6>
                          <h6
                            class="font-weight-bold text-subtitle-1 text-error"
                          >
                            - {{ (cartStore.subtotal / 100) * 5 }}
                          </h6>
                        </div>
                        <div
                          class="d-flex align-center justify-space-between my-5"
                        >
                          <h6 class="text-subtitle-1 font-weight-regular">
                            Shipping Charges
                          </h6>
                          <h6 class="font-weight-bold text-subtitle-1">-</h6>
                        </div>
                        <div
                          class="d-flex align-center justify-space-between my-5"
                        >
                          <h6 class="text-subtitle-1">Total</h6>
                          <h6 class="font-weight-bold text-subtitle-1">
                            $
                            {{
                              cartStore.subtotal -
                              (cartStore.subtotal / 100) * 5
                            }}
                          </h6>
                        </div>
                      </VCardText>
                    </VCard>
                  </VCol>
                </VRow>
              </v-window-item>
            </v-window>
          </v-card-text>
        </VCardText>
      </VCard>
    </div>
  </vContainer>
</template>
<!-- <style scoped>
.tabs {
  color: orangered; /* Change this to your desired text color */
  text-transform: none;
  text-transform: unset !important;
}
</style> -->
