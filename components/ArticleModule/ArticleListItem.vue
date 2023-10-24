<script setup>
import { useMotion } from "@vueuse/motion";

const { article } = defineProps({
  article: {
    type: Object,
    required: true,
  },
});

const articleItemRef = ref();
useMotion(articleItemRef, {
  initial: {
    opacity: 0,
    y: 100,
  },
  visibleOnce: {
    opacity: 1,
    y: 0,
  },
});
</script>
<template>
  <article ref="articleItemRef" class="article-item">
    <header class="article-item-header">
      <h2 class="text-2xl font-bold font-heading">
        {{ article.title }}
      </h2>
      <p>{{ article.description }}</p>
      <ul class="tags">
        <li class="tag !py-0.5" v-for="(tag, n) in article.tags" :key="n">
          {{ tag }}
        </li>
      </ul>
      <slot name="article-details">
        <ArticleModuleArticleDetails :article="article" />
      </slot>
    </header>
  </article>
</template>
<style scoped>
.article-item {
  @apply mb-5;
}
.article-item .article-item-header {
  @apply flex flex-col gap-2.5 p-4 lg:p-6 border border-transparent rounded-3xl;
  @apply hover:bg-space-cadet-100 hover:border-space-cadet-200 dark:hover:bg-space-cadet-800 dark:hover:border-space-cadet-700;
  /* @apply bg-white dark:bg-space-cadet-800 border border-space-cadet-100 dark:border-space-cadet-700 rounded-xl; */
}
</style>
