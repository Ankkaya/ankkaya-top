<script setup lang="ts">
const articlePath = ref("/articles");
</script>
<template>
  <main>
    <header class="articles-page-header page-header">
      <div class="wrapper">
        <h1 class="text-4xl font-bold font-heading lg:text-6xl">
          Hey there, <br />
          Welcome to my blog!
        </h1>
        <p class="pt-2 text-xl description">
          Have a look at what I've been spending hours behind a screen on. I
          hope you find some of them useful. Enjoy!
        </p>
      </div>
    </header>
    <section class="articles-list-section site-section">
      <div class="wrapper">
        <!-- Render list of all articles in ./content/blog using `path` -->
        <!-- Provide only defined fields in the `:query` prop -->
        <ContentList
          :path="articlePath"
          :query="{
            only: [
              'title',
              'description',
              'tags',
              '_path',
              'img',
              'readingTime',
              'author',
              'createdAt',
              'formattedCreatedAt',
              'updatedAt',
              'formattedUpdatedAt',
              'gitCreatedAt',
              'formattedGitCreatedAt',
              'gitUpdatedAt',
              'formattedGitUpdatedAt',
              'fileCreatedAt',
              'formattedFileCreatedAt',
              'fileUpdatedAt',
              'formattedFileUpdatedAt',
            ],
            $sensitivity: 'base',
            sort: [{ createdAt: -1 }],
          }"
        >
          <template v-slot="{ list }">
            <ul class="articles-list">
              <li
                v-for="article in list"
                :key="article._path"
                class="list-item"
              >
                <NuxtLink :to="article._path?.replace('articles', 'blog')">
                  <ArticleModuleArticleListItem :article="article" />
                </NuxtLink>
              </li>
            </ul>
          </template>
          <template #not-found>
            <p>No articles found.</p>
          </template>
        </ContentList>
      </div>
    </section>
  </main>
</template>
