<script setup lang="ts">
import { ref, watch } from "vue";

defineProps<{
  btntext: string;
}>();
const dialog = ref<boolean>(false);
const date = new Date();
const selectedDate = ref<Date>(date);
const emit = defineEmits<{
  (e: "date-changed", date: Date): void;
}>();
watch(selectedDate, (newDate) => {
  emit("date-changed", newDate);
  dialog.value = false;
});
</script>
<template>
  <VDialog max-width="400" v-model="dialog">
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
    </VCard>
  </VDialog>
</template>
