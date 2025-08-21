<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
    <Card
      v-for="(photo, index) in dataobjs?.message"
      :key="photo"
      :src="photo"
      :index="index"
      :is-loading="loading[index]"
      @loaded="handleLoad"
      @delete="deleteImage"
    />
  </div>
</template>

<script setup>
import Card from "~/components/card.vue";

const imgs = ref([]);
const loading = ref([]);

const { data: dataobjs } = await useAsyncData("photos", () =>
  $fetch("https://dog.ceo/api/breeds/image/random/50")
);

const handleLoad = (index) => {
  loading.value[index] = false;
};

const deleteImage = (index) => {
  console.log("Image deleted llegue:", index);
  dataobjs.value.message.splice(index, 1);
  loading.value.splice(index, 1);
};

watch(
  () => dataobjs.value?.message,
  (newVal) => {
    if (newVal) {
      loading.value = newVal.map(() => true);
    }
  },
  { immediate: true }
);

onMounted(() => {
  imgs.value.forEach((img, i) => {
    if (img.complete) handleLoad(i);
  });
});
</script>
