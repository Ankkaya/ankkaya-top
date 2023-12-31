<script setup lang="ts">
import { ListBulletIcon } from "@heroicons/vue/24/solid/index";
defineProps({
  links: {
    type: Array,
    required: true,
  },
});

const inactive = ref(true);

// flatten TOC links nested arrays to on array
const flattenLinks = (links: any[]) => {
  let _links = links
    .map(
      (link: {
        id: string | number | symbol | undefined;
        depth: any;
        text: any;
        children: any;
      }) => {
        let _link = [link];
        if (link.children) {
          let flattened = flattenLinks(link.children);
          _link = [link, ...flattened];
        }
        return _link;
      }
    )
    .flat(1);
  return _links;
};
</script>

<template>
  <button
    @click="inactive = !inactive"
    class="lg:!hidden cta mb-4"
    :class="{ 'mb-0': inactive }"
  >
    <ListBulletIcon class="icon" />
  </button>
  <nav class="toc" :class="{ inactive }">
    <header class="toc-header">
      <div class="flex items-center gap-3 wrapper">
        <h3 class="text-xl font-bold">Table of contents</h3>
      </div>
    </header>
    <ul class="toc-links">
      <li
        v-for="link of flattenLinks(links)"
        :key="link.id"
        :class="`toc-link _${link.depth}`"
      >
        <a :href="`#${String(link.id)}`">
          {{ link.text }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.toc {
  @apply p-4 bg-white dark:bg-space-cadet-800 border border-space-cadet-200 dark:border-space-cadet-700 rounded-3xl;
  @apply max-h-[calc(100vh-9rem)] overflow-auto;
  @apply transition-all;
}

@media (max-width: 1023px) {
  .toc.inactive {
    @apply scale-75 -translate-y-12 origin-top-left p-0 h-0 opacity-0 invisible pointer-events-none overflow-hidden;
  }
}

.toc-header {
  @apply pb-4 mb-4 border-b border-space-cadet-200 dark:border-space-cadet-700;
}
.toc-links {
  @apply flex flex-col gap-2 px-2;
}
.toc-link {
  @apply text-space-cadet-500 dark:text-space-cadet-100 hover:underline;
}
.toc-link._3 {
  @apply pl-3;
}
.toc-link._4 {
  @apply pl-6;
}
.toc-link._undefined {
  @apply pl-8;
}
</style>
