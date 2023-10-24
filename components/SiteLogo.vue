<template>
  <figure class="site-logo" tabindex="0">
    <span class="icon">
      <img class="rounded-full" src="~/assets/img/favicon-192x192.png" alt="" />
    </span>
    <span class="logo-txt-cont">
      <slot name="logo-text">
        <h1>Portfolio: Nuxt3-Content-Blog</h1>
      </slot>
    </span>
  </figure>
</template>
<style scoped>
.site-logo {
  @apply relative flex gap-2 items-center z-20;
}
.site-logo > .icon {
  @apply w-10 h-10;
}
.site-logo:hover .logo-txt-cont :slotted(*),
.site-logo:focus .logo-txt-cont :slotted(*),
.site-logo.active .logo-txt-cont :slotted(*) {
  @apply translate-x-1/2;
}
.site-logo *,
.site-logo :slotted(*) {
  @apply inline-block align-middle transition-all duration-150;
}
.logo-txt-cont {
  @apply relative overflow-hidden;
}
.logo-txt-cont :slotted(*) {
  @apply relative -left-1/2 transform -translate-x-1/2;
}
</style>
