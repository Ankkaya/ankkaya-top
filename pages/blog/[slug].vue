<script setup>
import ArticlePage from "~/components/ArticleModule/ArticlePage.vue";

const route = useRoute();
const slug = ref(route.params.slug);

const { data, error } = await useAsyncData(
  `article-${slug.value}`,
  async () => {
    const article = queryContent("articles", route.params.slug).findOne();
    let surround = await queryContent()
      .only([
        "_path",
        "title",
        "description",
        "createdAt",
        "fileCreatedAt",
        "gitCreatedAt",
      ])
      .sort({ createdAt: -1 })
      .where({ _path: { $regex: "articles" } })
      .findSurround(`/articles/${slug.value}`);

    surround = surround.map((doc) => {
      if (doc?._path) doc._path = doc._path.replace("articles", "blog");
      return doc;
    });
    return { article: await article, surround: surround };
  }
);
</script>

<template>
  <main>
    <ArticlePage :article="data?.article" />
    <div class="max-w-6xl p-4 m-auto pb-28">
      <PrevNext :prev="data.surround[0]" :next="data.surround[1]" />
    </div>
  </main>
</template>
