<script setup lang="ts">
import { ref, watch } from "vue";

defineProps<{
  btntext: string;
}>();
const dialog = ref<boolean>(false);
const date = new Date();
const selectedDate = ref<Date>(date);
watch(selectedDate, (newSelecteddate) => {
  console.log(newSelecteddate);
  dialog.value = false;
});
</script>
<template>
  <VDialog max-width="500" v-model="dialog">
    <template v-slot:activator="{ props: activatorProps }">
      <VBtn
        v-bind="activatorProps"
        color="surface-variant"
        :text="btntext"
        variant="flat"
      ></VBtn>
    </template>

    <VCard>
      <VContainer>
        <VRow justify="space-around">
          <VDatePicker v-model="selectedDate"></VDatePicker>
        </VRow>
      </VContainer>
      <v-btn text="Close Dialog" @click="isActive.value = false"></v-btn>
    </VCard>
  </VDialog>
</template>
