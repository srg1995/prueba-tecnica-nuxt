<template>
  <div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      <div
        v-for="(photo, index) in dataobjs?.message"
        :key="photo"
        class="aspect-[4/3] relative group cursor-pointer"
        @click="deleteImage(index)"
      >
        <USkeleton
          v-if="loading[index]"
          class="absolute inset-0 w-full h-full rounded-lg"
        />

        <img
          :src="photo"
          :alt="`Foto ${index}`"
          width="300"
          height="300"
          loading="lazy"
          class="w-full h-full object-cover rounded-lg transition-opacity duration-500"
          @load="handleLoad(index)"
        />
        <div
          class="absolute flex justify-center items-center inset-0 bg-red-500 opacity-0 transition-opacity duration-300 rounded-lg group-hover:opacity-50"
        >
          <UIcon name="i-lucide-trash" class="size-10" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: dataobjs } = await useAsyncData("photos", () =>
  $fetch("https://dog.ceo/api/breeds/image/random/50")
);

const loading = ref([]);

watch(
  () => dataobjs.value?.message,
  (newVal) => {
    if (newVal) {
      loading.value = newVal.map(() => true);
    }
  },
  { immediate: true }
);

function handleLoad(index) {
  if (loading.value[index] !== undefined) {
    loading.value[index] = false;
  }
}

const deleteImage = (index) => {
  console.log(`Eliminando imagen en el índice ${index}`);
  dataobjs.value.message.splice(index, 1);
  loading.value.splice(index, 1);
  console.log(
    `Imagen eliminada. Quedan ${dataobjs.value.message.length} imágenes.`
  );
};
</script>
