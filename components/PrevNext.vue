<script setup lang="ts">
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/vue/24/solid/index";

defineProps(["prev", "next"]);
</script>

<template>
  <ul class="prev-next-cont">
    <li class="link-item prev">
      <NuxtLink v-if="prev" :to="prev._path">
        <ArrowLeftIcon class="icon stroke" />
        <span>{{ prev.title }}</span>
      </NuxtLink>
    </li>
    <li class="link-item next">
      <NuxtLink v-if="next" :to="next._path">
        <span>{{ next.title }}</span>
        <ArrowRightIcon class="icon stroke" />
      </NuxtLink>
    </li>
  </ul>
</template>

<style scoped>
.prev-next-cont {
  @apply flex flex-col sm:flex-row gap-4 justify-between p-4 px-6 border border-space-cadet-200 dark:border-space-cadet-800 rounded-3xl lg:rounded-[3rem];
}
.link-item a {
  @apply flex gap-2;
}
</style>
