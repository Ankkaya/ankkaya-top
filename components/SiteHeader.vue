<script setup lang="ts"></script>
<template>
  <header class="site-header">
    <div class="wrapper">
      <NuxtLink to="/">
        <SiteLogo>
          <template #logo-text>
            <h1 class="font-bold font-heading">Ankkaya</h1>
          </template>
        </SiteLogo>
      </NuxtLink>
      <div class="content-cont">
        <slot></slot>
      </div>
    </div>
    <slot name="outside-wrapper"></slot>
  </header>
</template>
<style scoped>
.site-header {
  @apply sticky lg:fixed top-0 left-0 flex items-center gap-4 w-full p-4 z-20;
}
.site-header > .wrapper {
  @apply grow flex items-center justify-between gap-4 p-3 bg-white lg:bg-white/70 dark:bg-space-cadet-800 lg:dark:bg-space-cadet-800/90 border border-space-cadet-200/70 dark:border-space-cadet-700/70 rounded-full max-w-6xl ml-auto;
  @apply lg:backdrop-blur-md bg-clip-padding shadow-xl shadow-space-cadet-300/10 dark:shadow-none;
}
.site-header .content-cont {
  @apply flex items-center gap-4;
}
</style>
