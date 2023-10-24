<script setup lang="ts">
const siteThemeCookie = useCookie("site-theme");
useSetSiteTheme(siteThemeCookie.value || "dark");

useHead({
  htmlAttrs: {
    class: siteThemeCookie.value || "dark",
  },
});
</script>
<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>
