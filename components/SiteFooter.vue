<template>
  <footer class="site-footer">
    <div class="wrapper">
      <p>Ankkaya &copy; {{ new Date().getFullYear() }}</p>
    </div>
  </footer>
</template>
<style scoped>
.site-footer {
  @apply bg-space-cadet-50 dark:bg-space-cadet-800 border-t border-space-cadet-200 dark:border-space-cadet-700;
  /* 固定底部定位 */
  @apply fixed bottom-0 left-0 right-0;
}
.site-footer > .wrapper {
  @apply flex gap-4;
}
</style>
