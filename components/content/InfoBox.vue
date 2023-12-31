<!-- ./components/content/InfoBox.vue -->

<script setup lang="ts">
// import icons from HeroIcons
import {
  InformationCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/vue/24/solid/index";

// define props in <script>
const { type, summary } = defineProps({
  type: {
    type: String,
    default: "info",
  },
  summary: {
    type: Boolean,
    default: false,
  },
});
console.log({ type, summary });
</script>

<template>
  <!-- Access `type` prop in Dynamic class  -->
  <div class="info-box prose-a:text-inherit" :class="[type]">
    <div class="py-1 icon-cont">
      <!-- Conditionally render icons based on prop -->
      <ExclamationCircleIcon v-if="type == 'warning'" class="icon solid" />
      <ExclamationTriangleIcon v-else-if="type == 'error'" class="icon solid" />
      <InformationCircleIcon v-else class="icon solid" />
    </div>

    <details v-if="summary">
      <summary>
        <!-- Unamed Slot to render component content -->
        <slot />
      </summary>
      <div class="pt-2 details">
        <!-- Named markdown component to render rich-text -->
        <ContentSlot :use="$slots.details" unwrap="p"></ContentSlot>
      </div>
    </details>
    <div class="details" v-else>
      <ContentSlot :use="$slots.default" unwrap="p"></ContentSlot>
    </div>
  </div>
</template>

<style scoped>
.info-box {
  @apply flex items-start gap-2 p-4 bg-space-cadet-100 dark:bg-space-cadet-800 border border-space-cadet-200 dark:border-space-cadet-700 text-space-cadet-500 dark:text-space-cadet-100 rounded-lg mb-4;
}

details summary {
  @apply flex font-semibold leading-tight cursor-pointer;
}

details .details {
  @apply text-sm;
}

.info-box .icon {
  @apply shrink-0;
}

.info-box.warning {
  @apply bg-yellow-200 dark:bg-yellow-900 border-yellow-400 dark:border-yellow-800 text-yellow-600 dark:text-yellow-200;
}

.info-box.warning .icon.solid {
  @apply fill-yellow-600 dark:fill-yellow-400;
}

.info-box.error {
  @apply bg-red-200 border-red-400 text-red-600;
}

.info-box.error .icon.solid {
  @apply fill-red-600;
}
</style>
