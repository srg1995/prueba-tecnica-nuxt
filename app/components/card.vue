<template>
  <div class="aspect-[4/3] relative group cursor-pointer" @click="handleDelete">
    <USkeleton
      v-if="isLoading"
      class="absolute inset-0 w-full h-full rounded-lg"
    />

    <img
      :src="src"
      :alt="`Foto ${index}`"
      loading="lazy"
      height="300"
      width="300"
      class="absolute inset-0 w-full h-full object-cover rounded-lg transition-opacity duration-500"
      @load="handleLoad"
    />

    <div
      class="absolute flex justify-center items-center inset-0 bg-red-500 opacity-0 transition-opacity duration-300 rounded-lg group-hover:opacity-50"
    >
      <UIcon name="i-lucide-trash" class="size-10" />
    </div>
  </div>
</template>

<script setup>
const { src, index, isLoading } = defineProps({
  src: String,
  index: Number,
  isLoading: Boolean,
});

const emit = defineEmits(["loaded", "delete"]);

const handleLoad = () => {
  emit("loaded", index);
};

const handleDelete = () => {
  emit("delete", index);
};
</script>
