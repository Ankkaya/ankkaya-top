<script setup lang="ts">
import ArticleDetails from "./ArticleDetails.vue";

const { article } = defineProps({
  article: {
    type: Object,
    required: true,
  },
});

const coverImgRef = ref<HTMLImageElement | null>(null);
const showToc = ref(article?.body.toc.links.length > 0);

const metaImage =
  article?.coverPath ||
  article?.coverUrl ||
  `assets/img${article?._path}/cover.png`;
useHead({
  title: article?.title,
  meta: [
    {
      name: "description",
      content: article?.description,
      key: "description",
    },
    //Open Graph
    {
      key: "og-type",
      property: "og:type",
      content: "website",
    },
    {
      key: "og-url",
      property: "og:url",
      content: `https://v3.miracleio.me${article?._path}`,
    },
    {
      key: "og-title",
      property: "og:title",
      content: article?.title,
    },
    {
      key: "og-description",
      property: "og:description",
      content: article?.description,
    },
    {
      key: "og-image",
      property: "og:image",
      content: `https://v3.miracleio.me${metaImage}`,
    },
    {
      key: "twitter-card",
      property: "twitter:card",
      content: "summary_large_image",
    },
    {
      key: "twitter-url",
      property: "twitter:url",
      content: `https://miracleio.me${article?._path}`,
    },
    {
      key: "twitter-title",
      property: "twitter:title",
      content: article?.title,
    },
    {
      key: "twitter-description",
      property: "twitter:description",
      content: article?.description,
    },
    {
      key: "twitter-image",
      property: "twitter:image",
      content: `https://v3.miracleio.me${metaImage}`,
    },
  ],
});
</script>
<template>
  <section class="m-auto article-section max-w-7xl">
    <header class="article-header">
      <div class="cover-img img-cont">
        <img
          ref="coverImgRef"
          :src="`/assets/img${article?._path}/cover.webp`"
          :alt="article?.title"
        />
      </div>
      <div class="max-w-5xl m-auto wrapper">
        <h1 class="text-4xl font-extrabold title font-heading lg:text-6xl">
          {{ article?.title }}
        </h1>
        <p class="pt-2 text-xl description">{{ article?.description }}</p>
        <ul class="py-4 tags">
          <li v-for="tag in article?.tags" :key="tag" class="tag">
            <span>{{ tag }}</span>
          </li>
        </ul>
        <ArticleDetails :article="article" :options="{ showAvatar: true }" />
      </div>
    </header>
    <hr class="article-hr" />
    <div class="wrapper">
      <aside v-if="showToc" class="toc-cont">
        <Toc :links="article?.body.toc.links" />
      </aside>
      <article class="article" :class="{ '!col-span-7': !showToc }">
        <ContentRenderer
          class="prose md:prose-lg prose-headings:font-heading prose-headings:!font-bold prose-headings:scroll-mt-36 lg:prose-headings:scroll-mt-24 dark:prose-invert p-4 py-8 lg:p-8 lg:py-12 max-w-4xl m-auto"
          :value="article"
        >
          <template #empty>
            <p>No content found.</p>
          </template>
        </ContentRenderer>
      </article>
    </div>
  </section>
  <ScrollToButton />
</template>

<style scoped>
.article-section {
  @apply px-4;
}
.article-section > .wrapper {
  @apply lg:grid lg:grid-cols-7 gap-4;
}
.cover-img img {
  @apply max-h-[29rem];
}

.img-cont img {
  @apply rounded-xl lg:rounded-t-none lg:rounded-b-3xl shadow-2xl;
}
.article-header > .wrapper {
  @apply py-8 lg:py-12;
}

.details {
  @apply flex pt-4 lg:pt-8 gap-4 justify-between;
}
.detail-item {
  @apply flex items-start md:items-center gap-2 font-heading font-semibold text-xs;
}
.detail-group {
  @apply flex items-center flex-wrap gap-4 gap-y-2;
}

.article-hr {
  @apply border border-space-cadet-200 dark:border-space-cadet-800 max-w-5xl m-auto;
}

.toc-cont {
  @apply sticky top-16 col-span-2 col-start-6 p-4 pt-8 pb-0;
}

.toc-cont > :deep(.toc) {
  @apply lg:sticky top-28;
}

.article {
  @apply col-span-5 col-start-1 row-start-1;
}
</style>
