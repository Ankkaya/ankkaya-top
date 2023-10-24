<script setup>
import { PhTwitterLogo, PhGithubLogo, PhTiktokLogo } from "@phosphor-icons/vue/compact";

const { data: home, error } = await useAsyncData("index", async () => {
  const data = await queryContent("/").findOne();
  return data;
});
console.log({
  data: home.value,
  error: error.value,
});
</script>
<template>
  <main class="site-main">
    <header class="site-hero">
      <div class="wrapper">
        <div class="img-cont hero-img-cont">
          <img :src="home.image" alt="A picture of Ankkaya" />
        </div>
        <div class="hero-content">
          <h1 class="mb-2 text-3xl font-extrabold font-heading sm:text-6xl">
            {{ home.caption }}
          </h1>
          <p class="text-lg md:text-2xl">
            {{ home.description }}
          </p>
          <ul class="social-links group">
            <li
              v-for="(link, index) of home.socials"
              :key="link.name"
              class="link-item"
              :style="{ transitionDuration: (index + 1) * 0.5 + 's' }"
            >
              <NuxtLink
                :to="link.url"
                :title="link.name"
                :target="link.name"
                class="social-link"
              >
                <PhGithubLogo
                  v-if="link.text === 'GI'"
                  weight="fill"
                  class="w-8 h-8 icon"
                />
                <PhTwitterLogo
                  v-if="link.text === 'TW'"
                  weight="fill"
                  class="w-8 h-8 icon"
                />
                <PhTiktokLogo
                  v-if="link.text === 'TI'"
                  weight="fill"
                  class="w-8 h-8 icon"
                />
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  </main>
</template>

<style scoped>
.site-hero {
  @apply relative p-8 py-12 sm:py-24 sm:mt-24;
}
.site-hero > .wrapper {
  @apply grid sm:grid-cols-3 gap-12 max-w-7xl m-auto;
}
.hero-img-cont {
  @apply sm:col-start-3 md:col-span-1 max-w-[14rem] md:max-w-xs;
}
.hero-img-cont > img {
  @apply rounded-full;
  @apply ring-8 ring-blue-ryb dark:ring-han-purple ring-offset-8 ring-offset-space-cadet-50 dark:ring-offset-space-cadet-900;
}
.site-hero .hero-content {
  @apply sm:col-span-2 sm:row-start-1 flex flex-col gap-2 w-full max-w-7xl m-auto;
}
.social-links {
  @apply flex gap-2 w-fit p-2 border border-space-cadet-200 dark:border-space-cadet-800 rounded-full;
}
.social-links .link-item {
  @apply inline-block p-3 rounded-full;
  @apply transition-all;
}
.social-links:hover .link-item {
  @apply bg-space-cadet-200 dark:bg-space-cadet-800;
}
.link-item:hover .icon {
  @apply scale-110;
}
.hero-section {
  @apply flex justify-center p-4 w-full h-screen bg-slate-50 text-slate-700;
}
</style>
